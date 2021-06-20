<template>
  <section>
    <div class="areaBtns">
      <button @click="marcarBusca(1)" id="repositorio">Repositório</button>
      <button @click="marcarBusca(2)" id="pessoa">Pessoa</button>
    </div>
    <form>
      <input
        type="text"
        name="busca"
        id="busca"
        placeholder="Buscar... (repositório por padrão)"
        v-model="buscar"
      />
      <input
        type="submit"
        name="buscar"
        id="buscar"
        value="Buscar"
        @click.prevent="realizarBusca"
        @keyup.enter="realizarBusca"
      />
    </form>
  </section>
</template>

<script>
export default {
  name: "SearchArea",
  data() {
    return {
      buscar: "",
      escolhaSearch: 1,
    };
  },
  methods: {
    marcarBusca(value) {
      if (value === 1) {
        this.escolhaSearch = 1;
        document.querySelector("#pessoa").classList.remove("escolhaSearch");
        document.querySelector("#repositorio").classList.add("escolhaSearch");
      } else if (value === 2) {
        this.escolhaSearch = 2;
        document
          .querySelector("#repositorio")
          .classList.remove("escolhaSearch");
        document.querySelector("#pessoa").classList.add("escolhaSearch");
      }
    },
    realizarBusca() {
      if (this.buscar) {
        this.$router.push({
          name: "Search",
          params: {
            id: this.escolhaSearch,
            nameItem: this.buscar,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 60px auto 100px auto;
  .areaBtns {
    display: flex;
    justify-content: center;
    button {
      outline: none;
      border: none;
      border-radius: 5px;
      background: transparent;
      font-weight: 500;
      font-size: 15px;
      padding: 10px 15px;
      min-width: 110px;
      margin-right: 20px;
      cursor: pointer;
      transition: all ease 0.3s;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      &:last-child {
        margin-right: 0px;
      }
      &:hover {
        transform: scale(1.01);
        background: #000;
        color: #dfff52;
      }
      &.escolhaSearch {
        transform: scale(1.01);
        background: #000;
        color: #dfff52;
      }
    }
  }
}
form {
  max-width: 600px;
  position: relative;
  margin: 20px auto 0px auto;
  #busca {
    padding: 10px 50px 10px 10px;
    border: 1px solid #eee;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    font-size: 1rem;
    font-family: "Ubuntu", Arial, Helvetica, sans-serif;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: all ease 0.3s;
    outline: none;
    &:hover,
    &:focus {
      transform: scale(1.01);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
    }
  }
  #buscar {
    outline: none;
    border: none;
    position: absolute;
    background: url("../assets/search.svg") no-repeat center center;
    height: 50px;
    width: 50px;
    text-indent: -150px;
    cursor: pointer;
    right: 0;
    top: 0;
  }
}
</style>
