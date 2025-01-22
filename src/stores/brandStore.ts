import { ref } from 'vue'
import { defineStore } from 'pinia'

import { api } from '@/api'
import type { Brand } from '@/api/types'

export const usebrandStore = defineStore('brand', () => {
  const brands = ref<Brand[]>([])

  function sortBrands (sortBy: string) {
    switch (sortBy) {
      case 'Name':
        brands.value.sort((a, b) => a.brand_name.localeCompare(b.brand_name))
        break
      case 'Location':
        brands.value.sort((a, b) => a.location.localeCompare(b.location))
        break
      case 'Hall':
        brands.value.sort((a, b) => a.hall.localeCompare(b.hall))
        break
      default:
        brands.value.sort((a, b) => a.brand_name.localeCompare(b.brand_name))
    }
  }

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

  async function searchBrand (searchText: string): Promise<string> {
    const response = await api.searchBrand(searchText, searchText, searchText, searchText)
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
    sortBrands,
    fetchBrands,
    searchBrand
  }
})
