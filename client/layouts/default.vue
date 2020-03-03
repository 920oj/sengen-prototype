<template>
  <div>
    <header>
      <Header />
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from '~/components/layouts/common/header.vue';
import Footer from '~/components/layouts/common/footer.vue';

export default {
  components: {
    Header,
    Footer,
  }
}


</script>

<style>
body {
  font-family: 'Roboto', 'Noto Sans JP';
  
}
</style>
