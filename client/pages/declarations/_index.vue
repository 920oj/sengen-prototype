<template>
  <div class="declarations">
    <div class="declarations-wrapper">
      <Sengen 
        :tag="item.tag" 
        :name="item.name"
        :hasp="item.hasp"
        :thumbnail="item.thumbnail"
        :supporters="item.supporters" 
        :deadline="item.deadline" 
        :index="item.index"
      />

      <div class="declarations-overview">
        <h2>概要</h2>
        <p>{{item.overview}}</p>
      </div>

      <div class="declarations-support-btn-wrapper" v-if="status == 'notLogin'">
        <p>応援するには……</p>
        <div class="declarations-support-btn" @click="$router.push('/login')">
          ログイン
        </div>
      </div>

      <div class="declarations-support-btn-wrapper" v-if="status == 'login'">
        <p>この宣言を応援する！</p>
        <textarea class="declarations-support-message" cols="30" rows="10" placeholder="応援メッセージをここに入力" v-model="comment"></textarea>
        <div class="declarations-support-btn" @click="supportIn()">
          応援！
        </div>
      </div>

      <div class="declarations-support-btn-wrapper" v-if="status == 'supporter'">
        <p style="color: #F27435; font-weight: 900; font-size: 1.3rem;">この宣言を応援しました！</p>
        <p>シェアして応援しよう！</p>
      </div>

      <div class="declarations-support-btn-wrapper" v-if="status == 'declarer'">
        <p>期限までに完了報告をしましょう！</p>
        <div class="declarations-support-btn">
          完了報告
        </div>
      </div>

      <div class="declarations-sns">
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>

      <div class="declarations-comment">
        <h2>応援コメント</h2>
        <div v-for="supporter_item in supporter_list" :key="supporter_item.id">
          <Comment 
            :name="supporter_item.name"
            :timestamp="supporter_item.timestamp"
            :comment="supporter_item.comment"
            :thumbnail="supporter_item.thumbnail"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'
import Comment from '~/components/layouts/declarations/comment.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import querystring from 'querystring'

export default {
  components: {
    Sengen,
    Comment,
  },
  data () {
    return {
      // 仮データ
      item: {
        tag: 'Web開発',
        name: '自分でWebサービスを立ち上げる！「実績解除」サービスを3月末までに作ります！',
        hasp: '5000',
        thumbnail: 'https://i.imgur.com/0OHpVwi.jpg',
        supporters: '380',
        deadline: '2020-03-27',
        overview: '今独学でWeb開発の勉強をしているのですが、作りたいWebサービスを思いつきました！自分が成し遂げたことを「実績解除」という形でSNSに共有できるWebサービスです！これを3月末までに作りたいと思います！',
        index: 99999,
      },
      comment: '',
      status: 'notLogin', // 非ログイン: notLogin, 宣言者: declarator, 応援者: supporter, 非応援者: login
      supporter_list: ''
    }
  },
  mounted () {
    setTimeout( () => {
      mapGetters('auth/login', ['isAuthenticated']);
      // console.log(this.isAuthenticated);
      this.judgeLogin();
    }, 0)
  },
  computed: {
    ...mapGetters('auth/login', ['isAuthenticated']),
  },
  methods: {
    judgeLogin: function() {
      if(this.isAuthenticated == true) {
        console.log('ログイン中です');
        // ここにログイン時の処理
        // if・その宣言をした人　→　user_data.declarations に this.$route.params.index がある　→　this.statusをdeclaratorに変更する
        let localUserData = JSON.parse(localStorage.vuex),
            userMail = localUserData.auth.login.user.email
        this.$axios
            .post(`/api/declarations/${this.$route.params.index}`,
              querystring.stringify({
              mail: userMail
            }))
            .then( result => {
              switch(result.data.status) {
                case 'declarer':
                  this.status = 'declarer'
                  console.log(result.data)
                  console.log(this.status)
                  break
                case 'supporter':
                  this.status = 'supporter'
                  console.log(result.data)
                  console.log(this.status)
                  break
                default:
                  this.status = 'login'
                  console.log(result.data)
                  console.log(this.status)
                  break
              }
              this.item = result.data
              this.supporter_list = result.data.supporters
              console.log(result.data.status)
            })
      } else {
        this.status = 'notLogin';
      }
        // else if・その宣言を応援している人　→　user_data.supports に this.$route.params.index がある　→　this.statusをsupporterに変更する
        // else・その宣言を応援していない人　→　上記以外　→　this.statusをloginに変更する
      
    },
    supportIn: function() {
      let localUserData = JSON.parse(localStorage.vuex),
          userMail = localUserData.auth.login.user.email
      console.log(this.comment)
      let path = this.$route.params.index

      this.$axios
          .$post(`/api/declarations/${path}/support`,
            querystring.stringify({
              comment: this.comment,
              mail: userMail
            }))
            .then(result => {
              console.log(result)
              console.log('result' + result.index);
              this.$router.go({path: this.$router.currentRoute.path, force: true})
              // this.$router.push(`${result.index}`)
            })
    }
  }
}
</script>

<style>

.declarations-wrapper {
  margin: 0 auto;
  max-width: 500px;
}
.declarations-overview {
  background-color: #FFF;
  width: 90%;
  margin: 0 auto;
  max-width: 500px;
  padding: 10px;
  padding-bottom: 30px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.declarations-overview h2 {
  padding: 10px 0;
}

.declarations-support-btn-wrapper {
  text-align: center;
  margin-bottom: 30px;
}

.declarations-support-btn-wrapper p {
  padding: 15px 0;
}

.declarations-support-message {
  width: 90%;
  margin: 0 auto;
  border: 1px solid #F9F9F9;
  resize: none;
  margin: 15px 0;
}

.declarations-support-btn {
  font-size: 1.3rem;
  font-weight: 900;
  background: #F27435;
  color: #FFF;
  padding: 10px 15px;
  width: 6rem;
  margin: 0 auto;
  cursor: pointer;
}

.declarations-support-btn:hover {
  background: #25B2E8;
  transition: background-color, 0.3s;
}

.declarations-sns {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.declarations-comment {
  background: #FFF;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  margin-bottom :30px;
}

.declarations-comment h2 {
  padding: 10px 0;
}
</style>