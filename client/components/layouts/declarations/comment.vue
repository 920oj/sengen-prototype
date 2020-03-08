<template>
  <div class="comment">
    <div class="comment-wrapper">
      <div class="comment-img" :style="`background-image: url(${thumbnail})`"></div>
      <div class="comment-text">
        <div class="comment-title">
          <p>{{ name }}</p>
          <p>{{ diffTimeStamp() }}</p>
        </div>
        <div class="comment-body">
          <p>{{ comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment-range';
import 'moment-timezone';
moment.tz.setDefault('Asia/Tokyo')
moment.locale('ja')

export default {
  props: [
    'name',
    'timestamp',
    'comment',
    'thumbnail'
  ],
  methods: {
    diffTimeStamp: function() {
      return moment(this.timestamp).format('MMMDo');
    }
  }
}
</script>

<style>

.comment {
  margin: 10px 0;
}

.comment-wrapper {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}

.comment-img {
  flex: 1;
  /* background-image: url('~assets/img/png/ogp.png'); */
  background-size: cover;
  background-position: center center;
  padding-top: 25%;
  box-sizing: border-box;
}

.comment-text {
  flex: 3;
  box-sizing: border-box;
  width: 30%;
  margin-left: 10px;
}

.comment-title {
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
}

.comment-body {
  margin-top: 10px;
}

</style>