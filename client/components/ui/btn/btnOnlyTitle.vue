<template>
  <div class="btn-only-title">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'link'
  ]
}
</script>

<style>
.btn-only-title {
  background-color: #232531;
  display:flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 35px;
  padding: 5px 10px;
  width: 5rem;
  border-radius: 10px;
  cursor: pointer;
}

.btn-only-title p {
  font-weight: 900;
}
</style>