import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const { $auth, $db } = useNuxtApp();
  const authStore = useAuthStore();
  let initialized = false;

  const getAdminEmails = () => {
    const config = useRuntimeConfig();
    const raw = String(config.public.adminEmails ?? "");
    return raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
  };

  const isAdminEmail = (email: string) => {
    if (!email) return false;
    return getAdminEmails().includes(email.toLowerCase().trim());
  };

  const ensureUserProfile = async (firebaseUser: any) => {
    const userRef = doc($db, "users", firebaseUser.uid);
    const snapshot = await getDoc(userRef);
    const now = Date.now();
    const email = firebaseUser.email ?? "";
    const adminEmails = getAdminEmails();
    const adminByEmail = adminEmails.includes(email.toLowerCase().trim());
    const allowAutoAdmin = adminEmails.length === 0;
    const targetRoleForUser = adminByEmail || allowAutoAdmin ? "admin" : "user";

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        email,
        displayName: firebaseUser.displayName ?? "",
        role: targetRoleForUser,
        createdAt: now,
        lastLoginAt: now
      });
      return targetRoleForUser;
    }

    const currentRole = snapshot.data()?.role ?? "user";
    const resolvedRole = adminByEmail || allowAutoAdmin ? "admin" : currentRole;
    await setDoc(
      userRef,
      {
        lastLoginAt: now,
        role: resolvedRole
      },
      { merge: true }
    );
    return resolvedRole;
  };

  const register = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword($auth, email, password);
    const role = await ensureUserProfile(res.user);
    authStore.setSession(res.user, role);
  };

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword($auth, email, password);
    const role = await ensureUserProfile(res.user);
    authStore.setSession(res.user, role);
  };

  const recoverPassword = async (email: string) => {
    // Firebase envia un email con un enlace para restablecer la contraseña
    await sendPasswordResetEmail($auth, email);
  };

  const logout = async () => {
    await signOut($auth);
    authStore.clearSession();
  };

  const initAuth = () => {
    if (initialized) return;
    initialized = true;

    authStore.setReady(false);
    onAuthStateChanged($auth, (u) => {
      if (u) {
        ensureUserProfile(u)
          .then((role) => authStore.setSession(u, role))
          .finally(() => authStore.setReady(true));
        return;
      }

      authStore.clearSession();
      authStore.setReady(true);
    });
  };

  return {
    user: computed(() => authStore.user),
    role: computed(() => authStore.role),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isReady: computed(() => authStore.isReady),
    register,
    login,
    recoverPassword,
    logout,
    initAuth
  };
};