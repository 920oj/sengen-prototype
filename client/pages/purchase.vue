<template>
  <div class="purchase">
    <div class="purchase-wrapper">
      <div class="purchase-title">
        <h2>ポイント購入</h2>
        <p>ポイント残高: 0 pt</p>
      </div>
      <div class="purchase-btn-wrapper">
        <div class="purchase-btn">
          <p>1,000pt (1,200円)</p>
        </div>
        <div class="purchase-btn">
          <p>5,000pt (5,500円）</p>
        </div>
        <div class="purchase-btn">
          <p>10,000pt (10,100円)</p>
        </div>
      </div>
      <div class="purchase-attention">
        <p>※クレジットカード決済・コンビニ決済・銀行振込がご利用いただけます。</p>
        <p>※プロトタイプバージョンでは、実際の決済は行われず、無料でポイント残高に反映されます。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.purchase-wrapper {
  width: 90%;
  max-width: 500px;
  margin: 30px auto;
  background: #FFF;
  padding: 30px 15px;
  box-sizing: border-box;
}

.purchase-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 30px;
}

.purchase-title h2 {
  font-size: 1.5rem;
}

.purchase-btn-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.purchase-btn {
  background: #F27435;
  color: #FFF;
  font-size: 1.3rem;
  width: 15rem;
  padding: 15px;
  margin: 30px auto;
  text-align: center;
  cursor: pointer;
}

.purchase-btn:hover {
  background: #25B2E8;
  transition: background-color, 0.3s;
}

.purchase-attention {
  line-height: 1.6;
}

.purchase-attention p {
  margin-bottom: 15px;
  color: #A1A1A1;
}
</style>