<template>
  <div class="geral">
    <div class="infosUser">
      <img
        :src="object.avatar_url"
        :alt="object.login + 'IMG'"
        class="imgUser"
      />
      <div class="areaInfos">
        <div class="infos">
          <p class="nome">
            <router-link
              :to="{ name: 'User', params: { id: object.login } }"
              v-if="object.login"
            >
              <span class="nameLogin">{{ object.login }}</span>
            </router-link>
            {{ object.name ? " | " + object.name : "" }}
          </p>
          <p>{{ object.bio ? object.bio : "Sem biografia!" }}</p>
          <p class="linkBlogUser">
            Blog/Site:
            <a
              :href="blog(object.blog)"
              target="_blank"
              class="linkExternal"
              :style="
                !object.blog
                  ? 'pointer-events:none;'
                  : 'border-bottom: 2px solid #000'
              "
            >
              {{ object.blog ? "clique aqui!" : "não informado!" }}
            </a>
          </p>
        </div>
        <button class="btnMoreInfos" @click="moreInfos">
          <img src="../assets/arrowsExtraInfos.png" alt="arrowsmoreinfos" />
        </button>
      </div>
    </div>
    <div class="areaMoreInfos">
      <div class="areaPersonalInfos">
        <p class="companyInfo">
          <img src="../assets/company.png" alt="companyIcon" /><span>{{
            object.company ? object.company : "não informado!"
          }}</span>
        </p>
        <p class="locationInfo">
          <img src="../assets/pin.png" alt="locationIcon" /><span>{{
            object.location ? object.location : "não informado!"
          }}</span>
        </p>
        <p class="emailInfo">
          <img src="../assets/email.png" alt="emailIcon" />
          <span>{{ object.email ? object.email : "não informado!" }}</span>
        </p>
      </div>
      <div class="areaRepositoryInfos">
        <p class="repositoryInfo">
          <img src="../assets/folder.png" alt="bookIcon" />
          <span>{{ object.public_repos }}</span>
        </p>
        <p class="followingInfo">
          <img src="../assets/following.png" alt="followingIcon" />
          <span>{{ object.following }}</span>
        </p>
        <p class="followersInfo">
          <img src="../assets/followers.png" alt="followersIcon" />
          <span>{{ object.followers }}</span>
        </p>
      </div>
      <div class="areaCreateAccount">
        <p class="createdInfo">
          <img src="../assets/idea.png" alt="createIcon" />
          <span>{{ dateCreated }}</span>
        </p>
        <p class="updatedInfo">
          <img src="../assets/refresh.png" alt="updatedIcon" />
          <span>{{ dateUpdated }}</span>
        </p>
      </div>
      <div class="areaSomeRepositories">
        <p class="repositories">
          <img src="../assets/folder.png" alt="repositoryIcon" />
          <span>Alguns repositórios</span>
        </p>
        <div class="areaRepositories">
          <p v-for="(item, index) in reposUser" :key="index" class="linksRepos">
            <a :href="item.html_url" target="_blank">
              {{ item.full_name }}
            </a>
            <span
              >-
              {{ item.description ? item.description : "Sem descrição." }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElementPerson",
  props: ["index", "element"],
  data() {
    return {
      object: {},
      reposUser: [],
      searchCompleted: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    blog(link) {
      if (link) {
        if (link.includes("https://")) {
          return link;
        } else if (link.includes("http://")) {
          return link;
        } else {
          return `https://${link}`;
        }
      }
    },
    fetchUser() {
      fetch(`${this.element.url}`)
        .then((r) => r.json())
        .then((r) => {
          this.object = r;
          this.searchCompleted = true;
        });
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
      if (!this.repoSearched) {
        fetch(`${this.object.repos_url}`)
          .then((r) => r.json())
          .then((r) => {
            this.reposUser = r.slice(0, 5);
          });
        this.repoSearched = true;
      }
    },
  },
  computed: {
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
};
</script>

<style lang="scss" scoped>
.geral {
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #ccc;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  .infosUser {
    display: flex;
    .imgUser {
      width: 150px;
      border-radius: 5px 0px 0px 5px;
    }
    .areaInfos {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .infos {
        padding: 10px 0px 0px 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 10px;
        .nome {
          font-size: 16px;
          .nameLogin {
            font-size: 20px;
            font-weight: 600;
          }
        }
        .linkExternal {
          font-weight: 600;
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
    }
  }
  .areaMoreInfos {
    background-color: #000;
    color: #fff;
    border-radius: 0px 0px 5px 5px;
    padding: 10px;
    display: none;
    grid-template-columns: repeat(4, 1fr);
    animation: anime 0.5s forwards;
    overflow: hidden;
    &.actived {
      display: grid;
    }
    @keyframes anime {
      from {
        max-height: 0px;
      }
      to {
        max-height: auto;
      }
    }
    .areaPersonalInfos {
      padding: 5px;
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      .locationInfo,
      .emailInfo,
      .companyInfo {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        cursor: context-menu;
        position: relative;
        img {
          width: 20px;
          margin-right: 7px;
        }
      }
      .companyInfo:hover::after {
        content: "Companhia";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
      }
      .locationInfo:hover::after {
        content: "Localização";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
      }
      .emailInfo:hover::after {
        content: "E-mail";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
      }
    }
    .areaRepositoryInfos {
      padding: 5px;
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      .repositoryInfo,
      .followersInfo,
      .followingInfo {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        cursor: context-menu;
        position: relative;
        img {
          width: 20px;
          margin-right: 7px;
        }
      }
      .followersInfo:hover::after {
        content: "Seguidores";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
      }
      .followingInfo:hover::after {
        content: "Seguindo";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
      }
      .repositoryInfo:hover::after {
        content: "Repositórios";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        right: 0;
        top: 0;
      }
    }
    .areaCreateAccount {
      display: flex;
      padding: 5px;
      grid-row: 2 / 3;
      grid-column: 1 / 3;
      align-items: flex-start;
      justify-content: space-evenly;
      position: relative;
      .createdInfo,
      .updatedInfo {
        display: flex;
        align-items: center;
        cursor: context-menu;
        position: relative;
        img {
          width: 20px;
          margin-right: 7px;
        }
      }
      .createdInfo:hover::after {
        content: "Criação";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        left: 35px;
        bottom: -30px;
      }
      .updatedInfo:hover::after {
        content: "Atualizado";
        font-size: 13px;
        padding: 5px;
        border: 1px solid #dfff52;
        border-radius: 3px;
        background-color: #000;
        color: #dfff52;
        position: absolute;
        z-index: 99;
        left: 25px;
        bottom: -30px;
      }
    }
    .areaSomeRepositories {
      grid-row: 1 / 3;
      grid-column: 3 / 5;
      padding: 5px;
      .repositories {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        cursor: context-menu;
        position: relative;
        img {
          width: 20px;
          margin-right: 10px;
        }
      }
      .areaRepositories {
        margin-bottom: 20px;
        .linksRepos {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          cursor: context-menu;
          a {
            color: #dfff52;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          span {
            font-size: 14px;
            color: #aaa;
          }
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .geral {
    .infosUser {
      flex-direction: column;
      align-items: center;
      .imgUser {
        width: 100%;
      }
      .infos {
        .nome {
          margin-bottom: 10px;
        }
        .linkBlogUser {
          margin: 15px 0px;
        }
      }
    }
    .areaMoreInfos {
      row-gap: 20px;
      .areaPersonalInfos {
        grid-row: 1 / 2;
        grid-column: 1 / 5;
      }
      .areaRepositoryInfos {
        grid-row: 2 / 3;
        grid-column: 1 / 3;
      }
      .areaCreateAccount {
        grid-row: 2 / 3;
        grid-column: 3 / 5;
        flex-direction: column;
        .createdInfo:hover::after {
          left: unset;
          right: 0;
          bottom: 0px;
        }
        .updatedInfo:hover::after {
          left: unset;
          right: 0;
          bottom: 0px;
        }
      }
      .areaSomeRepositories {
        grid-row: 3 / 4;
        grid-column: 1 / 5;
      }
    }
  }
}
</style>
