export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (!authStore.isReady) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => authStore.isReady,
        (ready) => {
          if (!ready) return;
          stop();
          resolve();
        },
        { immediate: true }
      );
    });
  }

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  if (authStore.role !== "admin") {
    return navigateTo("/");
  }
});
