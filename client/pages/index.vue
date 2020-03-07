<template>
  <div class="index">
    <Header />
    <div class="sengen-list">
      <h2 class="sengen-list-title" @click="$router.push('/login')">現在遂行中の宣言</h2>
      <!-- <Sengen category="Web開発" title="自分でWebサービスを立ち上げる！実績解除サービスを3月末までに作ります！" point="5000" supporter="15" expires="30" /> -->
      <Sengenarea :list="sengen_list" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/layouts/index/topHeader.vue'
import Sengenarea from '~/components/layouts/index/topSengen.vue'

export default {
  layout: 'onlyFooter',
  components: {
    Header,
    Sengenarea,
  },
  async asyncData({ $axios }) {
    let sengen_list = await $axios.$get('/api/declarations/top')
    return {
      sengen_list
    }
  },
  computed: {

  }
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
