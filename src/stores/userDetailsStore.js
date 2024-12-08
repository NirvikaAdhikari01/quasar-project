import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { LocalStorage } from "quasar";

export const useUserDetailsStore = defineStore('userdetails', () => {
  const details = JSON.parse(LocalStorage.getItem('userDetails')) || {};

  const name = ref('');
  const email = ref(details.email || '');
  const password = ref('');
  const confirmPassword = ref('');
  const isLoggedIn = ref(details.isLoggedIn || false);
  const isSubmitting = ref(false);
  const error = ref('');
  const currentUser = ref(details);

  // Watch for login changes and sync with LocalStorage
  watch(isLoggedIn, (newVal) => {
    const updatedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    updatedDetails.isLoggedIn = newVal;
    LocalStorage.set('userDetails', JSON.stringify(updatedDetails));
  });

  // Validate login
  const validateLogin = (name, password) => {
    if (!name || !password) {
      error.value = "All fields are required";
      return false;
    }
    const storedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    if (name === storedDetails.name && password === storedDetails.password) {
      error.value = ''; // Clear error if login is successful
      return true;
    } else {
      error.value = 'Unmatched credentials';
      return false;
    }
  };

  // Handle login
  const login = async (name, password, router) => {
    if (validateLogin(name, password)) {
      isSubmitting.value = true;
      setTimeout(() => {
        const storedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
        storedDetails.isLoggedIn = true;
        LocalStorage.set('userDetails', JSON.stringify(storedDetails));  // Sync to LocalStorage
        isLoggedIn.value = true;
        isSubmitting.value = false;
        router.push({ path: '/dashboard' });
      }, 1000);

      return true;
    } else {
      isSubmitting.value = false;
      return false;
    }
  };

  // Handle signup
  const signup = (router, name, email, password, confirmPassword) => {
    if (validateSignup(name, email, password, confirmPassword)) {
      isSubmitting.value = true;
      setTimeout(() => {
        const newDetails = {
          name,
          email,
          password,
          isLoggedIn: false,
          tasks: []
        };
        LocalStorage.set('userDetails', JSON.stringify(newDetails));  // Sync to LocalStorage
        isSubmitting.value = false;
        router.push({ path: '/login' });
      }, 1000);
    }
  };

  // Validate signup (checking for empty fields and password match)
  const validateSignup = (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      error.value = "Passwords do not match";
      return false;
    } else if (!name || !email || !password || !confirmPassword) {
      error.value = "All fields are required";
      return false;
    }
    error.value = ''; // Clear error if validation passes
    return true;
  };

  // Logout function
  const logout = (router) => {
    isLoggedIn.value = false; // Set isLoggedIn to false
    name.value = ''; // Clear user details
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    error.value = ''; // Clear any error messages

    const details = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    details.isLoggedIn = false; // Set isLoggedIn to false in LocalStorage
    LocalStorage.set('userDetails', JSON.stringify(details)); // Sync to LocalStorage

    router.push({ path: '/' }); // Redirect to home page (or login page)
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
    logout, // Ensure logout is returned
    currentUser
  };
});
