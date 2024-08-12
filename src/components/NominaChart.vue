<template>
  <div class="absolute md:block z-50 transition-all ease-in-out duration-500 bg-white w-full left-0">
    <Button class="absolute top-1 right-1 bg-transparent z-50 md:hidden"
            severity="contrast" @click="showChart = !showChart"
            text raised>&#x1F441;
    </Button>
    <div class="overflow-hidden transition-all ease-in-out duration-500 md:h-full flex justify-center w-full "
         :class="showChart?'h-[22.5rem]':'h-0'">
      <Chart type="doughnut" :plugins="[datalabel]" :data="data_chart" :options="option_chart"
             class=" w-[50rem] md:w-[25rem] !h-[40rem] md:!h-[25rem] !mx-auto" />
    </div>
  </div>


</template>
<script setup lang="ts">
import {computed, ref} from "vue";
import Chart from "primevue/chart";
import Button from "primevue/button";
import datalabel from "chartjs-plugin-datalabels"

interface IProps {
  data: Record<string, number>
}

const props = defineProps<IProps>()
const showChart = ref(false)

const values = computed(() => {
  return {
    labels: ['Sueldo Neto', 'ARS', 'AFP', "ISR"],
    values: [props.data.net_salary, props.data.ars, props.data.afp, props.data.isr]
  }
})

const data_chart = ref({
  labels: values.value.labels.map((label: string, ind: number) =>
      `${label} ${((values.value.values[ind] / props.data.salary) * 100).toFixed(2)}%`),
  datasets: [
    {
      data: values.value.values,
    }
  ]
})

const option_chart = computed(() => ({
      tooltips: {
        enabled: true
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50
        }
      },
      plugins: {
        legend: {
          display: false,
          position: "right"
        },

        datalabels: {
          color: '#000',
          anchor: 'end',
          align: 'end',
          font: {
            lineHeight: 1,

          },
          formatter: function (value: number, ctx: any) {
            if(value){
              return `${values.value.labels[ctx.dataIndex]} \n ${((value / props.data.salary) * 100).toFixed(2)}%`
            } else{
              return ""
            }
          }
        }
      }
    })
)
</script>