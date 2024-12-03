<script setup>
import { useTasksStore } from 'src/stores/TasksStore';
const tasks=useTasksStore()
</script>
<template>
  <div v-for="task in tasks.tasks">
    {{ task.description }}
  </div>
</template>




