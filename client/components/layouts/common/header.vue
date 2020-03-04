<template>
  <div class="header-container">
    <div class="header">
      <div class="header-left">
        <img src="~assets/img/sengen-logo.svg" alt="Sengen.jp" class="header-logo">
      </div>
      <div class="header-right">
        <img src="~assets/img/icon/bars.svg" alt="menu" class="header-menu-bar" @click="toggleMenu()">
      </div>
    </div>

    <div class="header-menu" v-if="menuIsOpened">
      <div class="search-conatiner">
        <input type="text" placeholder="宣言を検索" class="search-form">
        <div class="search-btn-container">
          <img src="~assets/img/icon/search.svg" alt="検索">
        </div>
      </div>
      <ul>
        <li class="header-menu-elem">トップ</li>
        <li class="header-menu-elem">ログイン</li>
        <li class="header-menu-elem">検索</li>
        <li class="header-menu-elem">宣言する</li>
        <li class="header-menu-elem">マイページ</li>
        <li class="header-menu-elem">ポイント購入</li>
      </ul>
    </div>

  </div>
</template>

<script>

function scroll_control(event) {
  event.preventDefault();
}

export default {
  data() {
    return {
      'menuIsOpened': false,
    }
  },
  methods: {
    toggleMenu: function() {
      if(this.menuIsOpened) {
        document.removeEventListener("mousewheel", scroll_control, { passive: false });
        document.removeEventListener('touchmove', scroll_control, { passive: false });
        this.menuIsOpened = false;
      } else {
        document.addEventListener("mousewheel", scroll_control, { passive: false });
        document.addEventListener("touchmove", scroll_control, { passive: false });
        this.menuIsOpened = true;
      }
    },
    jumpTo: function(link) {
      if(this.menuIsOpened) {
        document.removeEventListener("mousewheel", scroll_control, { passive: false });
        document.removeEventListener('touchmove', scroll_control, { passive: false });
        this.menuIsOpened = false;
      }
      this.$router.push(link);
    }
  }
}
</script>

<style scoped>

.header-container {
  width: 100%;
  height: 80px;
  margin: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  box-sizing: border-box;

  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;

  color: #fff;
  background: #F27435;
}

.header-logo, .header-menu-bar {
  height: 30px;
  width: auto;
}

.header-menu-bar {
  cursor: pointer;
}

.header-menu ul {
  list-style: none;
  margin: 50px 0;
}

.header-menu li {
  margin: 40px 0;
  color: #FFF;
  text-align: center;
  font-size: 1.3rem;
}

.header-menu {
  background: #F27435;
  /* height: calc(100vh - 100px); */
  width: 100%;
  position: fixed;
  left: 0;
  top: 80px;
}

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