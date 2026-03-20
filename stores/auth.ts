export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    role: "guest",
    isReady: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    setSession(user: any, role = "user") {
      this.user = user;
      this.role = role;
    },
    clearSession() {
      this.user = null;
      this.role = "guest";
    },
    setReady(value: boolean) {
      this.isReady = value;
    }
  }
});
