<script setup>
import { userDetails } from 'src/stores/LoginRegistration';
const userdetails=userDetails()
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
    <q-btn label="Login" @click="userdetails.login"/>
  </div>
</div>
</template>
