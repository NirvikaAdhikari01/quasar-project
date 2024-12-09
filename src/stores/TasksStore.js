import { ref, watch, computed } from 'vue';
import { LocalStorage, Notify } from 'quasar';

export const useTasksStore = () => {
  const tasks = ref([]);
  const filterCategory = ref('All');
  const errorMessage = ref('');
  const successMessage = ref('');
  const taskToDelete = ref(null);
  const isEditDialogVisible = ref(false);
  const taskToEdit = ref(null);
  const updatedDescription = ref('');
  const updatedCategory = ref('');


  const storedTasks = LocalStorage.getItem('tasks');
  tasks.value = Array.isArray(storedTasks) ? storedTasks : [];


  watch(
    tasks,
    (newTasks) => {
      LocalStorage.set('tasks', newTasks);
    },
    { deep: true }
  );


  const getTasks = computed(() => {
    if (filterCategory.value === 'All') return tasks.value;
    return tasks.value.filter((task) => task.category === filterCategory.value);
  });

  const addTask = (taskDescription, category = 'Not Started') => {
    errorMessage.value = '';
    successMessage.value = '';

    if (!taskDescription.trim()) {
      errorMessage.value = 'Task description is required';
      return;
    }

    const newTask = {
      id: Date.now(),
      description: taskDescription,
      category,
      isCompleted: false,
    };

    tasks.value.push(newTask);
    successMessage.value = 'Task added successfully!';
    Notify.create({ message: successMessage.value, color: 'green', timeout: 2000 });
  };


  const openEditDialog = (taskId) => {
    const task = tasks.value.find((task) => task.id === taskId);
    if (task) {
      taskToEdit.value = task;
      updatedDescription.value = task.description;
      updatedCategory.value = task.category;
      isEditDialogVisible.value = true;
    }
  };


  const closeEditDialog = () => {
    isEditDialogVisible.value = false;
    updatedDescription.value = '';
    updatedCategory.value = '';
  };


  const saveEditedTask = () => {
    if (updatedDescription.value.trim() && updatedCategory.value.trim()) {
      const task = taskToEdit.value;
      if (task) {
        task.description = updatedDescription.value;
        task.category = updatedCategory.value;
        successMessage.value = 'Task updated successfully!';
        Notify.create({ message: successMessage.value, color: 'blue', timeout: 2000 });
        closeEditDialog();
      }
    } else {
      errorMessage.value = 'Both description and category are required!';
    }
  };


  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
    Notify.create({ message: 'Task deleted successfully!', color: 'red', timeout: 2000 });
  };


  const updateCategory = (taskId, newCategory) => {
    const task = tasks.value.find((task) => task.id === taskId);
    if (task) {
      task.category = newCategory;
      Notify.create({ message: 'Category updated!', color: 'blue', timeout: 2000 });
    }
  };

  return {
    tasks,
    filterCategory,
    errorMessage,
    successMessage,
    getTasks,
    addTask,
    openEditDialog,
    closeEditDialog,
    saveEditedTask,
    deleteTask,
    updateCategory,
    isEditDialogVisible,
    updatedDescription,
    updatedCategory,
    taskToEdit,
  };
};
