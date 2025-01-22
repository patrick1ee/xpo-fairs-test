<script setup lang="ts">
import { computed, defineEmits } from 'vue'

const { label, name, placeholder, modelValue, containerStyle, wrapperStyle, textStyle, labelStyle, rightComponentStyle, multiline, type } = defineProps({
  label: {
    String,
    default: ''
  },
  maxlength: {
    type: String,
    default: '200'
  },
  rightImageUri: {
    type: String,
    default: ''
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
  },
  labelStyle: {
    type: Object,
    default: null
  },
  rightComponentStyle: {
    type: Object,
    default: null
  },
  multiline: {
    type: Boolean,
    default: false
  },
  name: String,
  placeholder: String,
  type: String,
  modelValue: String
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

const cssVarsLabel = computed(() => {
  return {
    ...labelStyle
  }
})

const cssVarsContainer = computed(() => {
  return {
    ...containerStyle
  }
})

const cssVarsWrapper = computed(() => {
  return {
    ...wrapperStyle
  }
})

const cssVarsText = computed(() => {
  return {
    ...textStyle
  }
})

const cssVarsRightComponent = computed(() => {
  return {
    ...rightComponentStyle
  }
})

</script>

<template>
  <div class="text-input-container" :style="cssVarsContainer">
    <label v-if="label.length > 0" for="text-input" class="text-input-label" :style="cssVarsLabel">{{ label }}</label>
    <div v-if="!multiline" class="text-input-wrapper" :style="cssVarsWrapper">
      <input class="text-input-text" :type="type" :name="name" :placeholder="placeholder" v-model="value" :style="cssVarsText"/>
      <slot/>
    </div>
    <textarea v-else class="text-input-wrapper" :maxlength="maxlength" :placeholder="placeholder" v-model="value"/>
    <p v-if="multiline">{{ modelValue?.length + '/' + maxlength }}</p>
</div>
</template>

<style scoped>

div.text-input-container {
  display: flex;
  flex-direction: column;
}
div.text-input-wrapper {
  background-color: white;
  display: flex;
  width: 100%;
  height: 40px;
  padding: 10px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid rgba(33, 37, 41, 0.10);
  background: #FFF;
}

.text-input-text {
  flex: 1 0 0;
  color: var(--color-nearly-black);
  font-family: Inter;
  font-size: var(--font-size-14);
  font-weight: 400;
  line-height: 14px; /* 100% */
  border: none;
  outline: none;
}

.text-input-text::placeholder {
  opacity: 0.4;
}

textarea{
  aspect-ratio: 6.5/1;
  resize: none;
}

label.text-input-label {
  float: left;
  font-size: 0.75rem;
  padding-left: 0.1rem;
}

</style>
