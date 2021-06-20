<template>
  <section>
    <h2>Projetos Visitados Recentemente</h2>
    <div v-if="reposVisited.length != 0">
      <ElementRepository
        v-for="(repository, index) in reposVisited"
        :key="index"
        :element="repository"
        :index="index"
      />
    </div>
    <p v-else>Você não visitou nenhum repositório ainda!</p>
  </section>
</template>

<script>
import ElementRepository from "@/components/ElementRepository.vue";
import { mapGetters } from "vuex";

export default {
  name: "LastVisitedArea",
  data() {
    return {
      reposVisited: [],
    };
  },
  computed: {
    ...mapGetters(["getReposVisited"]),
  },
  created() {
    this.reposVisited = this.getReposVisited;
  },
  components: {
    ElementRepository,
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 0px 0px 10px 0px;
  h2 {
    font-weight: 500;
    margin-bottom: 35px;
  }
  .basicInfos {
    display: flex;
    span {
      color: #999;
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>
