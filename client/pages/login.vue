<template>
  <div class="login" v-if="isLoaded">
    <div class="login-wrapper">
      <h2>ログイン</h2>
        <div class="login-form">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/envelope.svg" alt="メールアドレス" class="form-icon">
          </div>
          <div class="form-wrapper">
            <input type="mail" name="mail" class="form-style" v-model="mail" placeholder="メールアドレス" required>
          </div>
        </div>
        <div class="login-form">
          <div class="form-icon-wrapper">
            <img src="~/assets/img/icon/lock.svg" alt="パスワード" class="form-icon" style="width: 60%;">
          </div>
          <div class="form-wrapper">
            <input type="password" name="password" class="form-style" v-model="password" placeholder="パスワード" required>
          </div>
        </div>
        <div class="form-submit-btn" @click="submitLogin()">
          <btnWithIcon title="ログイン" icon="img/icon/sign-in-alt.svg" />
        </div>
      <p class="login-attention" @click="$router.push('/register')">新規登録はこちら</p>
      <p class="login-attention">パスワードを忘れた方はこちら</p>
    </div>    
  </div>
</template>

<script>

import btnWithIcon from '~/components/ui/btn/btnWithIcon.vue'
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
    btnWithIcon,
  },
  data() {
    return {
      'isLoaded': false,
      'mail': '',
      'password': ''
    }
  },
  mounted() {
    console.log(this.isAuthenticated);
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Firebase認証の変更を検知しました')
      console.log(this.getUser())
      const { uid, email, displayName } = user
      this.getUser({ uid, email, displayName })
    })
    mapGetters('auth/login', ['isAuthenticated'])
    setTimeout( () => {
      console.log('mountedの方での処理をします')
      this.judgeLogin();
    }, 0)
  },
  computed: {
    ...mapState('auth/login', ['user']),
    ...mapGetters('auth/login', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth/login', ['getUser']),
    submitLogin: function() {
      firebase.auth().signInWithEmailAndPassword(this.mail, this.password)
        .then(user => {
          this.$router.push("/")
        }).catch((error) => {
            console.log(error);
        });
    },
    judgeLogin: function() {
      if(this.isAuthenticated) {
        console.log(this.isAuthenticated + '1')
        console.log('トップページにリダイレクトします')
        this.$router.push("/")
      }
      else {
        console.log(this.isAuthenticated + '2')
        this.isLoaded = true;
      }
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


.login-form {
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

.login-attention {
  cursor: pointer;
  margin: 30px 0;
  text-align: center;
}
</style>