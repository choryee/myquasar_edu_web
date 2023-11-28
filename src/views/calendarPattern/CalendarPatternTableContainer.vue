<template>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group mgb-1r">
        <input type="text" class="form-control" v-model="searchQuery">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary" @click="searchForm">검색</button>
        </div>
      </div>
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
              <template v-if="pattern.editing">
                <input v-model="formData.editingPatternForm">
              </template>
              <template v-else>
                {{ pattern.patternForm }}
              </template>
            </td>
            <td>{{ pattern.createDt }}</td>
            <td>{{ pattern.creatorId }}</td>
            <template v-if="!pattern.editing">
              <td>
                <button class="btn btn-warning" type="button" @click="modifyPatternMode(pattern)">수정</button>
              </td>
              <td>
                <button class="btn btn-danger" type="button" @click="deletePattern(pattern.patternIdx,pattern.patternForm)">삭제</button>
              </td>
            </template>
            <template v-else>
              <td>
                <button class="btn btn-warning" type="button" @click="modifyPattern(pattern.patternIdx,pattern.patternForm)">수정</button>
              </td>
              <td>
                <button class="btn btn-danger" type="button" @click="cancelModify(pattern)">취소</button>
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
        updatorId: 'system',
        editingPatternForm: ''
      },
      patternInsert: true, //등록 모드
      searchQuery: '',
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
          pageSize: this.pageSize,
          searchQuery: this.searchQuery,
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
        const isPatternValid = /^\[%s\]/.test(this.formData.patternForm);
        if(!isPatternValid) {
          alert("입력 형식이 올바르지 않습니다. [%s] 형태가 앞에 들어가야 합니다");
          return;
        }
        const {patternForm, creatorId} = this.formData;
        const response = await network.calendarPattern.calendarPatternInsert({patternForm, creatorId}, {});
        if (response) {
          alert('패턴 등록 성공');
          await this.calendarPatternList();
        } else {
          console.error('Failed to insert pattern:', response);
          // 서버에서 전달한 오류 메시지 표시 또는 사용자에게 알림 추가
          alert('패턴 등록에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching calendar patterns:', error);
      }
    },
    modifyPatternMode(pattern) {
      this.patterns.forEach((response) => {
        if (response !== pattern) {
          response.editing = false;
        }
      });
      pattern.editing = true;
      this.formData.editingPatternForm =  pattern.patternForm;
    },
    async modifyPattern(patternIdx,patternForm) {
      if(confirm(patternForm + " 이 패턴 정보를 수정하시겠습니까?")) {

        const isPatternValid = /^\[%s\]/.test(this.formData.patternForm);
        const { editingPatternForm, updatorId } = this.formData;
        if(!isPatternValid) {
          alert("입력 형식이 올바르지 않습니다. [%s] 형태가 앞에 들어가야 합니다");
          return;
        }
        try {
          const response = await network.calendarPattern.calendarPatternModify(
              parseInt(patternIdx),
              {patternForm : editingPatternForm, updatorId}, {});
          if(response) {
            alert('패턴 수정 성공');
            await this.calendarPatternList();
          } else {
            console.error('Failed to modify pattern', response);
            alert('패턴 등록에 실해했습니다.')
          }
        }catch (error) {
          console.log('Error fetching calendar patterns:', error);
        }
      }
    },
    async deletePattern(patternIdx,patternForm) {
      if(confirm(patternForm +' 정말 패턴 정보를 삭제하시겠습니까?')) {
        try {
          const response = await network.calendarPattern.calendarPatternDelete(
              parseInt(patternIdx),{},{});
          if(response) {
            alert('패턴 삭제 성공');
            await this.calendarPatternList();
          }else {
            console.error('Failed to modify pattern',response);
            alert('패턴 삭제에 실패했습니다');
          }
        }catch (error) {
          console.log('Error fetching calendar patterns:', error);
        }
      }
    },
    async searchForm() {
      // 검색어를 입력하지 않은 경우, 모든 패턴을 가져옴

      if (!this.searchQuery) {
        this.page = 1; // 페이지 초기화
        await this.calendarPatternList();
        return;
      }
      try {
        this.page = 1;
        const response = await network.calendarPattern.calendarPatternList({
          page: this.page,
          pageSize: this.pageSize,
          searchQuery: this.searchQuery,
        }, {});

        this.patterns = response.result;
      }catch (error) {
        console.log('Error fetching calendar patterns',error);
      }
    },
    insertMode() {
      this.patternInsert = false;
    },
    cancelInsert() {
      this.patternInsert = true;
    },

    cancelModify(pattern) {
      pattern.editing = false;
    }
  },
}
</script>
<style>
.centered-cell {
  text-align: center;
}
</style>