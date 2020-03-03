<template>
  <div class="btn-with-icon">
    <img :src="loadImg()" :alt="title" class="btn-with-icon-img">
    <p class="btn-with-icon-title">{{title}}</p>
    <p class="btn-with-icon-r">＞</p>
  </div>
</template>

<script>

export default {
  props: [
    'title',
    'icon',
    'link',
  ],
  methods: {
    loadImg: function() {
      console.log(`~/assets/${this.icon}`);
      return require(`~/assets/${this.icon}`)
    } 
  }
}
</script>

<style>

.btn-with-icon {
  background-color: #232531;
  display:flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  height: 35px;
  padding: 5px 10px;
  width: 10rem;
  cursor: pointer;
  margin: 0 auto;
}

.btn-with-icon-img {
  height: 15px;
}

.btn-with-icon-title {
  font-weight: 900;
  font-size: 1.2rem;
}

.btn-with-icon-r {
  font-size: 0.5rem;
}

</style>