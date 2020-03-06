<template>
  <div class="pagination">

    <div class="pagination-container" v-if="one_only">
      <div class="pagination-btn btn-active">1</div>
    </div>

    <div class="pagination-container" v-if="right_only">
      <div class="pagination-btn btn-none"></div>
      <div class="pagination-btn btn-none"></div>
      <div class="pagination-btn btn-none"></div>
      <div class="pagination-btn btn-active">1</div>
      <div class="pagination-btn" @click="plusCurrent()">2</div>
      <div class="pagination-btn" @click="plusCurrent()">&gt;</div>
      <div class="pagination-btn" @click="lastCurrent()">&gt;&gt;</div>
    </div>
    <div class="pagination-container" v-if="common">
      <div class="pagination-btn" @click="firstCurrent()">&lt;&lt;</div>
      <div class="pagination-btn" @click="minusCurrent()">&lt;</div>
      <div class="pagination-btn" @click="minusCurrent()">{{current - 1}}</div>
      <div class="pagination-btn btn-active">{{current}}</div>
      <div class="pagination-btn" @click="plusCurrent()">{{current + 1}}</div>
      <div class="pagination-btn" @click="plusCurrent()">&gt;</div>
      <div class="pagination-btn" @click="lastCurrent()">&gt;&gt;</div>
    </div>
    <div class="pagination-container" v-if="left_only">
      <div class="pagination-btn" @click="firstCurrent()">&lt;&lt;</div>
      <div class="pagination-btn" @click="minusCurrent()">&lt;</div>
      <div class="pagination-btn" @click="minusCurrent()">{{max - 1}}</div>
      <div class="pagination-btn btn-active">{{max}}</div>
      <div class="pagination-btn btn-none"></div>
      <div class="pagination-btn btn-none"></div>
      <div class="pagination-btn btn-none"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'one_only': false,
      'right_only': false,
      'common': false,
      'left_only': false,
    }
  },
  props: {
    'max': Number,
    'current': Number
  },
  methods: {
    judgeStyle: function() {
      if(this.max == 1) {
        this.one_only = true;
        this.right_only = false;
        this.common = false;
        this.left_only = false;
      }
      else if(this.current == 1) {
        this.one_only = false;
        this.right_only = true;
        this.common = false;
        this.left_only = false;
      }
      else if (this.current == this.max) {
        this.one_only = false;
        this.right_only = false;
        this.common = false;
        this.left_only = true;
      }
      else {
        this.one_only = false;
        this.right_only = false;
        this.common = true;
        this.left_only = false;
      }
    },
    plusCurrent: async function() {
      this.scrollTop()
      await this.$emit('plusCurrent');
    },
    lastCurrent: async function() {
      this.scrollTop()
      await this.$emit('lastCurrent');
    },
    minusCurrent: async function() {
      this.scrollTop()
      await this.$emit('minusCurrent');
    },
    firstCurrent: async function() {
      this.scrollTop()
      await this.$emit('firstCurrent');
    },
    scrollTop: function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  },
  watch: {
    current: function() {
      this.judgeStyle();
    }
  },
  mounted() {
    this.judgeStyle();
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  color: #FFF;
  margin: 0 auto;
}

.pagination-btn {
  width: 35px;
  height: 35px;
  background: #232531;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.btn-none {
  background: transparent;
}

.btn-active {
  background: #F27435;
}

</style>