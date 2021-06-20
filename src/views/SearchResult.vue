<template>
  <div v-if="id === 1">
    <div v-if="searchCompleted">
      <h2>Resultados Encontrados</h2>
      <ElementRepository
        v-for="(elementSearch, index) in APIResult"
        :key="index"
        :element="elementSearch"
        :index="index"
      />
      <div class="areaBtnResults" v-if="newSearch">
        <button
          v-if="totalResults > 30"
          class="btnTotalResults"
          @click="addMoreResults"
        >
          Ver mais...
        </button>
      </div>
      <LoadingScreen v-else />
    </div>
    <div v-else>
      <LoadingScreen />
    </div>
  </div>
  <div v-else>
    <div v-if="searchCompleted">
      <h2>Resultados Encontrados</h2>
      <ElementPerson
        v-for="(elementSearch, index) in APIResult"
        :key="index"
        :element="elementSearch"
        :index="index"
      />
      <div class="areaBtnResults" v-if="newSearch">
        <button
          v-if="totalResults > 30"
          class="btnTotalResults"
          @click="addMoreResults"
        >
          Ver mais...
        </button>
      </div>
      <LoadingScreen v-else />
    </div>
    <div v-else>
      <LoadingScreen />
    </div>
  </div>
</template>

<script>
import LoadingScreen from "@/components/LoadingScreen.vue";
import ElementRepository from "@/components/ElementRepository.vue";
import ElementPerson from "@/components/ElementPerson.vue";
export default {
  name: "SearchResult",
  components: {
    ElementRepository,
    LoadingScreen,
    ElementPerson,
  },
  data() {
    return {
      searchCompleted: false,
      newSearch: true,
      APIResult: [],
      totalResults: 0,
      pageNow: 1,
    };
  },
  props: ["id", "nameItem"],
  created() {
    this.addMoreResults();
  },
  methods: {
    addMoreResults() {
      this.newSearch = false;
      if (this.id === 1) {
        this.fetchAPIRepository(this.pageNow);
      } else if (this.id === 2) {
        this.fetchAPIPerson(this.pageNow);
      }
    },
    fetchAPIRepository(page) {
      fetch(
        `https://api.github.com/search/repositories?q=${this.nameItem}&page=${page}`
      )
        .then((r) => r.json())
        .then((r) => {
          this.APIResult = this.APIResult.concat(r.items);
          this.totalResults = r.total_count;
          this.searchCompleted = true;
          this.pageNow += 1;
          this.newSearch = true;
        });
    },
    fetchAPIPerson(page) {
      fetch(
        `https://api.github.com/search/users?q=${this.nameItem}&page=${page}`
      )
        .then((r) => r.json())
        .then((r) => {
          this.APIResult = this.APIResult.concat(r.items);
          this.totalResults = r.total_count;
          this.searchCompleted = true;
          this.pageNow += 1;
          this.newSearch = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 30px 0px 30px 20px;
  font-weight: 500;
}
.areaBtnResults {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  .btnTotalResults {
    border: none;
    padding: 7px 30px;
    border-radius: 5px;
    background-color: #000;
    color: #dfff52;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  }
}
</style>
