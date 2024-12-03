<script setup>
import { useTasksStore } from 'src/stores/TasksStore';
const allTasks = useTasksStore();
</script>

<template>
  <h1>Dashboard</h1>
  <div>
    <input placeholder="Enter Task" v-model="allTasks.newTask" />
    <q-btn @click="allTasks.addTask" label="Save" />
  </div>

  <ul>
    <li v-for="task in allTasks.tasks" :key="task.id">
      <div v-if="!task.isEditing">{{ task.description }}</div>
      <div v-if="task.isEditing">
        <input v-model="allTasks.editingTask" placeholder="Enter edited task" />
      </div>
      <q-icon name="delete" @click="allTasks.deleteTask(task.id)" />

      <q-icon name="edit" @click="allTasks.toggleEdit(task.id)" />

      <q-btn v-if="task.isEditing" label="Save" @click="allTasks.saveTask(task.id)" />
      <q-btn v-if="task.isEditing" label="Cancel" @click="allTasks.cancelEdit(task.id)" />
    </li>
  </ul>
</template>
