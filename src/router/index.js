import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      document.title = to.meta.title || "Home";
      next();
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    beforeEnter: (to, from, next) => {
      document.title = to.meta.title || "Sobre";
      next();
    },
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () =>
      import(/* webpackChunkName: "favourites" */ "../views/Favourites.vue"),
    beforeEnter: (to, from, next) => {
      document.title = to.meta.title || "Favoritos";
      next();
    },
  },
  {
    path: "/search/:id/:nameItem",
    name: "Search",
    props: true,
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/SearchResult.vue"),
  },
  {
    path: "/user/:id",
    name: "User",
    props: true,
    component: () => import(/* webpackChunkName: "user"*/ "../views/User.vue"),
  },
  {
    path: "*",
    name: "NotFoundPage",
    component: () =>
      import(
        /* webpackChunkName: "notfoundpage" */ "../views/NotFoundPage.vue"
      ),
    beforeEnter: (to, from, next) => {
      document.title = to.meta.title || "NotFound";
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
