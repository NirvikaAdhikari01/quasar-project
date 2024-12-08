<script setup>
import { ref } from 'vue';
import { useUserDetailsStore } from 'src/stores/userDetailsStore';
import { useRouter } from 'vue-router';

const store = useUserDetailsStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const signup = () => {
  // Pass values to the store's signup method
  store.signup(router, name.value, email.value, password.value, confirmPassword.value);
};
</script>

<template>
  <div class="max-w-sm mx-auto p-6 border border-gray-300 rounded-md shadow-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    <input v-model="name" type="text" placeholder="Name" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
    <input v-model="email" type="email" placeholder="Email" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
    <input v-model="password" type="password" placeholder="Password" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full p-3 mb-4 border border-gray-300 rounded-md" />
    <button @click="signup" :disabled="store.isSubmitting" class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Sign Up
    </button>
    <p v-if="store.error" class="text-red-500 mt-4 text-center">{{ store.error }}</p>
  </div>
</template>
