<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex space-between">
        <q-toolbar-title>
          Task Management App
        </q-toolbar-title>
        <div v-if="userdetails.isLoggedIn" class="flex space-between justify-center">
          <div>
             <q-btn label="dashboard" @click="router.push({'path':'dashboard'})" />
             <q-btn label="tasks" @click="router.push({'path':'taskpage'})"/>
          </div>
          <div>
            <q-btn label="logout" @click="userdetails.logout(router)" />
          </div>
        </div>
        <div v-else>
          <q-btn label="login" @click="router.push({ path: 'login' })" />
          <q-btn label="Signup" @click="router.push({ path: 'signup' })" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { userDetails } from 'src/stores/LoginRegistration';

const router = useRouter();
const userdetails = userDetails(); // Using Pinia store for user details
</script>
