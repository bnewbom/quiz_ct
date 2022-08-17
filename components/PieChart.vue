<template>
  <Pie class="pie-chart" :chart-data="chartData" :width="width" :height="height"/>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  components: { Pie },
  props: {
    chartData: {
        type: Object,
        required: true
      },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
  }
}
</script>