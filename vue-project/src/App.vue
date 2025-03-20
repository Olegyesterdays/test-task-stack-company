<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SearchBar from './components/SearchBar.vue';
import CompaniesTable from './components/CompaniesTable.vue';
import PaginationControls from './components/PaginationControls.vue';
import ModalWindow from './components/ModalWindow.vue';

const store = useStore();
const showModal = ref(false);
const localSearchQuery = ref('');

function updateSearchQuery(query) {
  localSearchQuery.value = query;
  store.commit('companyModule/setSearchQuery', query);
  store.commit('companyModule/setCurrentPage', 1);
}

const companies = computed(() => store.getters['companyModule/getCompaniesInRange']);
const currentPage = computed(() => store.getters['companyModule/getCurrentPage']);
const totalPages = computed(() => store.getters['companyModule/getTotalPages']);
const sortBy = computed(() => store.state.companyModule.sortBy);
const sortOrder = computed(() => store.state.companyModule.sortOrder);

function sortColumn(column) {
  store.commit('companyModule/setSort', column);
  store.commit('companyModule/setCurrentPage', 1);
}

function deleteCompany(id) {
  store.dispatch('companyModule/deleteCompany', { id });
  alert('Компания удалена');
}

function nextGroup() {
  store.dispatch('companyModule/nextGroup');
}

function previousGroup() {
  store.dispatch('companyModule/previousGroup');
}
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <SearchBar
          :searchQuery="localSearchQuery"
          @update-search="updateSearchQuery"
          @open-modal="showModal = true"
        />

        <ModalWindow :show="showModal" @close="showModal = false" />
      </div>

      <CompaniesTable
        :companies="companies"
        :sortBy="sortBy"
        :sortOrder="sortOrder"
        @sort-column="sortColumn"
        @delete-company="deleteCompany"
      />

      <PaginationControls
        class="pagination"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @previous="previousGroup"
        @next="nextGroup"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pagination {
      margin-left: auto;
    }
  }
}
</style>
