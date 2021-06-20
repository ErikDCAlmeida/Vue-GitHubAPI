<template>
  <div class="about">
    <h1>• Sobre o criador</h1>
    <p>
      Meu nome é Erik Danilo, sou Desenvolvedor Front-end com conhecimento em
      HTML5, CSS3, JavaScript, Vue.JS, SCSS, Vuex, Nuxt.JS, Git/GitHub,
      Bootstrap 4+, Vuetify e projéteis ágeis SCRUM. Meu desejo é me tornar um
      programador cada vez mais profissional e poder utilizar meu conhecimento
      sempre para o crescimento das empresas e projetos a qual eu esteja
      inserido e assim me desenvolver profissional a cada passa dado,
      conhecimento adquirido e projetos finalizados/atualizados.
    </p>
    <h3>Redes Sociais</h3>
    <div class="imgsSocialMedia">
      <a href="https://www.linkedin.com/in/erikdcalmeida/" target="_blank">
        <img
          src="../assets/linkedin.png"
          alt="linkedinLogo"
          class="imgLinkedin"
        />
      </a>
      <a href="https://github.com/ErikDCAlmeida" target="_blank">
        <img src="../assets/github.png" alt="githubLogo" class="imgGitHub" />
      </a>
    </div>
    <h1>• Sobre utilidade das páginas</h1>
    <h3>Home</h3>
    <p>
      Nessa página será possível você visualizar os projetos que visitou
      recentemente e assim ter um modo mais rápido de acesso sem precisar
      pesquisar pelo repositório.
    </p>
    <p>
      Na mesma página também será possível fazer um pesquisa, escolhendo
      pesquisar por repositórios ou por pessoas, lembrando que caso não marque
      nenhuma opção o padrão a ser pesquisado será por
      <strong>repositórios</strong>.
    </p>
    <h3>Favoritos</h3>
    <p>
      Na página de favoritos estará todos os projetos a qual você marcou como
      favorito e assim agilizar para encontrar esses projetos sem precisar
      pesquisar de um por um.
    </p>
    <h1>• Como utilizar o projeto</h1>
    <h3>- Search da página incial</h3>
    <p>
      Você poderá utilizar o campo de procura para pesquisar por repositórios ou
      pessoas com nome parecido com o que você digitou no campo. Poderá fazer
      escolha manualmente clicando em <strong>Repositórios</strong> ou
      <strong>Pessoa</strong>, caso não seja indicado nenhum dos dois a busca
      ocorrerá automaticamente em cima dos repositórios.
    </p>
    <h3>1. Search por repositório.</h3>
    <p>
      Nessa tela você encontrará o resultado da sua pesquisa baseado na escolha
      de repositórios, nela haverá vários repsitórios com algumas informações
      referentes ao repositório. Clicando na
      <strong>seta (botão)</strong> abaixo da área do repositório, você
      encontrar mais informações e também o nome do criador, podendo clicar em
      seu nome ser redirecionado a uma página com informações mais detalhadas
      sobre o criador do projeto. Também é possível clicar no campo "aqui!" para
      ser direcionado à página do GitHub que contém o projeto e seus arquivos.
      Após fazer isso, ficará salvo o projeto mais recente visitado na tela
      <strong>Home</strong>, você poderá encontrá-lo na área de
      <strong>Projetos visitados recentemente</strong>.
    </p>
    <p>
      Clicando na estrela, você irá favoritar o repositório, ele estará
      disponível na aba
      <router-link class="link" :to="{ name: 'Favourites' }"
        >Favoritos</router-link
      >, onde poderá encontrá-lo de maneira mais fácil e sem precisar fazer
      novamente qualquer tipo de pesquisa para encontrá-lo.
    </p>
    <p>
      No botão <strong class="btn">Ver mais...</strong> é possível carregar mais
      repositórios. Mas tome cuidado, essa API do GitHub contém limitações
      quanto a quantidade de requisições realizadas, é possível que se fizer
      muitas pesquisas o projeto trave por não poder receber mais resposta do
      servidor. Porém, tudo voltará ao normal pouco tempo depois, levando em
      torno de 30 minutos para receber novamente resposta do servidor. Portanto,
      procure sempre colocar o nome mais aproximado possível do projeto que
      deseja encontrar para não causar problemas.
    </p>
    <h3>2. Search por pessoa</h3>
    <p>
      Nessa tela você encontrar o resultado da sua pesquisa baseado na escolha
      de pessoa, nela haverá vários perfis com informações do usuários do
      GitHub. Você poderá clicar no <strong>nome</strong> do usuário para ser
      direcionado a uma página com informações sobre o mesmo. Poderá também
      clicar no link de Blog/Site para ser redirecionado a um link externo do
      usuário, podendo ser site/blog pessoal ou corporativo.
    </p>
    <p>
      Clicando na <strong>seta (botão)</strong> é possível visualizar algumas
      informações extras sobre a conta do usuário e alguns repositórios que
      possui no GitHub, com informações preliminares de nome completo e
      descrição. Caso clique no nome do repositório será redirecionado para a
      página do projeto do GitHub.
    </p>
    <h3>3. Tela do perfil da pessoa</h3>
    <p>
      Após clicar no <strong>nome</strong> da pessoa na página
      <strong>2. Search por pessoa</strong> você será direcionado para essa
      página com várias informações do usuário de mais visível, porém, é somente
      da pessoa que você clicou. Na página você encontrará também no máximo 30
      repositórios da pessoa, ou seja, caso o usuário possua mais de 30 você
      precisará clicar no botão <strong class="btn">Ver todos...</strong> para
      ser direcionado a página do GitHub que possui todos os repositórios do
      usuário.
    </p>
    <h4>
      *Esse projeto foi criado para utilizar a API disponibilizada pelo GitHub
      utilizando as ações que não necessitam de algum tipo autenticação.
    </h4>
  </div>
</template>

<script>
export default {
  name: "About",
  watch: {
    $route(to, from, next) {
      document.title = to.meta.title || "About";
      next();
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  padding: 0px 10px;
  h1 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  h3 {
    margin-bottom: 10px;
  }
  h4 {
    margin-bottom: 100px;
  }
  p {
    margin-bottom: 15px;
    text-align: justify;
  }
  img {
    width: 50px;
    margin-right: 20px;
  }
  .btn {
    border: none;
    padding: 3px 15px;
    border-radius: 5px;
    background-color: #000;
    font-weight: 500;
    color: #dfff52;
    font-size: 13px;
  }
  .imgsSocialMedia {
    .imgLinkedin {
      &:first-child:hover {
        filter: invert(23%) sepia(87%) saturate(2178%) hue-rotate(197deg)
          brightness(94%) contrast(92%);
      }
    }
  }
  .link {
    font-weight: 600;
    border-bottom: 2px solid #000;
    &:hover {
      color: #ff7b00;
      border-color: #ff7b00;
    }
  }
}
</style>
