<script setup>
import { useUserDetailsStore } from 'src/stores/userDetailsStore';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserDetailsStore();
const $q = useQuasar();
const router = useRouter();

const logout = () => {
  $q.dialog({
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    store.logout();
    router.push('/');
  });
};
</script>

<template>
  <q-btn @click="logout" label="Logout" color="negative" />
</template>
