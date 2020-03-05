<template>
  <div class="index">
    <Header />
    <div class="sengen-list">
      <h2 class="sengen-list-title">現在遂行中の宣言</h2>
      <Sengen category="Web開発" title="自分でWebサービスを立ち上げる！実績解除サービスを3月末までに作ります！" point="5000" supporter="15" expires="30" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/layouts/index/topHeader.vue'
import Sengen from '~/components/layouts/common/sengen.vue'

export default {
  layout: 'onlyFooter',
  components: {
    Header,
    Sengen,
  },
}
</script>

<style>
.sengen-list {
  margin-top: 50px;
}

.sengen-list-title {
  font-size: 1.5rem;
  text-align: center;
}
</style>
