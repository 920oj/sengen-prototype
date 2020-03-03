<template>
  <div class="top-header-container">
    <div class="top-header">
      <div class="top-header-left">
        <img src="~assets/img/sengen-logo.svg" alt="Sengen.jp" class="top-header-logo">
      </div>
      <div class="top-header-right">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.top-header-container {
  width: 100%;
  height: 60px;
  margin: 0;
  position: fixed;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  padding: 0 15px;

  color: #fff;
  background: #F27435;
}

.top-header-logo {
  height: 30px;
  width: auto;
}

</style>