<template>
  <div class="sengen">
    <div class="sengen-wrapper">
      <div class="sengen-category">
        {{ tag }}
      </div>
      <div class="sengen-img">
        <!-- あとで:src="img"にする -->
        <!-- <img src="~/assets/img/png/ogp.png" alt="サムネイル"> -->
      </div>
      <div class="sengen-description">
        <p class="sengen-title">{{ name }}</p>
        <div class="sengen-desc">
          <p>宣言pt: {{ hasp }}pt</p>
          <p>応援者数: {{ supporters.length }}人</p>
          <p>残り: {{ deadline }}日</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tag',
    'name',
    'img',
    'hasp',
    'supporters',
    'deadline',
  ]
}
</script>

<style scoped>
.sengen-wrapper {
  margin: 30px auto;
  width: 95%;
  max-width: 500px;
}

.sengen-category {
  color: #FFF;
  background-color: #F27435;
  display: inline-block;
  padding: 10px 15px;
}

.sengen-img {
  background-image: url('~assets/img/png/ogp.png');
  background-size: cover;
  background-position: center center;
  padding-top: 56.25%;
  width: 100%;
}

.sengen-description {
  background-color: #FFF;
  padding: 10px;
}

.sengen-title {
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 1.7;
}

.sengen-desc {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #999;
}
</style>