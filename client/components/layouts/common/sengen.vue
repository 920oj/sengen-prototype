<template>
  <div class="sengen">
    <div class="sengen-wrapper">
      <div class="sengen-category">
        {{category}}
      </div>
      <div class="sengen-img">
        <!-- あとで:src="img"にする -->
        <img src="~/assets/img/png/ogp.png" alt="サムネイル">
      </div>
      <div class="sengen-description">
        <div class="sengen-desc">
          <p>宣言pt: {{point}}</p>
          <p>応援者数: {{supporter}}人</p>
          <p>残り: {{expires}}日</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'category',
    'title',
    'img',
    'point',
    'supporter',
    'expires',
  ]
}
</script>

<style scoped>

</style>