<script setup>
import { useTasksStore } from 'src/stores/TasksStore';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const store = useTasksStore();
const taskDescription = ref('');
const category = ref('Not Started');
const $q = useQuasar();

const isLoading = ref(false);

const addTask = async () => {
  if (!taskDescription.value.trim()) {

    $q.notify({
      type: 'negative',
      message: 'Task description cannot be empty!',
    });
    return;
  }

  isLoading.value = true;


  store.addTask(taskDescription.value, category.value);


  if (store.errorMessage.value) {
    $q.notify({
      type: 'negative',
      message: store.errorMessage.value,
    });
  } else if (store.successMessage.value) {
    $q.notify({
      type: 'positive',
      message: store.successMessage.value,
    });
  }


  taskDescription.value = '';
  category.value = 'Not Started';
  isLoading.value = false;


  setTimeout(() => {
    document.querySelector('input').focus();
  }, 100);
};
</script>

<template>
  <div class="max-w-sm mx-auto p-6 border border-gray-300 rounded-md shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Create Task</h2>
    <div>
      <input
        v-model="taskDescription"
        type="text"
        placeholder="Enter your Task"
        class="w-full p-3 mb-4 border border-gray-300 rounded-md"
        :disabled="isLoading"
      />
      <select v-model="category" class="w-full p-3 mb-4 border border-gray-300 rounded-md" :disabled="isLoading">
        <option value="Not Started">Not Started</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        @click="addTask"
        class="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        :disabled="isLoading"
      >
        <span v-if="isLoading">Adding...</span>
        <span v-else>Add Task</span>
      </button>
    </div>
  </div>
</template>
