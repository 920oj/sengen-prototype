<template>
  <div class="login">
    <div class="login-wrapper">
      <h2>ログイン</h2>
        <div class="login-mail">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/envelope.svg" alt="メールアドレス" class="form-icon">
          </div>
          <div class="form-wrapper">
            <input type="mail" name="mail" id="form-mail" v-model="mail" placeholder="メールアドレス" required>
          </div>
        </div>
        <div class="login-password">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/lock.svg" alt="パスワード" class="form-icon" style="width: 60%;">
          </div>
          <div class="form-wrapper">
            <input type="password" name="password" id="form-password" v-model="password" placeholder="パスワード" required>
          </div>
        </div>
        <div class="form-submit-btn" @click="submitLogin()">
          <btnWithIcon title="ログイン" icon="img/icon/sign-in-alt.svg" />
        </div>
      <p class="login-forgot-password">パスワードを忘れた方はこちら</p>
    </div>    
  </div>
</template>

<script>

import btnWithIcon from '~/components/ui/btn/btnWithIcon.vue';

export default {
  components: {
    btnWithIcon,
  },
  data() {
    return {
      'mail': '',
      'password': ''
    }
  },
  methods: {
    submitLogin: function() {
      //ここにバリデーションの処理を書く
      // ここにログインのAPIのを叩く処理を書く
    }
  }
}
</script>

<style>
.login-wrapper {
  background: #fff;
  margin: 100px 30px;
  padding: 50px 30px;
  max-width: 500px;
}

@media screen and (min-width: 650px) {
    .login-wrapper {
      margin: 100px auto;
    }
}

.login-wrapper h2 {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 30px;
}

.login-mail {
  display: flex;
  height: 100px;
  align-items: center;
  border-top: 2px solid #F8F8F8;
  border-bottom: 2px solid #F8F8F8;
}

.login-password {
  display: flex;
  height: 100px;
  align-items: center;
  border-bottom: 2px solid #F8F8F8;
  margin-bottom: 30px;
}

.form-icon-wrapper {
  flex: 1;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-wrapper {
  flex: 5;
}

.form-icon {
  width: 70%;
  max-width: 42px;
}

#form-mail {
  width: 100%;
  padding: 15px 0;
  font-size: 1rem;
  border: 0;
}

#form-password {
  width: 100%;
  padding: 15px 0;
  font-size: 1rem;
  border: 0;
}

.login-forgot-password {
  margin-top: 30px;
  text-align: center;
}
</style>