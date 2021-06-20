<template>
  <header>
    <div class="containerHeader">
      <div class="areaLogo">
        <router-link :to="{ name: 'Home' }">GitHubAPI</router-link>
      </div>
      <div class="areaMenu">
        <nav>
          <ul>
            <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
            <li>
              <router-link :to="{ name: 'Favourites' }">Favoritos</router-link>
            </li>
            <li><router-link :to="{ name: 'About' }">Sobre</router-link></li>
          </ul>
        </nav>
      </div>
      <div class="areaMenuMobile">
        <MenuMobile />
      </div>
    </div>
  </header>
</template>

<script>
import MenuMobile from "@/components/MenuMobile.vue";

export default {
  name: "Header",
  components: {
    MenuMobile,
  },
};
</script>

<style lang="scss" scoped>
header {
  box-shadow: 0px 1px 10px 4px rgba(0, 0, 0, 0.05);
  height: 60px;
  display: flex;
  .containerHeader {
    width: 1100px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .areaLogo {
      font-size: 30px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}

.areaMenu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  ul {
    display: flex;
    a {
      padding: 10px 15px;
      margin: 0 5px;
      transition: all ease 0.3s;
      font-size: 15px;
      font-weight: 500;
      &:hover,
      &.router-link-exact-active {
        background: #000;
        border-radius: 5px;
        color: #dfff52;
      }
    }
  }
}
.areaMenuMobile {
  display: none;
  flex: 1;
  justify-content: flex-end;
}

@media (max-width: 460px) {
  .areaMenu {
    display: none;
  }
  .areaMenuMobile {
    display: flex;
  }
}
</style>
