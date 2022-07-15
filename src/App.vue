<template>
  <div class="container">
    <navbar :currency="currency"></navbar>
    <section class="app">
      <router-view></router-view>
    </section>

  </div>
</template>

<script>
import navbar from "@/components/Navbar.vue";

export default  {
  components: {
    navbar
  },
  data() {
    return {
      currency: [],
      isFetching: false,
      users: {
        login: 'user',
        password: '123'
      },
    }
  },
}
</script>

<style lang="scss">
.app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Open Sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.green-txt {
  color: #48c774;
}

.red-txt {
  color: #ff0000;
}

</style>
