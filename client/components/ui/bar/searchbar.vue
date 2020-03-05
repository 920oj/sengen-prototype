<template>
    <div class="search-conatiner">
        <input type="text" placeholder="宣言を検索" class="search-form">
        <div class="search-btn-container">
            <img src="~assets/img/icon/search.svg" alt="検索">
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.search-conatiner {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
}

.search-form {
  height: 50px;
  box-sizing: border-box;
  border: 0;
  padding: 0;
  width: 100%;
  font-size: 1.2rem;
  font-family: 'Roboto', 'Noto Sans JP';
}

.search-btn-container {
  height: 50px;
  width: 50px;
  background: #232531;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>