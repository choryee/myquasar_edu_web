<template>
  <div class="simpleInfoTitle">
    <p>{{data.name}}</p>
    <p>(지급 연차: {{ data.totalDayoff }}</p>
    <p>사용연차: {{ data.usedDayoff }}</p>
    <p>남은연차: {{ data.leftDayOff }})</p>
  </div>
</template>

<script>
export default {
  name: 'SimpleInfoTitle',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.simpleInfoTitle{
  display: flex;
  width: 90%;
  margin:auto;
}
.simpleInfoTitle p {
  font-size: 24px;
  font-weight: bold;
  padding: 5px;
}
</style>
