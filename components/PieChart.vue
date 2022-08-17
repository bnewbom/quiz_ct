<template>
  <Pie :chart-data="chartData" />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default {
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      }
    }
  }
}
</script>