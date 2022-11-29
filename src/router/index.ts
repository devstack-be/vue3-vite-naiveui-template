import { useApi } from "@/composables/useApi";
import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import * as NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("/src/views/dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/src/views/auth/login.vue"),
    meta: { requiresGuest: true, layout: "auth" },
  },
  {
    path: "/users",
    name: "users",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("/src/views/users/index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/users/create",
    name: "users.create",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("/src/views/users/create.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/users/:id",
    name: "users.edit",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("/src/views/users/edit.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("/src/views/errors/404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});
router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const api = useApi();
  if (from === START_LOCATION && userStore.isLoggedIn) {
    // 1. If the name is not set, it means we are navigating to the first page
    // and we are logged in, so we should check user information from the server
    try {
      // Do api request call to retreive user profile.
      // SetIsLoading to enable preloader
      userStore.setIsLoading(true);
      const { data: user } = await api.get("auth/profile");
      userStore.setUser(user);
      userStore.setIsLoading(false);
    } catch (err) {
      // If fail, disconnect user
      userStore.logoutUser()
      userStore.setIsLoading(false)
      createToast(
        {
          title: "Auth",
          description: t("notification.invalidSession"),
        },
        {
          type: "danger",
          showIcon: true,
          hideProgressBar: true,
        }
      );
      if (to.meta.requiresAuth) {
        // redirect the user somewhere
        return {
          // Will follow the redirection set in /@src/pages/auth/index.vue
          name: "login",
          // save the location we were at to come back later
          query: { redirect: to.fullPath },
        };
      }
    }
  } else if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 2. If the requires auth via requiresAuth meta, check if user is logged in
    // if not, redirect to login page.
    createToast(
      {
        title: "Auth",
        description: "Sorry, you should loggin to access this section",
      },
      {
        type: "danger",
        showIcon: true,
        hideProgressBar: true,
      }
    );

    return {
      // Will follow the redirection set in /@src/pages/auth/index.vue
      name: "login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.requiresGuest && userStore.isLoggedIn) {
    createToast(
      {
        title: "Auth",
        description: "Sorry, you should be guest to access this section",
      },
      {
        type: "danger",
        showIcon: true,
        hideProgressBar: true,
      }
    );
    return {
      name: "home",
    };
  }
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
})

router.afterEach(() => {
  NProgress.done();
})
export default router;
