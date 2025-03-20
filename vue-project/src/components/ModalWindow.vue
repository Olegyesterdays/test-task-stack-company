<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const store = useStore();

const formData = ref({
  id: '',
  name: '',
  director: '',
  phoneNumber: ''
});

function closeModal() {
  emit('close');
}

function onSubmit() {
  if (!formData.value.name.trim()) {
    alert('Поле "Название" обязательно для заполнения');
    return;
  }

  store.dispatch('companyModule/addCompany', { company: { ...formData.value } });

  formData.value = {
    id: '',
    name: '',
    director: '',
    phoneNumber: ''
  };

  closeModal();
}
</script>

<template>
  <div class="modal-backdrop" v-if="show">
    <div class="modal-content">
      <h2>Добавить новую компанию</h2>
      <form @submit.prevent="onSubmit">
        <label>
          ID:
          <input v-model="formData.id" type="text" />
        </label>

        <label>
          Название:
          <input v-model="formData.name" type="text" />
        </label>

        <label>
          ФИО директора:
          <input v-model="formData.director" type="text" />
        </label>

        <label>
          Телефон:
          <input v-model="formData.phoneNumber" type="text" />
        </label>

        <div class="modal-buttons">
          <button type="button" @click="closeModal">Отмена</button>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background-color: #fff;
    padding: 16px 24px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;

    h2 {
      margin-top: 0;
      margin-bottom: 16px;
    }

    form {
      label {
        display: block;
        margin-bottom: 8px;
      }

      input {
        display: block;
        margin-top: 4px;
        margin-bottom: 12px;
        width: 100%;
        padding: 4px;
      }
    }

    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      button {
        padding: 8px 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
