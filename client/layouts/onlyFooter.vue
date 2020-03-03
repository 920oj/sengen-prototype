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
import Footer from '~components/layouts/common/footer.vue';

export default {
  components: {
    Footer,
  }

}
</script>

<style>
body {
  font-family: 'Roboto', 'Noto Sans JP';
  
}
</style>