<template>
  <div class="pagination">
    <div class="pagination-container">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'right_only': false,
      'common': false,
      'left_only': false,
    }
  },
  props: [
    'max',
    'current'
  ],
  computed: {
    changeStyle: function() {
      if(this.current == 1) {
        this.right_only = true;
        this.common = false;
        this.left_onlu = false;
      }
      else if (this.current == this.max) {
        this.right_only = true;
        this.common = false;
        this.left_onlu = false;
      }
      else {
        this.right_only = false;
        this.common = false;
        this.left_onlu = true;
      }
    }
  }
}
</script>

<style>

</style>