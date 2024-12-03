import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { LocalStorage } from "quasar";

export const userDetails = defineStore('userdetails', () => {
  const details = JSON.parse(LocalStorage.getItem('userDetails')) || {};

  const name = ref('');
  const email = ref(details.email || '');
  const password = ref('');
  const confirmPassword = ref('');
  const isLoggedIn = ref(details.isLoggedIn || false);
  const isSubmitting = ref(false);
  const error = ref('');

  // Watch the isLoggedIn state and sync it to LocalStorage
  watch(isLoggedIn, (newVal) => {
    const updatedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    updatedDetails.isLoggedIn = newVal;
    LocalStorage.set('userDetails', JSON.stringify(updatedDetails));
  });

  const validateLogin = () => {
    if (!name.value || !password.value) {
      error.value = "All fields are required";
      return false;
    }

    const storedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    if (name.value === storedDetails.name && password.value === storedDetails.password) {
      error.value = 'Login successful!';
      return true;
    } else {
      error.value = 'Unmatched credentials';
      return false;
    }
  };

  const validateSignup = () => {
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match";
      return false;
    } else if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      error.value = "All fields are required";
      return false;
    }
    error.value = '';
    return true;
  };

  const login = (router) => {
    if (validateLogin()) {
      isSubmitting.value = true;
      setTimeout(() => {
        const storedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
        storedDetails.isLoggedIn = true;
        LocalStorage.set('userDetails', JSON.stringify(storedDetails));
        isLoggedIn.value = true;
        isSubmitting.value = false;
        router.push({ path: 'dashboard' });
      }, 1000);
    }
  };

  const signup = (router) => {
    if (validateSignup()) {
      isSubmitting.value = true;
      setTimeout(() => {
        const newDetails = {
          name: name.value,
          email: email.value,
          password: password.value,
          isLoggedIn: isLoggedIn.value
        };
        LocalStorage.set('userDetails', JSON.stringify(newDetails));
        isSubmitting.value = false;
        router.push({ path: 'login' });
      }, 1000);
    }
  };

  const logout = (router) => {
    isLoggedIn.value = false;
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    error.value = '';
    const details = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    details.isLoggedIn = false;
    LocalStorage.set('userDetails', JSON.stringify(details));
    router.push({ path: '/' });
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    isLoggedIn,
    isSubmitting,
    error,
    login,
    signup,
    logout
  };
});
