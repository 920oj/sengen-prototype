<template>
  <div class="declaration">
    <div class="declaration-wrapper">
      <div class="declaration-create">
        <h2>新規宣言作成</h2>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>タイトル <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <input type="text" class="text-form">
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>カテゴリー <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <input type="text" class="text-form">
            <!-- 選ぶやつに変更する -->
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <div class="declaration-label">
            <p>概要 <span class="required-ast">&lowast;</span> </p>
          </div>
          <div class="declaration-form">
            <textarea class="textarea-form"></textarea>
          </div>
        </div>

        <div class="declaration-form-wrapper" style="flex-direction: column;">
          <p>画像アップロード <span class="required-ast">&lowast;</span></p>
          <div class="img-uploader-img"></div>
          <div class="img-upload-btn">
            <p>アップロード</p>
          </div>
        </div>

        <div class="declaration-form-wrapper">
          <p>期間 <span class="required-ast">&lowast;</span></p>
          <!-- ここにdate-pickerのライブラリをいれる -->
        </div>

        <div class="declaration-form-wrapper" id="point-form">
          <p style="text-align: left;">ポイント <span class="required-ast">&lowast;</span></p>
          <p class="current-point">0000 pt</p>
          <div class="point-btn-wrapper">
            <div class="point-btn">
              <p>リセット</p>
            </div>
            <div class="point-btn">
              <p>+1000</p>
            </div>
            <div class="point-btn">
              <p>+5000</p>
            </div>
            <div class="point-btn">
              <p>+10000</p>
            </div>
          </div>
        </div>
      </div>
      <div class="declaration-confirm">

      </div>
    </div>
  </div>
</template>

<script>
export default {

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
</style>