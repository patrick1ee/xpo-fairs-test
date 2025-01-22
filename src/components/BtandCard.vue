<script setup lang="ts">

import { computed, PropType } from 'vue'
import { ListSubProfile } from '@/api/types'
import { useDashboardStore, useDropdownStore } from '@/store'

import { Palette } from '@/theme'

import { getTruncatedLabel } from '@/utils'

import QrRootTag from '@/components/tag/QrRootTag.vue'
import DropdownQrDownload from '@/components/dropdown/DropdownQrDownload.vue'
import DropdownQrEditDelete from '@/components/dropdown/DropdownQrEditDelete.vue'
import { storeToRefs } from 'pinia'

const dashboardStore = useDashboardStore()
const { getImageUrl } = dashboardStore

const dropdownStore = useDropdownStore()
const { activeDropdown } = storeToRefs(dropdownStore)

const emit = defineEmits(['onDownload', 'onSelect', 'onDelete'])

const { subProfile } = defineProps({
  subProfile: {
    type: Object as PropType<ListSubProfile>,
    required: true
  }
})

const cssVars = computed(() => {
  return {
    '--background-color': Palette.white,
    '--border-color': subProfile.isRootProfile ? Palette.primary : Palette.white,
    '--qr-type-color': subProfile.isRootProfile ? Palette.primary : Palette.white
  }
})

const truncatedLabel = computed(() => {
  return getTruncatedLabel(subProfile.label)
})

const imageUrl = computed(() => {
  return getImageUrl(subProfile.imageUri)
})

function onDownloadPng () {
  emit('onDownload', 'png', subProfile.id)
}

function onDownloadSvg () {
  emit('onDownload', 'svg', subProfile.id)
}

function onSelect () {
  emit('onSelect', subProfile.id)
}

function onDelete () {
  emit('onDelete', subProfile.id)
}

</script>

<template>
  <div class="qr-grid-item-container" :style="cssVars" @click="onSelect">
    <div class="qr-grid-item-image-container">
      <QrRootTag v-if="subProfile.isRootProfile" style="position: absolute; top: 10px; left: 10px;"/>
      <img class="qr-grid-item-image" :src=imageUrl crossorigin="anonymous">
    </div>
    <div class="qr-grid-item-label-container">
      <p class="qr-grid-item-label">{{ truncatedLabel }}</p>
    </div>
    <div class="qr-grid-item-footer">
      <div class="qr-grid-item-code-container">
        <img class="qr-grid-item-code" :src="subProfile.qrUri" />
      </div>
      <div class="qr-grid-item-buttons-container">
        <DropdownQrDownload
            :id="'dropdown-qr-download-'+subProfile.id"
            @onClickPng="onDownloadPng"
            @onClickSvg="onDownloadSvg"
          />
          <DropdownQrEditDelete
           :id="'dropdown-qr-edit-delete-'+subProfile.id"
            @onClickEdit="onSelect"
            @onClickDelete="onDelete"
          />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

  div.qr-grid-item-container {
    position: relative;
    border-radius: 16px;
    background: #FFF;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    padding: 20px;
    cursor: pointer;
  }

  div.qr-grid-item-image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    flex-shrink: 0;
    overflow: hidden;
  }
  img.qr-grid-item-image {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  div.qr-grid-item-label-container {
    width: 100%;
    flex-shrink: 0;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid rgba(33, 37, 41, 0.15);
  }

  p.qr-grid-item-label {
    color: var(--color-nearly-black);
    font-family: Inter;
    font-size: var(--font-size-14);
    font-weight: 600;
    line-height: 20px; /* 142.857% */
    min-height: 40px;
    text-align: left;
    margin: 0;
  }
  p.qr-grid-item-type {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 76px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #00F0FF;
    color: var(--color-nearly-black);
    font-family: Inter;
    font-size: 10px;
    font-weight: 500;
    line-height: 10px; /* 100% */
  }

  div.qr-grid-item-footer {
    height: 60px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  div.qr-grid-item-code-container{
      background-color: black;
      color: white;
      width: 40px;
      height: 40px;
  }
  img.qr-grid-item-code{
    width: 100%;
    height: 100%;
    vertical-align: top;
    line-height: 0;
  }
  div.qr-grid-item-buttons-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
</style>
