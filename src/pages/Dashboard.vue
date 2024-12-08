<script setup>
import { useTasksStore } from 'src/stores/TasksStore';
import { ref, computed } from 'vue';

const store = useTasksStore();
const filterCategory = ref('All');

const filteredTasks = computed(() => {
  if (filterCategory.value === 'All') {
    return store.getTasks.value;
  }
  return store.getTasks.value.filter(task => task.category === filterCategory.value);
});
</script>

<template>
  <div class="max-w-sm mx-auto p-6 border border-gray-300 rounded-md shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Your Tasks</h2>


    <div class="mb-4">
      <select v-model="filterCategory" class="w-full p-3 border border-gray-300 rounded-md">
        <option value="All">All</option>
        <option value="Not Started">Not Started</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

 
    <ul>
      <li v-for="task in filteredTasks" :key="task.id" class="p-4 border-b border-gray-300">
        <div class="flex justify-between items-center">
          <div>
            <strong>{{ task.description }}</strong>
            <p class="text-sm text-gray-500">Category: {{ task.category }}</p>
          </div>
          <span :class="{
            'text-green-500': task.isCompleted,
            'text-yellow-500': task.category === 'Ongoing',
            'text-red-500': task.category === 'Not Started'
          }">
            {{ task.isCompleted ? 'Completed' : task.category }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
