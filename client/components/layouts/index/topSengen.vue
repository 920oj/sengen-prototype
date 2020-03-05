<template>
  <div class="top-sengen">
    <div class="top-sengen-elem" v-for="item in displayList" :key="item.id">
      <Sengen :category="item.category" :title="item.title" :point="item.point" :supporter="item.supporter" :expires="item.expires" />
    </div>
    <div class="top-sengen-pagination">
      <Pagination :max="max_row"  />
    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'
import Pagination from '~/components/ui/nav/paginationNav.vue'

export default {
  data () {
    return {
      'current': 3,
    }
  },
  props: [
    'list',
  ],
  components: {
    Sengen,
    Pagination
  },
  computed: {
    max_row: function() {
      return this.list.length
    },
    displayList: function() {
      return this.list[this.current - 1]
    }
  },
}
</script>

<style>

</style>