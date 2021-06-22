<template>
  <section>
    <div class="areaGridInfosUser" v-if="completed">
      <div class="areaImageName">
        <img :src="object.avatar_url" :alt="object.login + 'IMG'" />
      </div>
      <div class="areaPersonalInfos">
        <div class="infos1">
          <p class="fullName">
            {{ object.name ? object.name : "Sem informação!" }}
          </p>
          <p class="nameLogin">
            {{ object.login ? object.login : "Sem informação!" }}
          </p>
          <p class="useBio">
            {{ object.bio ? object.bio : "Sem informação!" }}
          </p>
          <div class="areaFollow">
            <p class="following">
              <img src="../assets/followingBlack.png" alt="followingIcon" />
              <span>{{ object.following }}</span>
            </p>
            <p class="followers">
              <img src="../assets/followersBlack.png" alt="followerIcon" />
              <span>{{ object.followers }}</span>
            </p>
          </div>
        </div>
        <div class="infos2">
          <p class="location">
            <img src="../assets/pinBlack.png" alt="locationIcon" />
            <span>
              {{ object.location ? object.location : "Sem informação!" }}
            </span>
          </p>
          <p class="email">
            <img src="../assets/emailBlack.png" alt="siteIcon" />
            <a
              :href="blog(object.blog)"
              target="_blank"
              :style="
                !object.blog
                  ? 'pointer-events:none;'
                  : 'border-bottom: 2px solid #000'
              "
              >{{ object.blog ? blog(object.blog) : "não informado!" }}
            </a>
          </p>
          <p class="company">
            <img src="../assets/companyBlack.png" alt="companyIcon" />
            <span>
              {{ object.company ? object.company : "Sem informação!" }}
            </span>
          </p>
          <div class="infosCreateUpdate">
            <p class="create">
              <img src="../assets/ideaBlack.png" alt="createdIcon" />
              <span>{{ dateCreated }}</span>
            </p>
            <p class="update">
              <img src="../assets/refreshBlack.png" alt="updatedIcon" />
              <span>{{ dateUpdated }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="areaRepositories">
        <div class="areaTop">
          <p class="nameTop">
            <img src="../assets/folderBlack.png" alt="folderBlack" />
            <span>Repositórios</span>
          </p>
          <a
            :href="`https://github.com/${object.login}?tab=repositories`"
            class="btnMoreRepositories"
            target="_blank"
            >Ver todos...</a
          >
        </div>
        <div v-for="(repo, index) in reposObject" :key="index" class="repo">
          <a :href="repo.html_url" target="_blank" class="link">
            <p>{{ repo.full_name }}</p>
          </a>
          <p>- {{ repo.description ? repo.description : "Sem descrição!" }}</p>
          <div class="infosExtraRepository">
            <p class="areaForkRepository">
              <img src="../assets/forkImgBlack.png" alt="forkImgBlack" />
              <span>{{ repo.forks }}</span>
            </p>
            <p class="areaStarsRepository">
              <img src="../assets/starNormal.png" alt="starNormalIcon" />
              <span>{{ repo.watchers }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <LoadingScreen v-else />
  </section>
</template>

<script>
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  name: "User",
  props: ["id"],
  components: {
    LoadingScreen,
  },
  data() {
    return {
      object: null,
      reposObject: null,
      completed: false,
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
      fetch(`https://api.github.com/users/${this.id}`)
        .then((r) => r.json())
        .then((r) => {
          this.object = r;
          this.fetchReposUser();
        });
    },
    fetchReposUser() {
      fetch(`${this.object.repos_url}`)
        .then((r) => r.json())
        .then((r) => {
          this.reposObject = r;
          this.completed = true;
        });
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
.areaGridInfosUser {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  margin-top: 40px;
  .areaImageName {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    img {
      border-radius: 50%;
      width: 300px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
    }
  }
  .areaPersonalInfos {
    grid-row: 1 / 2;
    grid-column: 2 / 4;
    display: flex;
    justify-content: space-between;
    img {
      width: 23px;
      margin-right: 5px;
    }
    .infos1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 20px;
      p {
        display: flex;
        align-items: center;
      }
      .fullName {
        font-weight: 500;
        font-size: 30px;
        margin-bottom: 5px;
      }
      .nameLogin {
        font-weight: 500;
        font-size: 18px;
        color: #777;
        margin-bottom: 30px;
      }
      .useBio {
        font-size: 15px;
        margin-bottom: 30px;
      }
      .areaFollow {
        display: flex;
        font-weight: 500;
        .following {
          margin-right: 15px;
          display: flex;
          align-items: center;
          position: relative;
          &:hover::after {
            content: "Seguindo";
            font-size: 13px;
            padding: 5px;
            border: 1px solid #dfff52;
            border-radius: 3px;
            background-color: #000;
            color: #dfff52;
            position: absolute;
            z-index: 99;
            right: -25px;
            top: -27px;
          }
        }
        .followers {
          position: relative;
          &:hover::after {
            content: "Seguidores";
            font-size: 13px;
            padding: 5px;
            border: 1px solid #dfff52;
            border-radius: 3px;
            background-color: #000;
            color: #dfff52;
            position: absolute;
            z-index: 99;
            right: -25px;
            top: -27px;
          }
        }
        img {
          margin-right: 5px;
        }
      }
    }
    .infos2 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .location {
        position: relative;
        &:hover::after {
          content: "Localização";
          font-size: 13px;
          padding: 5px;
          border: 1px solid #dfff52;
          border-radius: 3px;
          background-color: #000;
          color: #dfff52;
          position: absolute;
          z-index: 99;
          left: 0px;
          top: -27px;
        }
      }
      .email {
        position: relative;
        a {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover::after {
          content: "E-mail";
          font-size: 13px;
          padding: 5px;
          border: 1px solid #dfff52;
          border-radius: 3px;
          background-color: #000;
          color: #dfff52;
          position: absolute;
          z-index: 99;
          left: 0px;
          top: -27px;
        }
      }
      .company {
        position: relative;
        &:hover::after {
          content: "Companhia";
          font-size: 13px;
          padding: 5px;
          border: 1px solid #dfff52;
          border-radius: 3px;
          background-color: #000;
          color: #dfff52;
          position: absolute;
          z-index: 99;
          left: 0px;
          top: -27px;
        }
      }
      .create {
        position: relative;
        &:hover::after {
          content: "Criação";
          font-size: 13px;
          padding: 5px;
          border: 1px solid #dfff52;
          border-radius: 3px;
          background-color: #000;
          color: #dfff52;
          position: absolute;
          z-index: 99;
          left: 0px;
          top: -27px;
        }
      }
      .update {
        position: relative;
        &:hover::after {
          content: "Última atualização";
          font-size: 13px;
          padding: 5px;
          border: 1px solid #dfff52;
          border-radius: 3px;
          background-color: #000;
          color: #dfff52;
          position: absolute;
          z-index: 99;
          left: 0px;
          top: -27px;
        }
      }
    }
  }
  .areaRepositories {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
    padding: 10px;
    margin-top: 50px;
    .areaTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .nameTop {
        display: flex;
        align-items: center;
        img {
          width: 45px;
          margin-right: 10px;
        }
        span {
          font-weight: 600;
          font-size: 40px;
        }
      }
      .btnMoreRepositories {
        background-color: transparent;
        color: #000;
        padding: 7px 20px;
        border: 2px solid #000;
        border-radius: 5px;
        font-weight: 500;
        &:hover {
          background: #000;
          color: #dfff52;
        }
      }
    }
    .repo {
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      .link {
        p {
          font-weight: 600;
          font-size: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      p {
        font-size: 15px;
        margin-top: 10px;
        color: #444;
      }
      .infosExtraRepository {
        display: flex;
        margin-bottom: 20px;
        .areaForkRepository,
        .areaStarsRepository {
          font-size: 15px;
          font-weight: 500;
          display: flex;
          align-items: center;
          margin-right: 20px;
          img {
            width: 15px;
            margin-right: 5px;
          }
        }
        .areaStarsRepository {
          img {
            width: 23px;
          }
        }
      }
    }
  }
}
@media (max-width: 920px) {
  .areaGridInfosUser {
    row-gap: 50px;
    .areaImageName {
      grid-row: 1 / 2;
      grid-column: 1 / 4;
      display: flex;
      justify-content: center;
    }
    .areaPersonalInfos {
      grid-row: 2 / 3;
      grid-column: 1 / 4;
    }
    .areaRepositories {
      grid-row: 3 / 4;
      grid-column: 1 / 4;
    }
  }
}
@media (max-width: 690px) {
  .areaGridInfosUser {
    .areaImageName {
      img {
        width: 250px;
      }
    }
    .areaPersonalInfos {
      flex-direction: column;
      .infos1 {
        margin-right: 0px;
        margin-bottom: 50px;
      }
    }
    .areaRepositories {
      margin-top: 0px;
      .areaTop {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;
        .nameTop {
          margin-bottom: 10px;
        }
      }
    }
  }
}
@media (max-width: 350px) {
  .areaGridInfosUser {
    .areaRepositories {
      .areaTop {
        .nameTop {
          span {
            font-size: 2rem;
          }
        }
      }
    }
  }
}
</style>
