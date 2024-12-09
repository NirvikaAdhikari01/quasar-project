import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { LocalStorage } from "quasar";
import { Notify } from "quasar";

export const useUserDetailsStore = defineStore('userdetails', () => {
  const details = JSON.parse(LocalStorage.getItem('userDetails')) || {};
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const isLoggedIn = ref(details.isLoggedIn || false);
  const isSubmitting = ref(false);
  const error = ref('');
  const currentUser = ref(details);
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

  const signup = (router) => {
    if (validateSignup()) {
      isSubmitting.value = true;
      setTimeout(() => {
        const users = JSON.parse(LocalStorage.getItem('users')) || [];
        if (users.some(user => user.email === email.value)) {
          error.value = 'Email is already registered';
          isSubmitting.value = false;
          return;
        }
        const newDetails = {
          name: name.value,
          email: email.value,
          password: password.value,
          isLoggedIn: false,
          tasks: []
        };
        users.push(newDetails);
        LocalStorage.set('users', JSON.stringify(users));
        isSubmitting.value = false;
        email.value=''
        password.value=''
        Notify.create({ message: 'Successfully Signed Up', color: 'red', timeout: 2000 });
        router.push({ path: '/login' });
      }, 1000);
    }
  };

  watch(isLoggedIn, (newVal) => {
    const updatedDetails = JSON.parse(LocalStorage.getItem('userDetails')) || {};
    updatedDetails.isLoggedIn = newVal;
    LocalStorage.set('userDetails', JSON.stringify(updatedDetails));
  });

  const validateLogin = () => {
    if (!email.value || !password.value) {
      error.value = "All fields are required";
      return false;
    }

    const users = JSON.parse(LocalStorage.getItem('users')) || [];
    const foundUser = users.find(
      (user) => user.email === email.value && user.password === password.value
    );

    if (foundUser) {
      error.value = '';
      return true;
    } else {
      error.value = 'Unmatched credentials';
      return false;
    }
  };

  const login = async (router) => {
    if (validateLogin()) {
      isSubmitting.value = true;
      setTimeout(() => {
        const users = JSON.parse(LocalStorage.getItem('users')) || [];
        const loggedInUser = users.find(
          (user) => user.email === email.value && user.password === password.value
        );
        if (loggedInUser) {
          loggedInUser.isLoggedIn = true;
          const updatedUsers = users.map((user) =>
            user.email === loggedInUser.email ? loggedInUser : user
          );
          LocalStorage.set('users', JSON.stringify(updatedUsers));
          currentUser.value = loggedInUser;
          LocalStorage.set('userDetails', JSON.stringify(loggedInUser));
          isLoggedIn.value = true;
          isSubmitting.value = false;
          Notify.create({ message: 'Successfully Logged in', color: 'red', timeout: 2000 });
          router.push({ path: '/dashboard' });
        } else {
          error.value = "Login failed. User not found.";
          isSubmitting.value = false;
        }
      }, 1000);
    } else {
      isSubmitting.value = false;
    }
  };

  const logout = (router) => {
    const users = JSON.parse(LocalStorage.getItem('users')) || [];

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.value.email) {
        user.isLoggedIn = false;
      }
      return user;
    });

    LocalStorage.set('users', JSON.stringify(updatedUsers));
    LocalStorage.remove('userDetails');

    currentUser.value = {};
    isLoggedIn.value = false;
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    error.value = '';
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
    logout,
    currentUser
  };
});
