<template>
    <span>dateUtil.format(new Date(), 'yyyy-MM-dd hh:mm:ss (KS)')</span>
  <br>
    <span>{{getFullDate()}}</span>
</template>

<script setup>
import {dateUtil} from "@/utils/utils";

function getFullDate(){
  return dateUtil.format(new Date(), 'yyyy-MM-dd hh:mm:ss (KS)')
}
</script>