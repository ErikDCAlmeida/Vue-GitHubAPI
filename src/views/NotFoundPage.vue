<template>
  <div class="main">
    <h1 class="msgError">Oops!</h1>
    <h1>404</h1>
    <h2>Page NotFound</h2>
    <p>Desculpe, essa página não pôde ser encontrada!</p>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  .msgError {
    font-size: 150px;
    background: url(../assets/errorBG.jpg);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h1 {
    font-size: 100px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
  }
}
@media (max-width: 500px) {
  .main {
    .msgError {
      font-size: 100px;
    }
    h1 {
      font-size: 80px;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 30px;
      margin-bottom: 10px;
    }
    p {
      font-size: 17px;
    }
  }
}
</style>
