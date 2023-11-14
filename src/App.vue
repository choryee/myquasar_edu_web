<template>
  <body class="sb-nav-fixed">
    <Header />
    <div id="layoutSidenav">
      <Left />
      <div id="layoutSidenav_content">
        <main>
          <router-view/>
        </main>
      </div>
    </div>
  </body>
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
  components: { DayoffView },
  name: 'App',
  mounted() {
    this.loadScripts();
  },
  methods: {
    loadScripts() {
      const scripts = [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        "js/scripts.js",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js",
        "assets/demo/chart-area-demo.js",
        "assets/demo/chart-bar-demo.js",
        "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js",
        "js/datatables-simple-demo.js",
        "https://use.fontawesome.com/releases/v6.3.0/js/all.js"
      ];

      scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        document.body.appendChild(scriptElement);
      });
    }
  }
};
</script>