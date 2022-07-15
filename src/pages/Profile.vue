<template>
  <section class="dashboard">
    <h1>Портфель</h1>
    <div class="dashboard__inner">
      <div class="profile">
      </div>
      <div class="lk">
      </div>
      <div class="currencies">
        <div class="currencies__inner">
          <currency-list></currency-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CurrencyList from "@/components/currencyList";

export default {
  components: {CurrencyList}
}
</script>

<style lang="scss" scoped>
  .dashboard {
    background-color: #fff;
    border: 1px solid #5b616e33;
    border-radius: 4px;

  }

  .currencies {

    &__inner {
      border: 1px solid #5b616e33;
    }
  }
</style>
