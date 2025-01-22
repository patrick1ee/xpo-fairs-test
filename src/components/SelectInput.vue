<script setup lang="ts">
import { computed } from 'vue'

const { options, label, modelValue, layout, containerStyle } = defineProps({
  options: Object,
  label: String,
  modelValue: String,
  layout: {
    type: String,
    default: 'column'
  },
  containerStyle: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['update:value'])

const value = computed({
  get () {
    return modelValue
  },
  set (value: string) {
    emit('update:value', value)
  }
})

const cssVarsContainer = computed(() => {
  return {
    '--container-flex-direction': layout,
    ...containerStyle
  }
})

const cssVarsComponent = computed(() => {
  return {
    '--component-width': layout === 'column' ? '100%' : '70%'
  }
})

</script>

<template>
  <div class="select-container" :style="cssVarsContainer">
    <label class="select-label" v-if="label" for="select-input">{{ label }}</label>
    <select class="select-wrapper" :selected="modelValue" id="select-input" v-model="value" :style="cssVarsComponent">
      <option v-for="[k,v] in Object.entries(options)" :key="k">{{ v }}</option>
    </select>
  </div>
</template>

<style scoped>

div.select-container {
  display: flex;
  flex-direction: var(--container-flex-direction);
  justify-content: center;
  align-items: center;
}
select.select-wrapper {
  width: 132px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid rgba(33, 37, 41, 0.10);
  background: #FFF;
  color: var(--color-nearly-black);
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px; /* 107.692% */
  padding-left: 10px;
}

label.select-label {
  color: var(--color-nearly-black);
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  line-height: 14px; /* 107.692% */
  margin-right: 10px;
  opacity: 0.5;
}

</style>
