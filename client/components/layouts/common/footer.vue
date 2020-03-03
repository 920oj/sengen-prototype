<template>
  <div class="footer">
    <div class="footer-sengen">
      <img src="~assets/img/sengen-logo.svg" alt="Sengen.jp" class="footer-logo" />
    </div>
    <div class="footer-menu">
      <ul class="footer-container-left">
        <li>sengen.jpとは</li>
        <li>お問い合わせ</li>
        <li>会社概要</li>
      </ul>
      <ul class="footer-container-right">
        <li>プライバシーポリシー</li>
        <li>特定商取引に関する法律に基づく表示</li>
        <li>利用規約</li>
      </ul>
    </div>
    <div class="copy-right">
        <p>Copyright &copy; 2020 sengen.jp All Right Reserved.</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #232531;
  padding: 25px;
  color: white;
}
.footer-logo {
  height: 30px;
  width: auto;
}
.footer-sengen {
  width: 100%;
  padding-bottom: 15px;
}
ul {
  list-style: none;
}
li{
    padding-bottom: 25px;
}
.footer-about,
.footer-contact,
.footer-overview {
  padding-bottom: 25px;
}
.footer-privacy,
.footer-transaction,
.footer-terms {
  padding-bottom: 25px;
}
.footer-menu{
    display:flex;
}
.footer-container-left {
  padding: 15px 0 15px 0;
  font-size: 1rem;
}
.footer-container-right {
  padding: 15px 0 15px 30px;
  font-size: 1rem;
}
.copy-right{
    text-align: center;
    font-size: 0.8rem;
}
</style>