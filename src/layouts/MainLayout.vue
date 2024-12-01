<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex space-between">
        <q-toolbar-title>
         Task Management App
        </q-toolbar-title>
         <div>
          <q-btn label="login" @click="router.push({'path':'login'})" />
          <q-btn label="Signup" @click="router.push({'path':'signup'})"/>
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
const router=useRouter()


</script>
