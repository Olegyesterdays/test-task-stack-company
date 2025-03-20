<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update-search', 'open-modal']);

const localQuery = ref('');

function onInput() {
  emit('update-search', localQuery.value);
}
</script>

<template>
  <div class="header">
    <input
      v-model="localQuery"
      @input="onInput"
      type="text"
      placeholder="Поиск по ФИО директора..."
      class="search-input"
    />
    <button @click="$emit('open-modal')">Добавить компанию</button>
  </div>
</template>
