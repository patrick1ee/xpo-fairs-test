import { ref } from 'vue'
import { defineStore } from 'pinia'

import { api } from '@/api'
import type { Brand } from '@/api/types'

export const usebrandStore = defineStore('brand', () => {
  const brands = ref<Brand[]>([])

  async function fetchBrands (): Promise<string> {
    const response = await api.getBrands()
    if (response.kind !== 'ok') {
      console.log(`Error fetching brands`, [])
      return response.kind
    }
    brands.value = response.brands
    console.log(brands.value)
    return response.kind
  }

  return {
    brands,
    fetchBrands
  }
})
