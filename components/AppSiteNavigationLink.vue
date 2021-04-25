<template lang="pug">
NuxtLink(:to='link')
  img(:src='imageUrl')
  h3 {{ title }}
  p {{ subtitle }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    to: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  computed: {
    link() {
      return `/${this.to}/?i=${this.index}`
    },
  },
})
</script>

<style lang="scss" scoped>
a {
  @apply relative py-8 px-4 flex flex-col shadow-lg bg-white rounded-md overflow-hidden transition-shadow duration-200;

  img {
    @apply absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover opacity-25 transition-opacity duration-150;

    backface-visibility: hidden;
    z-index: -1;
  }

  h3 {
    @apply font-bold;
  }

  &.nuxt-link-active,
  &:hover {
    img {
      @apply opacity-50;
    }
  }

  &:hover {
    @apply shadow-xl;
  }
}
</style>
