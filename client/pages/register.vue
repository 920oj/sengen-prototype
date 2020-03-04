<template>
  <div class="register">
    <div class="register-wrapper">
      <h2>新規登録</h2>
        <div class="register-form">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/user.svg" alt="ユーザー名" class="form-icon">
          </div>
          <div class="form-wrapper">
            <input type="text" name="username" class="form-style" v-model="username" placeholder="ユーザー名" required>
          </div>
        </div>
        <div class="register-form">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/envelope.svg" alt="メールアドレス" class="form-icon">
          </div>
          <div class="form-wrapper">
            <input type="mail" name="mail" class="form-style" v-model="mail" placeholder="メールアドレス" required>
          </div>
        </div>
        <div class="register-form">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/lock.svg" alt="パスワード" class="form-icon" style="width: 60%;">
          </div>
          <div class="form-wrapper">
            <input type="password" name="password" class="form-style" v-model="password" placeholder="パスワード" required>
          </div>
        </div>
        <div class="form-submit-btn" @click="submitRegister()">
          <btnWithIcon title="新規登録" icon="img/icon/sign-in-alt.svg" />
        </div>
    </div>    
  </div>
</template>

<script>

import btnWithIcon from '~/components/ui/btn/btnWithIcon.vue'

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
    submitRegister: function() {
      // ここにバリデーションの処理
      // ここにログインの処理
    }
  }
}
</script>

<style scoped>
.register-wrapper {
  background: #fff;
  margin: 100px 30px;
  padding: 50px 30px;
  max-width: 500px;
}

@media screen and (min-width: 650px) {
    .register-wrapper {
      margin: 100px auto;
    }
}

.register-wrapper h2 {
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 30px;
}

.register-form {
  display: flex;
  height: 100px;
  align-items: center;
  border-top: 2px solid #F8F8F8;
  border-bottom: 2px solid #F8F8F8;
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

.form-style {
  width: 100%;
  padding: 15px 0;
  font-size: 1rem;
  border: 0;
}

.form-submit-btn {
  margin-top: 30px;
}

</style>