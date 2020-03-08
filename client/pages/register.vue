<template>
  <div class="register" v-if="isLoaded">
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
        <div class="login-error" v-if="error_message">
          <p>{{ error_message }}</p>
        </div>
        <div class="form-submit-btn" @click="submitRegister()">
          <btnWithIcon title="新規登録" icon="img/icon/sign-in-alt.svg" />
        </div>
    </div>    
  </div>
</template>

<script>

import btnWithIcon from '~/components/ui/btn/btnWithIcon.vue'
import firebase from '~/plugins/firebase.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import querystring from 'querystring'

export default {
  components: {
    btnWithIcon,
  },
  data() {
    return {
      'isLoaded': false,
      'username': '',
      'mail': '',
      'password': '',
      'uid': '',
      'error_message': ''
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
        const { uid, email, displayName } = user
        this.getUser({ uid, email, displayName })
    })
    setTimeout( () => { // localStorageからVuexストアに値が返ってきたら
      mapGetters('auth/login', ['isAuthenticated']); // mapGettersでthis.isAuthenticatedに判定結果を入れて
      this.judgeLogin(); // リダイレクト判定処理を行う
    }, 0)
  },
  computed: {
    ...mapState('auth/login', ['user']),
    ...mapGetters('auth/login', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth/login', ['getUser']),
    submitRegister: async function() {
      await this.firebaseCreate()
      await this.userCreate()
    },
    firebaseCreate: function() {
      firebase.auth().createUserWithEmailAndPassword(this.mail, this.password)
        .then((user) => {
        })
        .catch(error => {
          console.log(error)
          switch(error.code){
            case 'auth / email-already-in-use':
              this.error_message = 'このメールアドレスは既に登録済みです。別のメールアドレスを入力してください。'
              break
            case 'auth / invalid-email':
              this.error_message = '有効なメールアドレスではありません。有効なメールアドレスを入力してください。'
              break
            case 'auth / operation-not-allowed':
              this.error_message = 'このアカウントは無効化されています。お問い合わせ下さい。'
              break
            case 'auth / weak-password':
              this.error_message = 'パスワード強度が十分ではありません。6文字以上のパスワードを入力してください。'
              break
          }
        })
    },
    userCreate: function() {
      this.$axios.$post('/api/users', 
        querystring.stringify({
          username: this.username,
          mail: this.mail,
        }))
        .then(result => {
          this.$router.push("/")
        })
    },
    judgeLogin: function() {
      if(this.isAuthenticated) {
        this.$router.push("/")
      }
      else {
        this.isLoaded = true;
      }
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

.login-error {
  margin: 15px 0;
  color: #F27435;
}

</style>