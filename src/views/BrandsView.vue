<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usebrandStore } from '@/stores/brandStore'

import { SlickList, SlickItem } from 'vue-slicksort'

import  BrandCard from '@/components/BrandCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import SelectInput from '@/components/SelectInput.vue'

import type { Brand } from '@/api/types'

const router = useRouter()

const brandStore = usebrandStore()

const { brands } = storeToRefs(brandStore)
const { fetchBrands, searchBrand, sortBrands } = brandStore

const searchText = ref('')
const sortBy = ref('Newest')
const sortByOptions = ref([
  'Name',
  'Location',
  'Hall'
])

async function onSearch() {
  return
}

const visibleBrands = computed(() => {
  return brands.value.filter((brand: Brand) => {
    return brand.brand_name.toLowerCase().includes(searchText.value.toLowerCase()) ||
    brand.location.toLowerCase().includes(searchText.value.toLowerCase()) ||
    brand.exhibitor && brand.exhibitor.name.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

onMounted(async () => await fetchBrands())

</script>

<template>
    <div class="view-container">
        <div class="d-flex flex-row">
          <div class="header-container">
            <h1 class="page-title">Brands</h1>
            <div class="search-container">
                <SearchInput
                @update:modelValue="onSearch"
                v-model="searchText"
                placeholder="Search brands..."/>
            </div>
            <div class="select-container">
                <SelectInput @update:value="sortBrands" :options="sortByOptions" v-model="sortBy" label="Sort by" layout="row"/>
            </div>
          </div>
        </div>
        <div  class="row search-select-container">
        </div>
        <div class="brand-grid">
            <div
                v-for="brand in (visibleBrands as Brand[])"
                :key="brand.BrandID"
                >
                    <BrandCard :brand="brand" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

div.view-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 5%;
}

div.header-container {
    display: flex;
    gap: 25px;
}

h1.page-title {
  color: #212529;
  font-weight: 800;
  text-align: left;
  margin: 0;
}

div.sub-nav-container {
  margin: 1.34rem 0 0 0;
  width: 100%;
}

div.search-select-container {
  margin: 0.96rem 0 0 0;
}

div.search-container {
  padding: 0;
  display: flex;
  align-items: center;
}

div.select-container {
  padding: 0;
  width: 400px;
  display: flex;
  align-items: center;
}

div.brand-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 30% );
    gap: 30px;
  }

@media (max-width: 1250px) {
    div.brand-grid {
    grid-template-columns: repeat(auto-fill, 45% );
  }
}

@media (max-width: 750px) {
    div.brand-grid {
    grid-template-columns: repeat(auto-fill, 100% );
  }
}


div.qr-list-container {
  width: 100%;
  margin-top: 0.96rem;
}
</style>
