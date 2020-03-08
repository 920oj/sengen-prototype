<template>
  <div class="mypage">
    <div class="mypage-wrapper">
      <div class="mypage-user">
        <img src="https://i.imgur.com/4iwPsRe.png" alt="ユーザー画像" class="mypage-user-img">
        <p class="mypage-username">{{ username }}</p>
      </div>
      <div class="mypage-settings">
        <h3>設定</h3>
        <ul>
          <li>プロフィール変更</li>
          <li>ポイント購入</li>
          <li>ポイント交換</li>
        </ul>
      </div>
      <div class="mypage-declaration" v-for="declaration_item in declaration_list" :key="declaration_item.key">
        <h3>自分の宣言</h3>
        <Sengen 
          :tag="declaration_item.tag" 
          :name="declaration_item.name"
          :hasp="declaration_item.hasp"
          :thumbnail="declaration_item.thumbnail"
          :supporters="declaration_item.supporters" 
          :deadline="declaration_item.deadline" 
          :index="declaration_item.index"
        />
      </div>
      <div class="mypage-declaration" v-for="support_item in support_list" :key="support_item.key">
        <h3>応援している宣言</h3>
        <Sengen 
          :tag="support_item.tag" 
          :name="support_item.name"
          :hasp="support_item.hasp"
          :thumbnail="support_item.thumbnail"
          :supporters="support_item.supporters" 
          :deadline="support_item.deadline" 
          :index="support_item.index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'
import querystring from 'querystring'

export default {
  components: {
    Sengen,
  },
  mounted() {
    let localUserData = JSON.parse(localStorage.vuex),
        userMail = localUserData.auth.login.user.email
      this.$axios
          .$post(`/api/user`,
            querystring.stringify({
            mail: userMail
          }))
          .then(result => {
            this.username = result.name
            this.declaration_list = result.declarations
            this.support_list = result.supports
            console.log(result)
            console.log(this.declaration_list)
          })
    console.log(userMail)
  },
  data () {
    return {
      // 仮データ
      declaration_item: {
        tag: 'Web開発',
        name: 'これは自分が宣言している方の宣言です！',
        hasp: '5000',
        thumbnail: 'https://i.imgur.com/0OHpVwi.jpg',
        supporters: '380',
        deadline: '2020-03-27',
        overview: '今独学でWeb開発の勉強をしているのですが、作りたいWebサービスを思いつきました！自分が成し遂げたことを「実績解除」という形でSNSに共有できるWebサービスです！これを3月末までに作りたいと思います！'
      },
      declaration_list: [],
      support_item: {
        tag: 'Web開発',
        name: 'これは応援している方の宣言です！',
        hasp: '5000',
        thumbnail: 'https://i.imgur.com/0OHpVwi.jpg',
        supporters: '380',
        deadline: '2020-03-27',
        overview: '今独学でWeb開発の勉強をしているのですが、作りたいWebサービスを思いつきました！自分が成し遂げたことを「実績解除」という形でSNSに共有できるWebサービスです！これを3月末までに作りたいと思います！'
      },
      username: ''
    }
  },
}
</script>

<style>

h3 {
  margin-bottom: 15px;
  color: #F27435;
}

.mypage-wrapper {
  width: 90%;
  max-width: 500px;
  margin: 30px auto;
}

.mypage-user {
  text-align: center;
}

.mypage-user-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border: 1px solid #A3A3A3;
  margin: 30px 0;
}

.mypage-username {
  font-weight: 900;
  font-size: 1.3rem;
}

.mypage-settings {
  background: #FFF;
  margin: 30px 0;
  padding: 15px 10px;
  padding-bottom: 0;
}

.mypage-settings ul {
  list-style: none;
}

.mypage-settings li {
  padding: 30px 0;
  font-size: 1.3rem;
  border-top: 1px solid #F9F9F9;
}

.mypage-declaration {
  background: #FFF;
  margin: 30px 0;
  padding: 15px 10px;
  padding-bottom: 0;
}

</style>