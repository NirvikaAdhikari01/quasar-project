import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { LocalStorage } from "quasar";

export const useTasksStore = defineStore('taskDetails', () => {
  const details = JSON.parse(LocalStorage.getItem('taskDetails')) || {
    tasks: [],
    isCompleted: false,
  };
  const tasks = ref(details.tasks || []); // Reactive array for tasks
  const status = ref(details.isCompleted || false); // Task completion status
  const newTask = ref(''); // Input for adding a new task
  const error = ref(''); // Error messages
  const editingTask = ref(''); // For editing task description

  // Watcher to save tasks to LocalStorage whenever tasks change
  watch(tasks, () => {
    saveTasks(); // Save tasks to LocalStorage whenever tasks change
  }, { deep: true });

  // Add a new task
  const addTask = () => {
    if (newTask.value.trim() !== '') {
      tasks.value.push({
        id: Date.now(),
        description: newTask.value.trim(),
        isCompleted: false,
        isEditing: false, // Add an isEditing flag
      });
      newTask.value = ''; // Clear the input field
      error.value = ''; // Clear any previous error
    } else {
      error.value = 'The task cannot be empty';
    }
  };

  // Delete a task
  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  };

  // Save the task
  const saveTask = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.description = editingTask.value; // Update the task description
      task.isEditing = false; // Exit edit mode
      editingTask.value = ''; // Clear the editing field
    }
    saveTasks(); // Save tasks to LocalStorage
  };

  // Toggle edit mode for a task
  const toggleEdit = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.isEditing = !task.isEditing;
      if (task.isEditing) {
        editingTask.value = task.description; // Set initial value for editing
      }
    }
  };

  // Cancel editing a task
  const cancelEdit = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.isEditing = false;
      editingTask.value = ''; // Clear the editing field
    }
  };

  // Save tasks to LocalStorage
  const saveTasks = () => {
    LocalStorage.set('taskDetails', JSON.stringify({ tasks: tasks.value, isCompleted: status.value }));
  };

  return {
    tasks,
    status,
    newTask,
    error,
    addTask,
    deleteTask,
    saveTask,
    toggleEdit,
    cancelEdit,
    editingTask,
  };
});
