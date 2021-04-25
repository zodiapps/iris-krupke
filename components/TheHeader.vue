<template lang="pug">
header
  .container
    NuxtLink(to='/')
      img(src='~/assets/logo.png', alt='Iris Krupke')
    AppHamburgerMenu.menu(:value='menu', @update='onMenuClick()')
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onMenuClick() {
      this.$emit('toggleMenu')
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  @apply mx-auto py-8 px-4 flex justify-between items-center;

  img {
    @apply flex-grow w-full max-w-sm;
  }

  .menu {
    @apply ml-4 w-6 h-6;

    @screen md {
      @apply hidden;
    }
  }
}
</style>
