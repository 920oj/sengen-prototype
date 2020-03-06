<template>
  <div class="top-sengen">
    <div class="top-sengen-elem" v-for="item in displayList" :key="item.id">
      <Sengen :tag="item.tag" 
              :name="item.name"
              :hasp="item.hasp"
              :thumbnail="item.thumbnail"
              :supporters="item.supporters" 
              :deadline="item.deadline" 
      />
    </div>
    <div class="top-sengen-pagination">
      <Pagination 
        :max="max_row" 
        :current="current" 
        @plusCurrent="plusCurrent()" 
        @lastCurrent="lastCurrent()" 
        @minusCurrent="minusCurrent()" 
        @firstCurrent="firstCurrent()"
      />
    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'
import Pagination from '~/components/ui/nav/paginationNav.vue'

export default {
  data () {
    return {
      'current': 1,
    }
  },
  props: [
    'list',
  ],
  components: {
    Sengen,
    Pagination
  },
  methods: {
    firstCurrent() {
      this.current = 1;
    },
    plusCurrent() {
      this.current += 1;
    },
    minusCurrent() {
      this.current -= 1;
    },
    lastCurrent() {
      this.current = this.list.length;
    }
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
.top-sengen-pagination {
  margin-bottom: 30px;
}
</style>