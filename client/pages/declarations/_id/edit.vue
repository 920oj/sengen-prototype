<template>
  <div class="edit">
    <div class="edit-wrapper">
      <h2>完了報告</h2>
      <Sengen 
        :tag="item.tag" 
        :name="item.name"
        :hasp="item.hasp"
        :thumbnail="item.thumbnail"
        :supporters="item.supporters" 
        :deadline="item.deadline" 
      />
      <h3>達成できましたか？</h3>
      <div class="edit-radio">
        <div>
          <input type="radio" name="achievement" value="achieved"><label for="achieved">達成できた！</label>
        </div>
        <div>
          <input type="radio" name="achievement" value="notachieved"><label for="notachieved">達成できなかった……</label>
        </div>
      </div>
      <h3>完了メッセージを書きましょう！</h3>
      <div class="edit-message">
        <textarea />
      </div>
      <div class="edit-btn-wrapper">
        <div class="edit-btn">送信</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sengen from '~/components/layouts/common/sengen.vue'

export default {
  components: {
    Sengen,
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
      status: 'notLogin', // 非ログイン: notLogin, 宣言者: declarator, 応援者: supporter, 非応援者: login
    }
  },

}
</script>

<style>

.edit-wrapper {
  width: 90%;
  margin: 30px auto;
  padding: 30px 10px;
  background: #FFF;
  max-width: 500px;
}

.edit-wrapper h2 {
  font-size: 2rem;
  text-align: center;
  padding: 30px 0;
}

.edit-wrapper h3 {
  font-size: 1.3rem;
  text-align: center;
  padding: 30px 0;
}

.edit-radio {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding-left: 30px;
  max-width: 500px;
}

.edit-radio input {
  margin: 10px 0;
}

.edit-radio label {
  margin-left: 15px;
}

.edit-message {
  display: flex;
  justify-content: center;
}

.edit-message textarea {
  width: 90%;
  margin: 0 auto;
  height: 500px;
}

.edit-btn {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 900;
  background: #F27435;
  color: #FFF;
  padding: 10px 15px;
  width: 6rem;
  margin: 30px auto;
  cursor: pointer;
}

.edit-btn:hover {
  background: #25B2E8;
  transition: background-color, 0.3s;
}
</style>