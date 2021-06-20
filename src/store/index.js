import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listRepositories: localStorage.getItem("repositories")
      ? JSON.parse(localStorage.getItem("repositories"))
      : [],
    listReposVisited: localStorage.getItem("reposVisited")
      ? JSON.parse(localStorage.getItem("reposVisited"))
      : [],
  },
  mutations: {
    ADD_REPOSITORY(state, payload) {
      state.listRepositories.push(payload);
    },
    ADD_REPOS_VISITED(state, payload) {
      state.listReposVisited.unshift(payload);
    },
    REMOVE_REPOSITORY(state, payload) {
      state.listRepositories.splice(payload, 1);
    },
    REMOVE_REPOS_VISITED(state) {
      state.listReposVisited.pop();
    },
    ADD_LOCALSTORAGE(state) {
      localStorage.setItem(
        "repositories",
        JSON.stringify(state.listRepositories)
      );
    },
    ADD_LS_REPOS_VISITED(state) {
      localStorage.setItem(
        "reposVisited",
        JSON.stringify(state.listReposVisited)
      );
    },
  },
  actions: {
    addRepository(context, payload) {
      context.commit("ADD_REPOSITORY", payload);
    },
    addRepositoryVisited(context, payload) {
      context.commit("ADD_REPOS_VISITED", payload);
    },
    removeRepository(context, payload) {
      context.commit("REMOVE_REPOSITORY", payload);
    },
    removeReposVisited(context) {
      context.commit("REMOVE_REPOS_VISITED");
    },
    addLocalStorage(context) {
      context.commit("ADD_LOCALSTORAGE");
    },
    addLSReposVisited(context) {
      context.commit("ADD_LS_REPOS_VISITED");
    },
  },
  getters: {
    getListRepositories(state) {
      return state.listRepositories;
    },
    getReposVisited(state) {
      return state.listReposVisited;
    },
  },
});
