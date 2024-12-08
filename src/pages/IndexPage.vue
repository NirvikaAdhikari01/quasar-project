<template>
  <q-page class="flex flex-center bg-gradient-to-t min-h-screen from-gradientStart to-gradientEnd">
    <div class="relative grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 w-full px-4 sm:px-6 md:px-10">
      <div class="relative w-full pt-10" style="padding-top: 56.25%;">
        <q-img
          src="../assets/management.png"
          alt="something"
          class="absolute top-0 left-0 w-full h-full object-cover opacity-80 rounded-xl"
        />
      </div>
      <div class="flex flex-col space-y-5 items-center justify-center text-white sm:col-span-2 md:col-span-1 z-10">
        <span class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center">
          Task Management App
        </span>
        <div class="text-xl md:text-2xl text-center">
          <span>{{ typedSlogan }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mt-10" ref="aboutUsSection">
      <div
        class="flex items-center justify-center bg-gradient-to-t from-gradientStart to-gradientEnd h-40 sm:h-48 md:h-56 rounded-lg opacity-100 animate-slideInLeft"
      >
        <p class="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center p-4">
          We are a productivity-driven platform helping individuals and teams manage their tasks efficiently. Our goal is to make task management simple and effective.
        </p>
      </div>
      <div
        class="flex items-center justify-center bg-gradient-to-t from-gradientStart to-gradientEnd h-40 sm:h-48 md:h-56 rounded-lg opacity-100 animate-slideInLeft"
      >
        <p class="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center p-4">
          We are a productivity-driven platform helping individuals and teams manage their tasks efficiently. Our goal is to make task management simple and effective.
        </p>
      </div>
      <div
        class="flex items-center justify-center bg-gradient-to-t from-gradientStart to-gradientEnd h-40 sm:h-48 md:h-56 rounded-lg opacity-100 animate-slideInRight"
      >
        <p class="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center p-4">
          Our platform provides seamless collaboration and powerful tools to boost productivity. Join us in staying on track, achieving goals, and working together.
        </p>
      </div>
      <div
        class="flex items-center justify-center bg-gradient-to-t from-gradientStart to-gradientEnd h-40 sm:h-48 md:h-56 rounded-lg opacity-100 animate-slideInRight"
      >
        <p class="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center p-4">
          Our platform provides seamless collaboration and powerful tools to boost productivity. Join us in staying on track, achieving goals, and working together.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const slogans = [
  "Stay On Track, Every Task.",
  "Organize, Prioritize, Achieve.",
  "Productivity Starts Here."
];

const typedSlogan = ref('');
let currentIndex = 0;
let currentLetterIndex = 0;
let deleting = false;

const typeSpeed = 150;
const deleteSpeed = 100;
const changeSpeed = 3000;

const typeSlogan = () => {
  if (currentLetterIndex < slogans[currentIndex].length && !deleting) {
    typedSlogan.value += slogans[currentIndex].charAt(currentLetterIndex);
    currentLetterIndex++;
    setTimeout(typeSlogan, typeSpeed);
  } else if (currentLetterIndex === slogans[currentIndex].length && !deleting) {
    setTimeout(() => {
      deleting = true;
      setTimeout(deleteSlogan, changeSpeed);
    }, 1000);
  }
};

const deleteSlogan = () => {
  if (currentLetterIndex > 0 && deleting) {
    typedSlogan.value = typedSlogan.value.slice(0, currentLetterIndex - 1);
    currentLetterIndex--;
    setTimeout(deleteSlogan, deleteSpeed);
  } else if (currentLetterIndex === 0 && deleting) {
    currentIndex = (currentIndex + 1) % slogans.length;
    deleting = false;
    setTimeout(typeSlogan, 1000);
  }
};

onMounted(() => {
  typeSlogan();
});
</script>
