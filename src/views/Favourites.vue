<template>
  <div class="main">
    <h1>Favoritos</h1>
    <p v-if="this.getListRepositories().length === 0">
      Não há nenhum repositório favorito no momento.
    </p>
    <div v-else>
      <transition-group name="fade" tag="div" mode="out-in">
        <ElementRepository
          v-for="(favourite, index) in this.getListRepositories()"
          :key="favourite.id"
          :element="favourite"
          :index="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ElementRepository from "@/components/ElementRepository.vue";

export default {
  name: "Favourites",
  components: {
    ElementRepository,
  },
  methods: {
    ...mapGetters(["getListRepositories"]),
  },
};
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.main {
  margin-bottom: 80px;
  h1 {
    margin: 30px 0px 30px 15px;
  }
}
</style>
