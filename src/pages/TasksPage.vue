<script setup>
import { useTasksStore } from 'src/stores/TasksStore';
import { ref, computed } from 'vue';
import { Dialog } from 'quasar';


const store = useTasksStore();


const filterCategory = ref('All');


const tasks = computed(() => store.getTasks.value);


const filteredTasks = computed(() => {
  if (!Array.isArray(tasks.value)) {
    return [];
  }
  if (filterCategory.value === 'All') {
    return tasks.value;
  }
  return tasks.value.filter(task => task.category === filterCategory.value);
});


const deleteTask = (taskId) => {
  Dialog.create({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this task?',
    ok: { label: 'Yes', color: 'negative' },
    cancel: { label: 'No' }
  }).onOk(() => {
    store.deleteTask(taskId);
  });
};


const editTask = (taskId) => {
  const task = store.getTasks.value.find(task => task.id === taskId);
  if (task) {
    const updatedDescription = prompt('Edit Task Description:', task.description);
    const updatedCategory = prompt('Edit Task Category:', task.description);



    if (updatedDescription && updatedCategory) {
      store.editTask(taskId, updatedDescription, updatedCategory);
    }
  }
};


const updateCategory = (taskId, newCategory) => {
  store.updateCategory(taskId, newCategory);
};
</script>

<template>
  <div class="max-w-sm mx-auto p-6 border border-gray-300 rounded-md shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Your Tasks</h2>


    <div class="mb-4 flex justify-around">
      <button @click="filterCategory = 'All'" class="p-2 rounded bg-blue-500 text-white">ALL</button>
      <button @click="filterCategory = 'Ongoing'" class="p-2 rounded bg-blue-500 text-white">ONGOING</button>
      <button @click="filterCategory = 'Completed'" class="p-2 rounded bg-blue-500 text-white">COMPLETED</button>
      <button @click="filterCategory = 'Not Started'" class="p-2 rounded bg-blue-500 text-white">NOT STARTED</button>
    </div>


    <ul>
      <li v-for="task in filteredTasks" :key="task?.id" class="p-4 border-b border-gray-300">
        <div class="flex justify-between items-center">
          <div>
            <strong>{{ task?.description }}</strong>
            <p class="text-sm text-gray-500">Category: {{ task?.category }}</p>
          </div>
          <span :class="{
            'text-green-500': task?.isCompleted,
            'text-yellow-500': task?.category === 'Ongoing',
            'text-red-500': task?.category === 'Not Started'
          }">
            {{ task?.isCompleted ? 'Completed' : task?.category }}
          </span>


          <div class="flex space-x-2">
            <button @click="editTask(task?.id)" class="bg-yellow-500 text-white p-1 rounded-md hover:bg-yellow-600">
              Edit
            </button>
            <button @click="deleteTask(task?.id)" class="bg-red-500 text-white p-1 rounded-md hover:bg-red-600">
              Delete
            </button>
            <select v-model="task.category" @change="updateCategory(task.id, task.category)" class="p-1 rounded bg-gray-200">
              <option value="Not Started">Not Started</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </li>
    </ul>


    <p v-if="filteredTasks.length === 0" class="text-center text-gray-500 mt-4">No tasks available</p>


    <div v-if="store.errorMessage" class="text-red-500 text-center mt-4">
      {{ store.errorMessage }}
    </div>
    <div v-if="store.successMessage" class="text-green-500 text-center mt-4">
      {{ store.successMessage }}
    </div>
  </div>
</template>
