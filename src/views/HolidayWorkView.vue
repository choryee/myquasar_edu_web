<template>
  <div class="content-header">
    <h1>
      휴일 출근 관리
    </h1>
  </div>
  <div class="content-container">
    <div class="search-input-container">
      <div class="input-group">
        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary">검색:{{ krSearchType }}</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" @click="setSearchType('title')">제목 및 메모</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" @click="setSearchType('date')">날짜</a>
          </div>
        </div>
      </div>
    </div>
    <div class="table-container bd-solid mg-t-3 pd-lr-1r">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">순번</th>
          <th scope="col">사번</th>
          <th scope="col">이름</th>
          <th scope="col">직급</th>
          <th scope="col">출근 일</th>
          <th scope="col">메모</th>
          <th scope="col">수정</th>
          <th scope="col">삭제</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item, index) in items">
          <table-row
              :index="index+1"
              :is-state-button=true
              :is-update-prop="false"
              :prop-item="item"
              :update-event="updateItem"
              :delete-event="removeItem"
              :property-order="propertyOrder">
          </table-row>
        </template>
        <tr>
          <td colspan="8" class="ta-c clickable" @click="">+</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TableRow from "@/components/table/table-row.vue";
import {tableItemUtil} from "@/utils/utils";
const {createTableItem} = tableItemUtil;
export default {
  name: 'holidayWorkView',
  components: {TableRow},
  mounted() {
    this.loadScripts();
  },
  data : function () {
    return {
      searchType : "date",
      propertyOrder : ['employeeNo', "name", "rank", "workDate", "memo"],
      selectBoxList: [
        {key:"M004", value:"M004/고이름"}, {key:"M005", value:"M005/강이름"},
      ],
      items: [
        {
          employeeNo: createTableItem("employeeNo","M004", true, "selectBox", [{key:"M004",value:"M004",view:"M004/고이름"}, {key:"M005", value:"M005", view:"M005/강이름"}]),
          name: createTableItem("name","고이름", false),
          rank: createTableItem("rank","매니저", false),
          workDate : createTableItem("workDate","2015-03-02", true, "date"),
          memo: createTableItem("memo","메모1", true, "text")
        },
        {
          employeeNo: createTableItem("employeeNo","M005", true, "selectBox",  [{key:"M004",value:"M004",view:"M004/고이름"}, {key:"M005", value:"M005", view:"M005/강이름"}]),
          name: createTableItem("name","강이름", false),
          rank: createTableItem("rank","매니저", false),
          workDate : createTableItem("workDAte","2015-03-04", true, "date"),
          memo: createTableItem("memo","메모2", true, "text")
        }
      ]
    }
  },
  computed: {
    krSearchType() {
      if(this.searchType === "date") {
        return "날짜";
      } else {
        return "제목";
      }
    }
  },
  methods: {
    loadScripts() {
      const scripts = [
        "https://code.jquery.com/jquery-3.2.1.slim.min.js",
          "https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
      ];
      scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        document.body.appendChild(scriptElement);
      });
    },
    setSearchType(searchType) {
      this.searchType = searchType;
    },

    updateItem() {

    },
    removeItem() {

    }

  }
}
</script>

<style>
@import "@/assets/css/bootstrap-style.css";

.pd-lr-1r{
  padding: 0 1rem;
}

.ta-c {
  text-align: center;
}
.content-header {
  margin: 2rem;
}

.content-container {
  margin: 3rem;
}

.search-input-container {
  text-align: right;
}

.clickable:hover {
  cursor: pointer;
}

.mg-t-3 {
  margin-top: 3rem;
}

.bd-solid {
  border-style: solid;
  border-width: 1px;
}
</style>