<template>
  <div class="chart__inner">
    <apexchart
        class="myChart"
        type="line"
        :options="chartOptions"
        :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    priceChange: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    convertDate(myDate) {
      const d = new Date(myDate).toLocaleDateString("en-GB");
      return d;
    }
  },

  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        xaxis: {
          labels: {
            show: false
          },
          tooltip: {
            // enabled:false,
          },
          categories: this.priceChange.map(item => this.convertDate(item[0])),
        },
        yaxis: {
          labels: {
            show: false
          },
        },
        tooltip: {
          // enabled:false,
        },
      },
      series: [
        {
          name: "Price",
          data: this.priceChange.map(item => item[1].toFixed(2)),
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
  .myChart {
    width: 120px;
    margin: 0 auto;
  }
</style>