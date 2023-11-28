<template>
  <body class="sb-nav-fixed" v-if="!isIndexOrLogin" >
  <Header />
  <div id="layoutSidenav">
    <Left/>
    <div id="layoutSidenav_content">
      <main>
        <router-view/>
      </main>
    </div>
  </div>
  </body>

  <main v-else>
    <router-view/>
  </main>
</template>

<style>
@import "../src/assets/css/styles.css";
</style>
<script setup>
import Header from "@/components/layout/Header.vue";
import Left from "@/components/layout/Left.vue";

</script>
<script>

export default {
  name: 'App',
  data() {
    return {
      isIndexOrLogin: false,
    };
  },
  mounted() {
    this.loadScripts();
  },
  methods: {
    loadScripts() {
      const scripts = [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        // "js/scripts.js",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js",
        // "assets/demo/chart-area-demo.js",
        // "assets/demo/chart-bar-demo.js",
        "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js",
        // "js/datatables-simple-demo.js",
        "https://use.fontawesome.com/releases/v6.3.0/js/all.js"
      ];

      scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        document.body.appendChild(scriptElement);
      });
    },
    checkIfIndexOrLogin() {
      // 현재 경로가 인덱스나 로그인인지 확인하는 메서드입니다.
      const currentPath = this.$route.path;
      return currentPath === '/' || currentPath === '/login';
    }
  } ,watch: {
    // $route 객체를 감시하여 라우트 변경 시마다 조건을 업데이트합니다.
    '$route': function() {
      this.isIndexOrLogin = this.checkIfIndexOrLogin();
    }
  },
  created() {
    // 컴포넌트가 생성될 때 초기 조건을 설정합니다.
    this.isIndexOrLogin = this.checkIfIndexOrLogin();
  },

};
</script>