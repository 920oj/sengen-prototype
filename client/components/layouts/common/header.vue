<template>
  <div class="header-container">
    <div class="header">
      <div class="header-left">
        <img src="~assets/img/sengen-logo.svg" alt="Sengen.jp" class="header-logo" @click="jumpTo('/')">
      </div>
      <div class="header-right">
        <img src="~assets/img/icon/bars.svg" alt="menu" class="header-menu-bar" @click="toggleMenu()">
      </div>
    </div>

    <div class="header-menu" v-if="menuIsOpened">
      <searchBar />
      <ul>
        <li class="header-menu-elem" @click="jumpTo('/')">トップ</li>
        <li class="header-menu-elem" @click="jumpTo('/login')">ログイン</li>
        <li class="header-menu-elem" @click="jumpTo('/search')">検索</li>
        <li class="header-menu-elem">宣言する</li>
        <li class="header-menu-elem" @click="jumpTo('/mypage')">マイページ</li>
        <li class="header-menu-elem" >ポイント購入</li>
      </ul>
    </div>

  </div>
</template>

<script>
import searchBar from '~/components/ui/bar/searchBar.vue'

function scroll_control(event) {
  event.preventDefault();
}

export default {
  components: {
    searchBar
  },
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
  cursor: pointer;
}

.header-menu {
  background: #F27435;
  /* height: calc(100vh - 100px); */
  width: 100%;
  position: fixed;
  left: 0;
  top: 80px;
}

</style>