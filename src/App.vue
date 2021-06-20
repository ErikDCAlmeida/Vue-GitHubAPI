<template>
  <div id="app">
    <Header />
    <main>
      <router-view class="container" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap");
* {
  box-sizing: border-box;
  font-family: "Ubuntu", Arial, Helvetica, sans-serif;
}
body,
h1,
h2,
h3,
ul,
li,
a,
p {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
main {
  flex: 1;
  display: flex;
  .container {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    flex: 1;
  }
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
@media (max-width: 1100px) {
  .container {
    padding: 0px 5px;
  }
}
</style>
