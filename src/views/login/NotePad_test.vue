<template>
  <div>
    <a href="javascript:void(0);" @click="openWindow"> 클릭! </a>
  </div>
</template>

<script>
export default {
  methods: {
    openWindow() {
      const newin = window.open('', 'width=200', 'height=300');
      newin.document.write('<head><title>NotePad</title></head><body onclick="self.close()">');
    }
  }
}
</script>
