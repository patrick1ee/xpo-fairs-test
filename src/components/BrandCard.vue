<script setup lang="ts">

import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Brand } from '@/api/types'

import { storeToRefs } from 'pinia'

const alphaNumericToColor: Record<string, string> = {
    'A': 'rgba(255, 87, 51, 0.2)', // Bright Red-Orange
    'B': 'rgba(51, 255, 87, 0.2)', // Bright Green
    'C': 'rgba(51, 87, 255, 0.2)', // Bright Blue
    'D': 'rgba(255, 51, 161, 0.2)', // Bright Pink
    'E': 'rgba(255, 209, 51, 0.2)', // Bright Yellow
    'F': 'rgba(51, 255, 245, 0.2)', // Bright Cyan
    'G': 'rgba(142, 51, 255, 0.2)', // Bright Purple
    'H': 'rgba(255, 140, 51, 0.2)', // Orange
    'I': 'rgba(51, 255, 140, 0.2)', // Lime Green
    'J': 'rgba(51, 140, 255, 0.2)', // Sky Blue
    'K': 'rgba(255, 51, 140, 0.2)', // Magenta
    'L': 'rgba(255, 87, 51, 0.2)', // Coral
    'M': 'rgba(87, 255, 51, 0.2)', // Light Green
    'N': 'rgba(87, 51, 255, 0.2)', // Indigo
    'O': 'rgba(255, 51, 87, 0.2)', // Crimson
    'P': 'rgba(51, 255, 209, 0.2)', // Aqua
    'Q': 'rgba(209, 51, 255, 0.2)', // Lavender
    'R': 'rgba(255, 142, 51, 0.2)', // Light Orange
    'S': 'rgba(51, 255, 142, 0.2)', // Mint Green
    'T': 'rgba(51, 142, 255, 0.2)', // Light Blue
    'U': 'rgba(255, 51, 209, 0.2)', // Bright Violet
    'V': 'rgba(245, 51, 255, 0.2)', // Hot Pink
    'W': 'rgba(140, 51, 255, 0.2)', // Deep Purple
    'X': 'rgba(255, 51, 142, 0.2)', // Rose
    'Y': 'rgba(51, 255, 209, 0.2)', // Turquoise
    'Z': 'rgba(255, 209, 51, 0.2)', // Golden Yellow
    '0': 'rgba(0, 0, 0, 0.2)', // Black
    '1': 'rgba(255, 255, 255, 0.2)', // White
    '2': 'rgba(255, 0, 0, 0.2)', // Red
    '3': 'rgba(0, 255, 0, 0.2)', // Green
    '4': 'rgba(0, 0, 255, 0.2)', // Blue
    '5': 'rgba(255, 255, 0, 0.2)', // Yellow
    '6': 'rgba(255, 0, 255, 0.2)', // Magenta
    '7': 'rgba(0, 255, 255, 0.2)', // Cyan
    '8': 'rgba(128, 128, 128, 0.2)', // Gray
    '9': 'rgba(255, 165, 0, 0.2)'  // Orange
};

const { brand } = defineProps({
  brand: {
    type: Object as PropType<Brand>,
    required: true
  }
})

const cssBrandHall = computed(() => {
  return {
    backgroundColor: alphaNumericToColor[brand.hall]
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
      <div class="brand-stand-container" :style="cssBrandHall">
        <p class="brand-stand">{{ 'Hall ' + brand.hall + ', Stand ' + brand.stand_number }}</p>
      </div>
    </div>
    <div class="brand-description-container">
      <p class="brand-description">{{ brand.description }}</p>
    </div>
    <div v-if="brand.exhibitor" class="brand-footer">
      <div class="exhibitor-image-container">
        <img class="exhibitor-image" :src="brand.exhibitor.profile_picture" />
      </div>
      <p class="exhibitor-text">{{ 'Exhibited by ' + brand.exhibitor.name + ', ' + brand.exhibitor.position + ' @ ' + brand.exhibitor.company }}</p>
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
    height: 400px;
    flex-shrink: 0;
    padding: 20px;
    margin: 30px 0;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }

  div.brand-container:hover {
    transform: scale(1.1);
  }

  div.brand-header {
    width: 100%;
    display: flex;
    gap: 10px;
  }
  div.brand-image-container {
    width: 10%;
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
    flex-shrink: 0;
    padding: 20px 0 20px 0;
  }

  div.brand-stand-container {
    position: relative;
    top: -20px;
    margin-left: auto;
    padding: 10px;
    border-radius: 0 0 8px 8px;
  }

  p.brand-label {
    color: #212529;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    min-height: 40px;
    text-align: left;
    margin: 0;
  }
 div.brand-description-container {
  border-bottom: 1px solid rgba(33, 37, 41, 0.15);
  padding: 20px 10px;
  height: 60%;
  overflow: hidden;
 }
  div.brand-footer {
    height: 60px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  div.exhibitor-image-container{
      background-color: black;
      color: white;
      width: 40px;
      height: 40px;
  }
  img.exhibitor-image{
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
  p.exhibitor-text {
    color: black;
    margin: 0;
  }
</style>
