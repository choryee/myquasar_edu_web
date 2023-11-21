<template>
  <div class="yearsContainer">
    <div v-for="year in years" :key="year" class="yearItem">
      <label :for="`year-${year}`">{{ yearLabel(year) }}</label>
      <input :id="`year-${year}`" :disabled="!isEditable" v-model="default_dayoff[year]" />
    </div>
    <button @click="toggleEdit">{{ isEditable ? '수정 완료' : '수정하기' }}</button>
    <button v-if="isEditable" @click="cancelEdit">수정 취소</button>
  </div>
</template>

<script>
import network from '@/network';

export default {
  data() {
    return {
      years: [],
      default_dayoff: {},
      isEditable: false,
      originalValues: {} // 추가: 이전 값을 저장할 변수
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const res = await network.dayoff.getDayoffDefault();
        this.default_dayoff = res.result.reduce((acc, item) => {
          acc[item.year] = item.defaultDayoff;
          return acc;
        }, {});
        this.years = res.result.map(item => item.year);
      } catch (error) {
        console.error(error);
      }
    },
    async saveEdits() {
      const params = this.years.map(year => ({
        year: year,
        defaultDayoff: this.default_dayoff[year]
      }));
      const header = {};
      try {
        await network.dayoff.updateDayoffSetting(params, header);
        this.isEditable = false;
      } catch (error) {
        console.error(error);
      }
    },
    yearLabel(year) {
      return year === 1 ? '1년 미만' : `${year}년차`;
    },
    toggleEdit() {
      if (this.isEditable) {
        this.saveEdits();
      } else {
        this.originalValues = { ...this.default_dayoff };
        this.isEditable = true;
      }
    },
    cancelEdit() {
      this.default_dayoff = { ...this.originalValues };
      this.isEditable = false;
    },
  },
};
</script>

<style>

.yearsContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 35%;
  margin-top: 50px;
  margin-left: 10%;
}
.yearItem {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.yearItem label {
  margin-right: 10px;
  width: 80px;
  margin-bottom: 10px;
}
.yearItem input {
  width: 50px;
  margin-bottom: 10px;
}
</style>