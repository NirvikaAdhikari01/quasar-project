<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar class="elevate-0 grid max-auto sm:flex bg-[#fafaff] top-0 left-0 h-16 sm:h-20">
        <q-btn flat round dense icon="menu" @click="toggleDrawer" v-if="userdetails.isLoggedIn" />
        <q-toolbar-title class="font-bold text-black text-center lg:text-4xl md:text-3xl sm:text-2xl">
          Task Management App
        </q-toolbar-title>


        <div v-if="userdetails.isLoggedIn" class="flex sm:justify-start md:justify-between">
          <div>
            <q-btn label="Logout" @click="handleLogout" class="text-black rounded-full bg-slate-200 hover:bg-slate-50 transition-all duration-300 border-4 border-gray-900" />
          </div>
        </div>

        <div v-else class="flex space-x-5 justify-center">
          <q-btn label="Login" @click="router.push({ path: 'login' })" class="text-black rounded-full bg-slate-200 hover:bg-slate-50 transition-all duration-300 border-4 border-gray-900" />
          <q-btn label="Signup" @click="router.push({ path: 'signup' })" class="text-black rounded-full bg-slate-200 hover:bg-slate-50 transition-all duration-300 border-4 border-gray-900" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="userdetails.isLoggedIn"
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list class="pt-4">
          <q-item clickable v-ripple @click="router.push({ path: 'dashboard' })">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <span>Dashboard</span>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="router.push({ path: 'taskpage' })">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              <span>Tasks</span>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="router.push({ path: 'addtask' })">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              <span>Create Task</span>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="handleLogout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <span>Logout</span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useUserDetailsStore } from 'src/stores/userDetailsStore';
const drawer = ref(false);
const router = useRouter();
const userdetails = useUserDetailsStore();


watch(
  () => userdetails.isLoggedIn,
  (isLoggedIn) => {
    drawer.value = isLoggedIn;
  },
);


const toggleDrawer = () => {
  drawer.value = !drawer.value;
};


const handleLogout = () => {
  userdetails.logout(router);
};
</script>

<style scoped>

</style>
