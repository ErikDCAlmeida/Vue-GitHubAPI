<template>
  <footer>
    <div class="containerFooter">
      <p>
        Projeto desenvolvido como forma de aprendizado utilizando a API do
        GitHub. Por
        <a href="https://www.linkedin.com/in/erikdcalmeida/" target="_blank">
          ErikDCAlmeida.
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
footer {
  background: #000;
  color: #fff;
  .containerFooter {
    max-width: 1100px;
    padding: 5px;
    width: 100%;
    margin: 0 auto;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: #dfff52;
    }
  }
}
</style>
