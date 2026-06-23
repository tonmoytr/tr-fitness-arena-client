export const BRAND_CONFIG = {
  name: "TR Fitness Arena",
  logoText: "TR FITNESS ARENA",
  routes: {
    public: [
      { label: "Home", path: "/" },
      { label: "All Classes", path: "/classes" },
      { label: "Community Forum", path: "/forum" },
    ],
    auth: {
      signIn: "/signIn",
      signUp: "/signUp",
    },
  },
  roles: {
    USER: "user",
    TRAINER: "trainer",
    ADMIN: "admin",
  },
};
