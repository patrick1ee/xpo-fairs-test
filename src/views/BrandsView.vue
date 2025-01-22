<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usebrandStore } from '@/stores/brandStore'
import { api } from '@/api'

import type { Brand } from '@/api/types'

const router = useRouter()

const brandStore = usebrandStore()

const { brands } = storeToRefs(brandStore)
const { fetchBrands } = brandStore

const searchText = ref('')

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
      <div class="view-content container-fluid">
        <div class="d-flex flex-row">
          <div style="flex: 1">
            <h1 class="page-title page-title-fixed">Keypins</h1>
          </div>
        </div>
        <div  class="row search-select-container">
          <div class="search-container col-xl-6 col-lg-4 d-sm-block d-none">
            <SearchInput
              v-model="searchText"
              placeholder="Search your QR Codes..."/>
          </div>
        </div>
        <div class="row">
          <div class="qr-list-container">
            <div
                v-for="brand in (brands as Brand[])"
                :key="brand.BrandID"
                class="qr-grid-item-container"
                >
                    <h1>{{ brand.brand_name }}</h1>
                </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">

h1.page-title {
  color: var(--color-nearly-black);
  font-family: Inter;
  font-weight: 800;
  width: 100%;
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
}

.create-qr-button-icon {
  margin-right: 0.5rem;
}
div.qr-list-container {
  width: 100%;
  margin-top: 0.96rem;
}
</style>
