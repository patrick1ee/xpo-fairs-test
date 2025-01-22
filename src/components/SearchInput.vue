<script setup lang="ts">
import { computed, defineProps } from 'vue'

import TextInput from './TextInput.vue'

const { label, name, placeholder, modelValue, containerStyle, wrapperStyle, textStyle } = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: String,
  placeholder: String,
  modelValue: {
    type: String,
    required: true
  },
  containerStyle: {
    type: Object,
    default: null
  },
  wrapperStyle: {
    type: Object,
    default: null
  },
  textStyle: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return modelValue
  },
  set (value: string) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <TextInput
    :label="label"
    :name="name"
    :placeholder="placeholder"
    :modelValue="value"
    @update:modelValue="value = $event"
    rightImageUri="icons/svg/search.svg"
    :containerStyle="containerStyle"
    :wrapperStyle="wrapperStyle"
    :textStyle="textStyle"
  >
    <img :src="`@/assets/icons/svg/search.svg`"/>
  </TextInput>
</template>
