<template>
  <div class="content-container">
    <div class="search-input-container">
      <div class="paging-button-container">
        <!--        <template v-if="hasPreviousPage">-->
        <button type="button" class="btn btn-info mgb-1r mgr-1r" @click="doPreviousPage">이전</button>
        <!--        </template>-->
        <!--        <template v-else>-->
        <!--          <button type="button" class="btn btn-secondary mgb-1r mgr-1r">이전</button>-->
        <!--        </template>-->
        <!--        <template v-if="hasNextPage">-->
        <button type="button" class="btn btn-info mgb-1r" @click="doNextPage">다음</button>
        <!--        </template>-->
        <!--        <template v-else>-->
        <!--          <button type="button" class="btn btn-secondary mgb-1r">다음</button>-->
        <!--        </template>-->
      </div>
      <div class="table-container bd-solid pd-lr-1r">
        <table class="table">
          <thead>
          <tr>
            <td v-for="tableHeader in tableHeaders">{{tableHeader}}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pattern in patterns" :key="pattern.patternIdx">
            <td>{{ pattern.patternIdx }}</td>
            <td>
              <template v-if="this.editing">
                <input v-model="formData.patternForm">
              </template>
              <template v-else>
                {{ pattern.patternForm }}
              </template>
            </td>
            <td>{{ pattern.createDt }}</td>
            <td>{{ pattern.creatorId }}</td>
            <template v-if="!this.editing">
              <td>
                <button class="btn btn-warning" type="button" @click="modifyPatternMode(pattern.patternIdx)">수정</button>
              </td>
              <td>
                <button class="btn btn-danger" type="button">삭제</button>
              </td>
            </template>
            <template v-else>
              <td>
                <button class="btn btn-warning" type="button" @click="modifyPatternMode">수정1</button>
              </td>
              <td>
                <button class="btn btn-danger" type="button" @click="cancelModify">취소</button>
              </td>
            </template>
          </tr>
          <template v-if="patternInsert">
            <tr @click="insertMode">
              <td :colspan="6" class="centered-cell">+</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td></td>
              <td><input v-model="formData.patternForm"></td>
              <td></td>
              <td></td>
              <td>
                <button class="btn badge-dark" type="button" @click="calendarPatternInsert">등록</button>
              </td>
              <td>
                <button class="btn badge-info" type="button" @click="cancelInsert">취소</button>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/network";

export default {
  name: 'CalendarPatternTableContainer',
  data() {
    return {
      patterns: [],
      page: 1,
      pageSize: 10,
      hasNextPage: false,
      hasPreviousPage: false,
      tableHeaders: ['NO','패턴','생성일','생성자','수정','삭제'],
      formData: {
        patternForm: '[%s]',
        creatorId: 'system',
      },
      patternInsert: true, //등록 모드
      editing: false, //수정 모드
    };
  },
  mounted() {
    this.calendarPatternList();
  },
  methods: {
    async calendarPatternList() {
      try {
        const response = await network.calendarPattern.calendarPatternList({
          page: this.page,
          pageSize: this.pageSize
        }, {});
        this.patterns = response.result;
      } catch (error) {
        console.error('Error fetching calendar patterns:', error);
      }
    },
    async doPreviousPage() {
      if (this.page > 1) {
        this.page--;
        await this.calendarPatternList();
      }
    },
    async doNextPage() {
      this.page++;
      await this.calendarPatternList();
    },
    async calendarPatternInsert() {
      try {
        const {patternForm, creatorId} = this.formData;
        const response = await network.calendarPattern.calendarPatternInsert({patternForm, creatorId}, {})
        if (response) {
          console.log('Pattern inserted successfully:', response);
          alert('패턴 등록 성공');
          this.cancelInsert();
        } else {
          console.error('Failed to insert pattern:', response);
          // 서버에서 전달한 오류 메시지 표시 또는 사용자에게 알림 추가
          alert('패턴 등록에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching calendar patterns:', error);
      }
    },
    modifyPatternMode(patternIdx) {
      console.log("test : "+ patternIdx);
      const selectedPattern = this.patterns.find(pattern => pattern.patternIdx === patternIdx);
      if(selectedPattern) {
        this.formData.patternForm = selectedPattern.patternForm;
      }
      this.editing = true;
    },
    insertMode() {
      this.patternInsert = false;
    },
    cancelInsert() {
      this.patternInsert = true;
    },

    cancelModify() {
      this.editing = false;
    }
  },
}
</script>
<style>
.centered-cell {
  text-align: center;
}
</style>