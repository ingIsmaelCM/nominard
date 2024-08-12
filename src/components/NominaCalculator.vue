<template>
  <div class="size-full   flex flex-col md:flex-row md:space-y-0 md:space-x-4">
    <div
        class="grid grid-cols-5 gap-x-4 h-min items-center gap-y-6 w-full md:w-1/2  border py-2.5 px-4 rounded-lg
                shadow-lg relative ">
      <p class="col-span-3 font-bold overflow-ellipsis whitespace-nowrap overflow-hidden uppercase">Salario Bruto
        mensual (RD$) </p>
      <InputNumber class="col-span-2" input-class="w-full" v-model="state.salary" :allow-empty="false" mode="currency"
                   :min-fraction-digits="2" :max-fraction-digits="2" :min="10000" :max="900000" currency="USD"
                   locale="en-US" @keydown.enter="calculate"/>
      <p class=" col-span-3 font-bold overflow-ellipsis whitespace-nowrap overflow-hidden uppercase">Dependientes
        Adicionales </p>
      <InputNumber class="col-span-2" input-class="w-full" v-model="state.dependants" :allow-empty="false"
                   :min="0" :max="10" :max-fraction-digits="0"/>
      <Button class="col-start-4 col-end-6" :disabled="state.salary<10000" @click="calculate">Calcular</Button>
      <div class="col-span-5">
        <NominaChart v-if="data.length" :data="result" :key="result.net_salary"/>
      </div>
    </div>
    <div
        class="w-full md:w-1/2 border py-2.5 px-4 rounded-lg
        shadow-lg ">
      <TreeTable :value="data" :expanded-keys="{'0':true, '1':true, '1-0':true}">
        <Column field="name" header="Concepto" expander style="width: 70%"></Column>
        <Column field="value" header="Monto" style="width: 30%"></Column>
      </TreeTable>

    </div>
  </div>


</template>
<script setup lang="ts">
import {Ref, ref} from "vue";
import NominaCalculator from "@/services/nomina.calculator.ts";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button"
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import NominaChart from "@/components/NominaChart.vue";

const state: Ref<Record<string, number>> = ref({
  salary: 0,
  dependants: 0
})

const data: Ref<Record<string, any>[]> = ref([])
const result = ref({})

const calculate = () => {
  const nomina = new NominaCalculator(state.value.salary, state.value.dependants);
  data.value = nomina.getNodes()
  result.value = nomina.result
  console.log(result.value)
}
</script>