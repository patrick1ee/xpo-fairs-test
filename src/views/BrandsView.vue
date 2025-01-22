<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
  if (searchText.value.length === 0) await fetchBrands()
  else await searchBrand(searchText.value)
}

/* function getVisibleBrands () {
  let visibleSubProfiles = subProfiles.value
  if (currentTab.value === 1) visibleSubProfiles = subProfiles.value.filter((sp: ListSubProfile) => sp.active)
  else if (currentTab.value === 2) visibleSubProfiles = subProfiles.value.filter((sp: ListSubProfile) => !sp.active)

  if (searchText.value.length > 0) visibleSubProfiles = visibleSubProfiles.filter((sp: ListSubProfile) => sp.label.toLowerCase().includes(searchText.value.toLowerCase()))
  if (sortBy.value === 'Newest') return visibleSubProfiles.sort(function (a: ListSubProfile, b: ListSubProfile) { return b.id.localeCompare(a.id) })
  else if (sortBy.value === 'A-Z') return visibleSubProfiles.sort(function (a: ListSubProfile, b: ListSubProfile) { return a.label.localeCompare(b.label) })
  return visibleSubProfiles
} */

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
                v-for="brand in (brands as Brand[])"
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
  color: var(--color-nearly-black);
  font-family: Inter;
  font-weight: 800;
  text-align: left;
  margin: 0;
}

h1.page-title-fixed{
  font-size: 30px;
  line-height: 38px; /* 126.667% */
}

h1.page-title-scrolling{
  font-size: 20px;
  line-height: 10px; /* 100% */
  margin: 0;
}

div.top-bar-scroll {
  position: sticky;
  top: 0;
  z-index: 1;
  width: calc(100% + 2 * var(--main-padding));
  margin: 0 0 0 calc(-1 * var(--main-padding));
  padding: 10px var(--main-padding) 10px var(--main-padding);
  background-color: #FFF;
  box-shadow: 0px 10px 10px -15px #111;
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
div.qr-list-container {
  width: 100%;
  margin-top: 0.96rem;
}
</style>
