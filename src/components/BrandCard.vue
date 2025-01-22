<script setup lang="ts">

import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Brand } from '@/api/types'

import { storeToRefs } from 'pinia'

const { brand } = defineProps({
  brand: {
    type: Object as PropType<Brand>,
    required: true
  }
})

</script>

<template>
  <div class="brand-container">
    <div class="brand-header">
      <div class="brand-image-container">
        <img class="brand-image" :src=brand.image_url crossorigin="anonymous">
      </div>
      <div class="brand-label-container">
        <p class="brand-label">{{ brand.brand_name }}</p>
      </div>
    </div>
    <div class="brand-description-container">
      <p class="brand-description">{{ brand.description }}</p>
    </div>
    <div class="brand-footer">
      <div v-if="brand.exhibitor" class="brand-code-container">
        <img class="brand-code" :src="brand.exhibitor.profile_picture" />
      </div>
      <div class="brand-buttons-container">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

  div.brand-container {
    position: relative;
    border-radius: 16px;
    background: #FFF;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    padding: 20px;
    cursor: pointer;
  }

  div.brand-header {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  div.brand-image-container {
    width: 25%;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    flex-shrink: 0;
    overflow: hidden;
  }
  img.brand-image {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  div.brand-label-container {
    width: 100%;
    flex-shrink: 0;
    padding: 20px 0 20px 0;
  }

  p.brand-label {
    color: var(--color-nearly-black);
    font-family: Inter;
    font-size: var(--font-size-14);
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    min-height: 40px;
    text-align: left;
    margin: 0;
  }
 div.brand-description-container {
  border-bottom: 1px solid rgba(33, 37, 41, 0.15);
 }
  div.brand-footer {
    height: 60px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  div.brand-code-container{
      background-color: black;
      color: white;
      width: 40px;
      height: 40px;
  }
  img.brand-code{
    width: 100%;
    height: 100%;
    vertical-align: top;
    line-height: 0;
  }
  div.brand-buttons-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
</style>
