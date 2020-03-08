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
            <input v-show="checkBefore" type="text" name="title" class="text-form" v-model="title">
            <p v-show="!checkBefore">{{ title }}</p>
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>カテゴリー <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <!-- <input v-show="checkBefore" type="text" name="category" class="text-form" v-model="category"> -->
            <select v-show="checkBefore" v-model="category" class="declaration-category">
              <option value="0">アート</option>
              <option value="1">プロダクト</option>
              <option value="2">テクノロジー</option>
              <option value="3">音楽</option>
              <option value="4">ゲーム</option>
              <option value="5">書籍</option>
              <option value="6">映像</option>
              <option value="7">スポーツ</option>
              <option value="8">ビジネス</option>
              <option value="9">ファッション</option>
              <option value="10">アニメ</option>
              <option value="11">飲食</option>
              <option value="12">ヘルスケア</option>
              <option value="13">その他</option>
            </select>
            <p v-show="!checkBefore">{{ category_list[category] }}</p>
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>概要 <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <textarea v-show="checkBefore" name="overview" class="textarea-form" v-model="overview"></textarea>
            <p v-show="!checkBefore">{{ overview }}</p>
          </div>
        </div>

        <div class="declaration-form-wrapper" style="flex-direction: column;">
          <p>画像アップロード <span class="required-ast">&lowast;</span></p>
          <img src="" class="img-uploader-img" id="img" />
          <!-- <div class="img-upload-btn"> -->
            <input v-show="checkBefore" @change="uploadThumbnail()" type="file" name="file" id="file"/>
          <!-- </div> -->
        </div>

        <div class="declaration-form-wrapper" id="date-form">
          <p>終了日 <span class="required-ast">&lowast;</span></p>
          <client-only>
            <date-picker class="datepicker-wrapper" v-show="checkBefore"
              :disabled-dates="dpDisabledDates"
              :language="dpLocale"
              :format="dpFormat"
              placeholder="日付を選択"
              v-model="deadline"
            />
          </client-only>
          <p style="text-align: center; margin: 30px 0;" v-show="!checkBefore">{{ displayDate() }}</p>
          <input class="hiddenForm" type="text" name="deadline" :value="deadline" />
        </div>

        <div class="declaration-form-wrapper" id="point-form">
          <p style="text-align: left;">ポイント <span class="required-ast">&lowast;</span></p>
          <p class="current-point">{{ hasp }} pt</p>
          <input type="text" name="point" class="hiddenForm" v-model="hasp" />
          <div class="point-btn-wrapper" v-show="checkBefore">
            <div class="point-btn" @click="resetPoint()">
              <p>リセット</p>
            </div>
            <div class="point-btn" @click="increasePoint(1000)">
              <p>+1000</p>
            </div>
            <div class="point-btn" @click="increasePoint(5000)">
              <p>+5000</p>
            </div>
            <div class="point-btn" @click="increasePoint(10000)">
              <p>+10000</p>
            </div>
          </div>
        </div>
        <div class="confirm-btn" @click="checkForm()" v-show="checkBefore">
          <btnOnlyTitle title="確認"/>
        </div>
        <p style="color: #F27435; padding-bottom: 30px; text-align: center;" v-if="formError">入力内容に誤りがあります。</p>
        <div class="confirm-comment" v-show="!checkBefore">
          <p>以上の内容でよろしいですか？</p>
        </div>
        <div class="confirm-btn" @click="postForm()" v-show="!checkBefore">
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
import querystring from 'querystring'
import moment from 'moment';
import 'moment-range';
import 'moment-timezone';
moment.tz.setDefault('Asia/Tokyo')
moment.locale('ja')

export default {
  components: {
    btnOnlyTitle,
  },
  data() {
    return {
      dpDisabledDates: {
        to: new Date(),
      },
      dpFormat: 'yyyy/M/d(D)',
      dpLocale: ja,
      title: '',
      category: '',
      overview: '',
      deadline: '',
      postDeadLine: '',
      hasp: 0,
      checkBefore: true,
      formError: false,
      imgData: '',
      image: '',
      imgName: '',
      uploadFile: '',
      category_list: [
        'アート',
        'プロダクト',
        'テクノロジー',
        '音楽',
        'ゲーム',
        '書籍',
        '映像',
        'スポーツ',
        'ビジネス',
        'ファッション',
        'アニメ',
        '飲食',
        'ヘルスケア',
        'その他'
      ],
    }
  },
  methods: {
    uploadThumbnail: function() {
      let preview = document.querySelector('#img')
      let file = document.querySelector('input[type=file]').files[0]
      let render = new FileReader()
      render.addEventListener("load", function() {
        preview.src = render.result
      }, false)
      if(file) {
        render.readAsDataURL(file)
      }
      this.$axios
          .$post('/api/upload')
          .then(result => {
            console.log(result)
          })
    },
    resetPoint: function() {
      this.hasp = 0
    },
    increasePoint: function(p) {
      this.hasp += p
    },
    displayDate: function() {
      return moment(this.deadline).format('YYYY年MM月DD日(ddd)');
    },
    checkForm: function() {
      if(this.title == '' || this.category == '' || this.overview == '' || this.deadline == '' || this.hasp == 0) {
        this.formError = true
      }
      else {
        this.postDeadLine = this.dateToString(this.deadline)
        this.formError = false
        this.checkBefore = false
        this.scrollTop()
      }
    },
    scrollTop: function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    postForm: function(e) {
      let params = new FormData(),
          localUserData = JSON.parse(localStorage.vuex),
          userMail = localUserData.auth.login.user.email
      console.log(file)
      this.$axios.$post('/api/declarations', 
          querystring.stringify({
          title: this.title,
          category: this.category,
          overview: this.overview,
          hasp: this.hasp,
          mail: userMail,
          deadline: this.postDeadLine,
          // thumbnail: file
        }))
        .then(result => {
          console.log('OK')
          this.$router.push('/')
        })
    },
    dateToString: function(date) {
      let year_str = date.getFullYear(),
          month_str = 1 + date.getMonth(),
          day_str = date.getDate(),
          hour_str = date.getHours(),
          minute_str = date.getMinutes(),
          second_str = date.getSeconds()
 
      month_str = ('0' + month_str).slice(-2);
      day_str = ('0' + day_str).slice(-2);
      hour_str = ('0' + hour_str).slice(-2);
      minute_str = ('0' + minute_str).slice(-2);
      second_str = ('0' + second_str).slice(-2);
      
      let format_str = 'YYYY-MM-DD hh:mm:ss';
      format_str = format_str.replace(/YYYY/g, year_str);
      format_str = format_str.replace(/MM/g, month_str);
      format_str = format_str.replace(/DD/g, day_str);
      format_str = format_str.replace(/hh/g, hour_str);
      format_str = format_str.replace(/mm/g, minute_str);
      format_str = format_str.replace(/ss/g, second_str);
      
      return format_str;
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

.declaration-category {
  width: 100%;
  height: 2rem;
  border: 1px solid #F8F8F8;
  font-family: 'Roboto', 'Noto Sans JP';
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
  background-size: cover;
  background-position: center center;
  /* padding-top: 56.25%; */
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
  z-index: 0.5;
}

.img-upload-btn > input {
  /* display: none; */
  height: 100%;
  width: 100%;
  z-index: 0.2;
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

.menu {
  position: relative;
  width: 100%;
  height: 2rem;
  max-width: 10rem;
  margin: 0 auto;
}

.menu:before,
.menu:after {
    content: " ";
    display: table;
}

.menu li {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  background: rgb(29, 33, 19);
}

.menu > li p {
    /* display: block; */
    color: #fff;
}

li.menu-single {
  list-style: none;
}

li.menu-single {
  position: relative;
}

ul.menu-dropdown {
  list-style: none;
  visibility: hidden;
  opacity: 0;
}

li.menu-single ul.menu-dropdown{
  position: absolute;
  top: 50px;
  width: 100%;
  background-color:#FFFFFF;
  transition: all .2s ease;
}

li.menu-single:active ul.menu-dropdown {
  top: 50px;
  visibility: visible;
  opacity: 1;
}

.hiddenForm {
  display: none;
}

</style>