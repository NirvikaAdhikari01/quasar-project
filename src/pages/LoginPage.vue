<script setup>
import { userDetails } from 'src/stores/LoginRegistration';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
const userdetails=userDetails()
watch(()=>userdetails.isLoggedIn,(newVal,oldVal)=>{
  console.log(`value changed from ${oldVal} to ${newVal}`)
})
</script>
<template>
<div class="flex flex-col justify-between items-center mt-[100px]">
  <div>
    Login Page
  </div>
  <div class="flex flex-col justify-between items-center">
    <q-input placeholder="Enter your name" v-model="userdetails.name"/>
    <q-input placeholder="Enter your Password" v-model="userdetails.password" />
  </div>
  <div v-if="userdetails.error">
   {{ userdetails.error }}
  </div>
  <div>
    <q-btn label="Login" @click="userdetails.login(router)"/>
  </div>
</div>
</template>
