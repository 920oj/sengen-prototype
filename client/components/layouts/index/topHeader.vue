<template>
  <div class="top-header-container">

    <div class="top-header">
      <div class="top-header-left">
        <img src="~/assets/img/sengen-logo.svg" alt="Sengen.jp" class="top-header-logo">
      </div>
      <div class="top-header-right">
        <div v-if="isAuthenticated" @click="$router.push('/mypage')">
          <btnOnlyTitle title="マイページ" />
        </div>
        <div v-if="!isAuthenticated" @click="$router.push('/login')">
          <btnOnlyTitle title="ログイン" />
        </div>
      </div>
    </div>

    <div class="top-header-catch">
      <h2>あなたの目標を宣言しよう。</h2>
      <p>sengen.jpは、世界初の「逆クラウドファンディング」サイトです。宣言者は、自分の宣言ポイントを掛けて遂行したいプロジェクトを宣言し、応援者を募ります。もし宣言者がプロジェクトを完遂することができなかったら、応援者に宣言ポイントが分配されることになります。ポイントを掛けるという緊張感をもつと同時に、自分のプロジェクトをよりたくさんの人に知ってもらえるsengen.jp。あなたも宣言！してみませんか？</p>
      <div class="top-header-btn" @click="$router.push('/register')" v-if="!isAuthenticated">
        <btnWithIcon title="新規登録" icon="img/icon/user-plus.svg" />
      </div>
      <div class="top-header-btn" @click="$router.push('/declaration')" v-if="isAuthenticated">
        <btnWithIcon title="宣言する！" icon="img/icon/user-plus.svg" />
      </div>
    </div>

  </div>
</template>

<script>
import btnWithIcon from '~/components/ui/btn/btnWithIcon.vue'
import btnOnlyTitle from '~/components/ui/btn/btnOnlyTitle.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    btnWithIcon,
    btnOnlyTitle,
  },
  computed: {
    ...mapGetters('auth/login', ['isAuthenticated'])
  }
}
</script>

<style scoped>

.top-header-container {
  width: 100%;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  padding: 0 30px;

  color: #fff;
  background: #F27435;
}

.top-header-logo {
  height: 30px;
  width: auto;
}

.top-header-catch {
  background: #F27435;
  color: #fff;
  padding: 0 30px;
}

.top-header-catch h2 {
  padding: 30px 0;
  font-size: 1.4rem;
  text-align: center;
}

.top-header-catch p {
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 30px;
}

.top-header-btn {
  padding-bottom: 30px;
}

.top-header-catch:after {
  content: "";
  position: absolute;
  height: 40px;
  left: calc(50% - 30px);
  border-style: solid;
  border-color: #F27435 transparent transparent transparent;
  border-width: 30px 30px 0 30px;
  z-index:1;
}

</style>