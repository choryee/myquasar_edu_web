<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'SimpleInfoTitle',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
