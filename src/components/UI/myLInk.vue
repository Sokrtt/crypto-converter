<template>
  <a href="" class="link">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'my-link'
}
</script>

<style lang="scss" scoped>
  .link {
    padding: 10px 20px;
    color: #000000CC;

    &.-active {
      box-shadow: inset 0 -3px 0 -1px #666;
     }
  }
</style>