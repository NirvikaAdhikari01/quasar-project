<script setup>
import { userDetails } from 'src/stores/LoginRegistration';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
const router=useRouter()
const userdetails=userDetails()
watch(()=>userdetails.name,(newVal,oldVal)=>{
  console.log(`Name changed from ${oldVal} to ${newVal}`);
})
watch(()=>userdetails.isLoggedIn,(newVal,oldVal)=>{
  console.log(`value changed from ${oldVal} to ${newVal}`)
})
</script>
<template>
<div class="flex flex-col justify-between items-center mt-[100px] space-y-10">
  <div>
    Registration Page
  </div>
  <div class="flex flex-col justify-between items-center">
    <q-input placeholder="Enter your name" v-model="userdetails.name"/>
    <q-input placeholder="Enter your email" v-model="userdetails.email"/>
    <q-input placeholder="Enter your Password" v-model="userdetails.password" />
    <q-input placeholder="Confirm your Password" v-model="userdetails.confirmPassword"/>
  </div>
  <div v-if="userdetails.error">
   {{ userdetails.error }}
  </div>
  <div>
    <q-btn label="Sign Up" @click="userdetails.signup(router)"/>
  </div>
</div>
</template>
