<template>
  <div class="comment">
    <div class="comment-wrapper">
      <div class="comment-img" :style="`background-image: url(${thumbnail})`"></div>
      <div class="comment-text">
        <div class="comment-title">
          <p>{{ name }}</p>
          <p>{{ timestamp }}</p>
        </div>
        <div class="comment-body">
          <p>{{ comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'name',
    'timestamp',
    'comment',
    'thumbnail'
  ]
}
</script>

<style>

.comment {
  margin: 10px 0;
}

.comment-wrapper {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}

.comment-img {
  flex: 1;
  /* background-image: url('~assets/img/png/ogp.png'); */
  background-size: cover;
  background-position: center center;
  padding-top: 25%;
  box-sizing: border-box;
}

.comment-text {
  flex: 3;
  box-sizing: border-box;
  width: 30%;
  margin-left: 10px;
}

.comment-title {
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
}

.comment-body {
  margin-top: 10px;
}

</style>