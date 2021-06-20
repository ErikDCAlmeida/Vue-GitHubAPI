<template>
  <div class="geral">
    <div class="element el1"></div>
    <div class="element el2"></div>
    <div class="element el3"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
};
</script>

<style lang="scss" scoped>
.geral {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 200px auto 0px auto;
  .element {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #dfff52;
    border: 5px solid #000;
    margin: 5px;
    animation: loading 0.5s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
  }
  .el1 {
    animation-delay: 0.1s;
  }
  .el2 {
    animation-delay: 0.2s;
  }
  .el3 {
    animation-delay: 0.3s;
  }
  @keyframes loading {
    from {
      transform: translate3d(0, 0px, 0);
    }
    to {
      transform: translate3d(0, 30px, 0);
    }
  }
}
</style>
