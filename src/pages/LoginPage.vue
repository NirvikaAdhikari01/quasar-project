<script setup>
import { ref } from 'vue';
import { useUserDetailsStore } from 'src/stores/userDetailsStore';
import { useRouter } from 'vue-router';

const store = useUserDetailsStore();
const router = useRouter();

const name = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  const success = await store.login(name.value, password.value, router);
  if (!success) {
    errorMessage.value = store.error;
  }
};
</script>

<template>
  <div class="max-w-sm mx-auto p-6 border border-gray-300 rounded-md shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
    <div>
      <input v-model="name" type="text" placeholder="Name" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
      <input v-model="password" type="password" placeholder="Password" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
      <button @click="handleLogin" class="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600">Login</button>
      <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
    </div>
  </div>
</template>
