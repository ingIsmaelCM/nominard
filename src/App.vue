<template>
  <div class="max-w-6xl mx-auto h-full shadow-xl">
    <NavigationTabs/>
  </div>
</template>


<script setup lang="ts">

import {onMounted} from "vue";
import NominaCalculator from "@/services/nomina.calculator.ts";
import NavigationTabs from "@/components/NavigationTabs.vue";

onMounted(() => {
  const employee = new NominaCalculator(50000, 1);
  console.log(employee.result)
})
</script>