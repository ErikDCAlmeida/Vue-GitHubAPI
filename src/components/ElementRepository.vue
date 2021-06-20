<template>
  <div class="geral">
    <div class="geralMain">
      <p class="title">
        <img src="../assets/folderBlack.png" alt="repositoryIcon" />
        <span>{{ object.name + "/" + object.owner.login }}</span>
      </p>
      <p class="description">
        {{ object.description ? object.description : "Sem descrição." }}
      </p>
      <div class="areaInfos">
        <div class="starsArea">
          <img src="@/assets/starNormal.png" alt="startnormal" />
          <p>{{ object.watchers }}</p>
        </div>
        <div class="createdArea">Criado: {{ dateCreated }}</div>
        <div class="updatedArea">Atualizado: {{ dateUpdated }}</div>
      </div>
      <button class="btnFavourite" @click="addRemoveFavourite(object)">
        <img
          src="../assets/starNormal.png"
          alt="starFavouriteNormal"
          v-if="!favourite"
          class="starNormal"
        />
        <img
          src="../assets/starGold.png"
          alt="starFavouriteGold"
          class="starGold"
          v-else
        />
      </button>
    </div>
    <button class="btnMoreInfos" @click="moreInfos">
      <img src="../assets/arrowsExtraInfos.png" alt="arrowsmoreinfos" />
    </button>
    <div class="areaMoreInfos">
      <img
        :src="object.owner.avatar_url"
        :alt="'imgUser' + object.owner.login"
        class="userImage"
      />
      <div class="moreInfosUser">
        <p>
          <span>Criador:</span>
          <router-link
            :to="{ name: 'User', params: { id: object.owner.login } }"
            class="linkOtherInfos"
          >
            {{ object.owner.login }}</router-link
          >
        </p>
        <p class="forks">
          <img src="../assets/forkImg.png" alt="imgFork" class="imgFork" />
          <span>{{ object.forks }}</span>
        </p>
        <p>
          <span>Licença:</span>
          {{ object.license ? object.license.name : "não possui!" }}
        </p>
        <p>
          <span>Linguagem:</span>
          {{ object.language ? object.language : "não possui!" }}
        </p>
        <p><span>Desativado:</span> {{ object.disabled ? "sim!" : "não!" }}</p>
        <p>
          <span>Seja direcionado ao projeto clicando</span>
          <a
            :href="object.html_url"
            target="_blank"
            class="linkOtherInfos"
            @click="addRepoVisited(object)"
          >
            aqui!
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ElementRepository",
  props: ["element", "index"],
  data() {
    return {
      object: this.element,
      favourite: false,
    };
  },
  computed: {
    ...mapGetters(["getListRepositories", "getReposVisited"]),
    dateCreated() {
      const gtm = new Date(this.object.created_at);
      const created = `${
        gtm.getDate() >= 10 ? gtm.getDate() : "0" + gtm.getDate()
      }/${
        gtm.getMonth() + 1 >= 10
          ? gtm.getMonth() + 1
          : "0" + (gtm.getMonth() + 1)
      }/${gtm.getFullYear()}`;
      return created;
    },
    dateUpdated() {
      const gtm = new Date(this.object.updated_at);

      const created = `${gtm.getDate()}/${
        gtm.getMonth() + 1 >= 10
          ? gtm.getMonth() + 1
          : "0" + (gtm.getMonth() + 1)
      }/${gtm.getFullYear()}`;
      return created;
    },
  },
  created() {
    this.verifyFavourite();
  },
  methods: {
    ...mapActions([
      "addRepository",
      "removeRepository",
      "addLocalStorage",
      "addRepositoryVisited",
      "removeReposVisited",
      "addLSReposVisited",
    ]),
    verifyFavourite() {
      this.favourite = false;
      this.getListRepositories.forEach((item) => {
        if (item.id === this.object.id) {
          this.favourite = true;
        }
      });
    },
    verifiyListRepositories(value) {
      let contains = false;
      let index = 0;
      let count = 0;
      this.getListRepositories.forEach((item) => {
        if (item.id === value.id) {
          contains = true;
        }
        if (item.id === value.id) {
          index = count;
        }
        count++;
      });
      return [contains, index];
    },
    addRemoveFavourite(value) {
      if (this.favourite === false) {
        const contains = this.verifiyListRepositories(value)[0];
        if (!contains) {
          this.addRepository(value);
          this.addLocalStorage();
          this.verifyFavourite();
        }
      } else {
        const index = this.verifiyListRepositories(value)[1];
        this.removeRepository(index);
        this.addLocalStorage();
        this.verifyFavourite();
      }
    },
    addRepoVisited(value) {
      let contains = false;
      const list = this.getReposVisited;
      list.forEach((item) => {
        if (item.id === this.object.id) {
          contains = true;
        }
      });
      if (!contains) {
        if (list.length === 10) {
          this.removeReposVisited();
          this.addRepositoryVisited(value);
          this.addLSReposVisited();
        } else {
          this.addRepositoryVisited(value);
          this.addLSReposVisited();
        }
      }
    },
    moreInfos() {
      const items = document.querySelectorAll(".areaMoreInfos");
      const btns = document.querySelectorAll(".btnMoreInfos");
      items.forEach((item, indexItem) => {
        if (this.index === indexItem) {
          item.classList.toggle("actived");
        }
      });
      btns.forEach((item, indexItem) => {
        if (this.index === indexItem) {
          if (item.style.transform === "rotate(180deg)") {
            item.style.transform = "none";
          } else {
            item.style.transform = "rotate(180deg)";
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.geral {
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #ccc;
  margin-bottom: 20px;
  .geralMain {
    padding: 30px 20px 20px 20px;
    position: relative;
    width: 100%;
    .title {
      font-size: 20px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        margin-right: 10px;
      }
      span {
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .description {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .areaInfos {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .starsArea {
        display: flex;
        align-items: center;
        margin-right: 30px;
        margin-bottom: 10px;
        p {
          font-weight: 500;
          font-size: 15px;
        }
        img {
          width: 15px;
          margin-right: 5px;
        }
      }
      .createdArea {
        margin-right: 30px;
        font-size: 15px;
        margin-bottom: 10px;
      }
      .updatedArea {
        font-size: 15px;
        margin-bottom: 10px;
      }
    }
    .btnFavourite {
      position: absolute;
      z-index: 99;
      top: 7px;
      right: 7px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      &:hover::after {
        content: "Favoritar/Desfavoritar";
        font-size: 13px;
        padding: 5px;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        bottom: -25px;
      }
      img {
        width: 20px;
      }
    }
  }
  .btnMoreInfos {
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
    padding: 10px 0px;
    background-color: transparent;
    cursor: pointer;
    transition: all ease 0.4s;
    img {
      width: 15px;
      animation: animeImg 0.8s infinite;
    }
    @keyframes animeImg {
      0% {
        transform: translate3d(0, 0, 0);
      }
      50% {
        transform: translate3d(0, 5px, 0);
      }
      100% {
        transform: translate3d(0, 0px, 0);
      }
    }
  }
  .areaMoreInfos {
    display: none;
    background: #000;
    color: #fff;
    animation: animeOpening 0.5s forwards;
    overflow-y: hidden;
    border-radius: 0px 0px 5px 5px;
    &.actived {
      display: flex;
    }
    @keyframes animeOpening {
      from {
        max-height: 0px;
      }
      to {
        max-height: 150px;
      }
    }
    .userImage {
      background-color: #fff;
      width: 150px;
    }
    .moreInfosUser {
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      span {
        font-weight: 500;
      }
      .forks {
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;
        align-items: center;
        .imgFork {
          width: 13px;
          margin-right: 5px;
        }
      }
      .linkOtherInfos {
        color: #dfff52;
        font-weight: 500;
      }
    }
  }
}
@media (max-width: 600px) {
  .areaMoreInfos {
    .userImage {
      display: none;
    }
  }
}
</style>
