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
      />

      <div class="declarations-overview">
        <h2>概要</h2>
        <p>{{item.overview}}</p>
      </div>

      <div class="declarations-support-btn-wrapper">
        <p>応援するには……</p>
        <div class="declarations-support-btn" @click="$router.push('/login')">
          ログイン
        </div>
      </div>

      <div class="declarations-sns">
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>

      <div class="declarations-comment">
        <h2>応援コメント</h2>
        <Comment />
        <Comment />
        <Comment />
      </div>

    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'
import Comment from '~/components/layouts/declarations/comment.vue'

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
        overview: '今独学でWeb開発の勉強をしているのですが、作りたいWebサービスを思いつきました！自分が成し遂げたことを「実績解除」という形でSNSに共有できるWebサービスです！これを3月末までに作りたいと思います！'
      },

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