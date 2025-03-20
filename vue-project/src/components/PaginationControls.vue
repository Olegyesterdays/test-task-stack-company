<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number
});
</script>

<template>
  <div class="btn">
    <button @click="$emit('previous')" :disabled="currentPage <= 1">{{ '<' }}</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('next')" :disabled="currentPage >= totalPages">{{ '>' }}</button>
  </div>
</template>

<style scoped>
.btn {
  margin: 12px 0 0 auto;
  
  span {
    margin: 0 8px;
  }
}
</style>
