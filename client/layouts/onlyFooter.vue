<template>
  <div>
    <main>
      <nuxt />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Footer from '~/components/layouts/common/footer.vue';

export default {
  components: {
    Footer,
  }

}
</script>

<style>
body {
  font-family: 'Roboto', 'Noto Sans JP';
  width: 100%;
  background-color: #F3F4F9;
}
</style>