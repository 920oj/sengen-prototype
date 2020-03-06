<template>
  <div class="declaration">
    <div class="declaration-wrapper">
      <div class="declaration-create">
        <h2 v-if="checkBefore">新規宣言作成</h2>
        <h2 v-else>新規宣言作成</h2>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>タイトル <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <input v-if="checkBefore" type="text" class="text-form" v-model="title">
            <p v-else>{{ title }}</p>
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>カテゴリー <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <input v-if="checkBefore" type="text" class="text-form" v-model="category">
            <p v-else>{{ category }}</p>
            <!-- 選ぶやつに変更する -->
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>概要 <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <textarea v-if="checkBefore" class="textarea-form" v-model="overview"></textarea>
            <p v-else>{{ overview }}</p>
          </div>
        </div>

        <div class="declaration-form-wrapper" style="flex-direction: column;">
          <p>画像アップロード <span class="required-ast">&lowast;</span></p>
          <div class="img-uploader-img"></div>
          <div v-if="checkBefore" class="img-upload-btn" @click="uploadThumbnail()">
            <p>アップロード</p>
          </div>
        </div>

        <div class="declaration-form-wrapper" id="date-form">
          <p>終了日 <span class="required-ast">&lowast;</span></p>
          <client-only v-if="checkBefore">
            <date-picker class="datepicker-wrapper" 
              :language="dpLocale"
              :format="dpFormat"
              placeholder="日付を選択"
              v-model="deadline"
            />
          </client-only>
          <p v-else>{{ deadline }}</p>
        </div>

        <div class="declaration-form-wrapper" id="point-form">
          <p style="text-align: left;">ポイント <span class="required-ast">&lowast;</span></p>
          <p class="current-point">{{ hasp }} pt</p>
          <div class="point-btn-wrapper" v-if="checkBefore">
            <div class="point-btn" @click="resetPoint()">
              <p>リセット</p>
            </div>
            <div class="point-btn" @click="countPoint1000()">
              <p>+1000</p>
            </div>
            <div class="point-btn" @click="countPoint5000()">
              <p>+5000</p>
            </div>
            <div class="point-btn" @click="countPoint10000()">
              <p>+10000</p>
            </div>
          </div>
        </div>
        <div class="confirm-btn" @click="checkForm()" v-if="checkBefore">
          <btnOnlyTitle title="確認"/>
        </div>
        <div class="confirm-comment" v-if="!checkBefore">
          <p>以上の内容でよろしいですか？</p>
        </div>
        <div class="confirm-btn" @click="postForm()" v-if="!checkBefore">
          <btnOnlyTitle title="宣言！"/>
        </div>
      </div>
      <div class="declaration-confirm">
      </div>
    </div>
  </div>
</template>

<script>
import {ja} from 'vuejs-datepicker/dist/locale'
import btnOnlyTitle from '~/components/ui/btn/btnOnlyTitle.vue'

export default {
  components: {
    btnOnlyTitle,
  },
  data() {
    return {
      dpFormat: 'yyyy/M/d(D)',
      dpLocale: ja,
      title: '',
      category: '',
      overview: '',
      deadline: '',
      hasp: 0,
      checkBefore: true
    }
  },
  methods: {
    uploadThumbnail: function() {

    },
    resetPoint: function() {
      this.hasp = 0
    },
    countPoint1000: function() {
      this.hasp += 1000
    },
    countPoint5000: function() {
      this.hasp += 5000
    },
    countPoint10000: function() {
      this.hasp += 10000
    },
    checkForm: function() {
      console.log(this.title)
      console.log(this.category)
      console.log(this.overview)
      console.log(this.deadline)
      console.log(this.hasp)
      this.checkBefore = false
    }
  }
}
</script>

<style>
.declaration-wrapper {
  background: #FFF;
  width: 95%;
  max-width: 500px;
  margin: 30px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.declaration-create h2 {
  font-size: 1.4rem;
  text-align: center;
  padding: 30px 0;
}

.declaration-form-wrapper {
  display: flex;
  margin: 30px 0;
}

.declaration-label {
  flex: 1;
  text-align: left;
}

.declaration-form {
  flex: 3;
}

.text-form {
  width: 100%;
  height: 2rem;
  border: 1px solid #F8F8F8;
  font-family: 'Roboto', 'Noto Sans JP';
}

.textarea-form {
  width: 100%;
  border: 1px solid #F8F8F8;
  font-family: 'Roboto', 'Noto Sans JP';
  resize: none;
  height: 10rem;
}

.required-ast {
  color: #F27435;
  font-weight: 900;
}

#point-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#point-form p {
  text-align: center;
}

.img-uploader-img {
  background-image: url('~assets/img/png/ogp.png');
  background-size: cover;
  background-position: center center;
  padding-top: 56.25%;
  width: 100%;
  margin: 30px 0;
}

.img-upload-btn {
  display: inline-block;
  background: #232531;
  color: #FFF;
  width: 6em;
  padding: 10px 15px;
  margin: 0 auto;
  cursor: pointer;
}

.img-upload-btn:hover {
  background: #25B2E8;
  transition: background-color, 0.3s;
}

.current-point {
  margin: 30px 0;
  font-size: 2.3rem;
  color: #F27435;
  font-weight: 900;
}

.point-btn-wrapper {
  display: flex;
  justify-content: center;
}

.point-btn {
  background: #232531;
  color: #FFF;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
}

.point-btn:hover {
  background: #25B2E8;
  transition: background-color, 0.3s;
}

#date-form {
  flex-direction: column;
}

.datepicker-wrapper div > input{
  margin: 30px 0;
  width: 100%;
  height: 2rem;
  border: 1px solid #F8F8F8;
  font-family: 'Roboto', 'Noto Sans JP';
  font-size: 1.3rem;
  text-align: center;
}

.confirm-btn {
  display: flex;
  justify-content: center;
  padding: 30px 0;
  cursor: pointer;
}

.confirm-comment {
  width: 100%;
  text-align: center;
}

</style>