<script setup>
defineProps({
  companies: Array,
  sortBy: String,
  sortOrder: String
});

const emit = defineEmits(['sort-column']);

function onSort(column) {
  emit('sort-column', column);
}
</script>

<template>
  <div class="table-content">
    <table class="table">
      <thead>
        <tr>
          <th @click="onSort('name')" style="cursor: pointer">
            Название
            <span v-if="sortBy === 'name'">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
          <th @click="onSort('director')" style="cursor: pointer">
            ФИО директора
            <span v-if="sortBy === 'director'">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
          <th>Номер телефона</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, director, phoneNumber } in companies" :key="id">
          <td>{{ name }}</td>
          <td>{{ director }}</td>
          <td>{{ phoneNumber }}</td>
          <td>
            <button @click="$emit('delete-company', id)">
              <span class="mdi mdi-close" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-content {
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  .table {
    min-width: 500px;
    border: 1px solid #ccc;
    border-collapse: collapse;
    width: 100%;

    th,
    td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
      user-select: none;
    }
  }
}
</style>
