<template>
  <div>
    <div class="barraMenu" @click="openModal">MENU</div>
    <div class="bgModal" @click="closeModalBG">
      <div class="modal">
        <button @click="closeModal">
          <img src="../assets/cancel.png" alt="btnCanel" />
        </button>
        <div class="linksMenu">
          <router-link :to="{ name: 'Home' }" @click.native="closeModal">
            Home
          </router-link>
          <router-link :to="{ name: 'Favourites' }" @click.native="closeModal">
            Favoritos
          </router-link>
          <router-link :to="{ name: 'About' }" @click.native="closeModal">
            Sobre
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuMobile",
  data() {
    return {
      bgModal: null,
    };
  },
  mounted() {
    this.bgModal = document.querySelector(".bgModal");
  },
  methods: {
    openModal() {
      this.bgModal.style.display = "flex";
    },
    closeModal() {
      this.bgModal.style.display = "none";
    },
    closeModalBG() {
      this.bgModal.addEventListener("click", (event) => {
        if (this.bgModal === event.target) {
          this.bgModal.style.display = "none";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.barraMenu {
  background: #000;
  border-radius: 5px;
  color: #dfff52;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  margin-right: 10px;
  cursor: pointer;
  &::after {
    content: "";
    width: 12px;
    height: 2px;
    background: #dfff52;
    position: relative;
    margin-left: 10px;
    box-shadow: 0px 5px 0px #dfff52, 0px -5px 0px #dfff52;
  }
}
.bgModal {
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(146, 146, 146, 0.9);
  display: none;
  justify-content: flex-end;
  animation: animeEntry 0.5s forwards;
  @keyframes animeEntry {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .modal {
    height: 100%;
    background: rgba(0, 0, 0, 1);
    box-shadow: -10px 0px 20px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: animeEntryModal 0.5s forwards;
    border-radius: 10px 0px 0px 10px;
    @keyframes animeEntryModal {
      from {
        width: 0px;
        opacity: 0;
      }
      to {
        opacity: 1;
        width: 250px;
      }
    }
    button {
      position: absolute;
      border: none;
      background: transparent;
      right: 15px;
      top: 15px;
      cursor: pointer;
      img {
        width: 30px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.4);
        border-radius: 50%;
      }
    }
    .linksMenu {
      display: flex;
      flex-direction: column;
      margin-top: 50px;
      a {
        padding: 10px 10px;
        margin: 5px 0px;
        color: #dfff52;
        border-bottom: 2px solid #dfff52;
      }
    }
  }
}
</style>
