<template>
  <div class="exchange">
    <div class="exchange-wrapper">
      <div class="exchange-title">
        <h2>ポイント交換</h2>
        <p>ポイント残高: {{point}}pt</p>
      </div>
      <div class="exchange-form-wrapper">
        <p class="exchange-form-description">交換する額を入力</p>
        <div class="exchange-form">
          <input type="number" v-model="exchange_point">
          <p>pt</p>
        </div>
        <div class="exchange-btn" v-if="canExchange()" @click="exchange()">
          <p>交換</p>
        </div>
        <p v-if="!canExchange()" style="text-align: center;">
          交換可能な額を入力して下さい。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      'point': 0,
      'exchange_point': 0
    }
  },
  methods: {
    canExchange: function() {
      if (isNaN(this.exchange_point)) {
        return false
      }
      else if(this.point < this.exchange_point) {
        return false
      }
      else if (this.point == 0 || this.exchange_point == 0) {
        return false
      }
      else {
        return true
      }
    },
    exchange: function() {
      // ここにクリックしたときの動作
    }
  },
}
</script>

<style>

.exchange-wrapper {
  width: 90%;
  max-width: 500px;
  margin: 30px auto;
  background: #FFF;
  padding: 30px 15px;
  box-sizing: border-box;
}

.exchange-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 100px;
}

.exchange-title h2 {
  font-size: 1.5rem;
}

.exchange-btn {
  background: #F27435;
  color: #FFF;
  font-size: 1.3rem;
  width: 15rem;
  padding: 15px;
  margin: 30px auto;
  text-align: center;
  cursor: pointer;
}

.exchange-btn:hover {
  background: #25B2E8;
  transition: background-color, 0.3s;
}

.exchange-form-description {
  margin-bottom: 30px;
  margin: 30px 0;
}

.exchange-form-wrapper {
  margin: 50px 0;
  margin-bottom :150px;
}

.exchange-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
}

.exchange-form input {
  height: 3rem;
  width: 8rem;
  font-size: 1.5rem;

}

</style>