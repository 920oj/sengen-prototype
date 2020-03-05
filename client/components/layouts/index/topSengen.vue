<template>
  <div class="top-sengen">
    <div class="sengen-elem" v-for="item in list" :key="item.id">
      <Sengen :category="item.category" :title="item.title" :point="item.point" :supporter="item.supporter" :expires="item.expires" />
    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'

export default {
  props: [
    'list',
  ],
  components: {
    Sengen,
  },
}
</script>

<style>

</style>