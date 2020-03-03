<template>
  <div class="index">
    <Header />
  </div>
</template>

<script>
import Header from '~/components/layouts/index/topHeader.vue';

export default {
  layout: 'onlyFooter',
  components: {
    Header,
  }
}
</script>

<style>

</style>
