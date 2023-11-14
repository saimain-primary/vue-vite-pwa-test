<template>
  <v-app>
    <!-- Your app's main content goes here -->
    <router-view/>
    <!-- PWA Install Prompt Component -->
    <install-promotion
      v-if="showInstallPrompt"
      @install="installPWA"
    ></install-promotion>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InstallPromotion from "./components/InstallPromotion.vue";

// State for showing or hiding the install prompt
const showInstallPrompt = ref(false);

// This variable will hold the event from 'beforeinstallprompt'
let deferredPrompt;

onMounted(() => {
  // Listen for the 'beforeinstallprompt' event
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    // Save the event for later use
    deferredPrompt = e;
    // Show our own install prompt UI
    showInstallPrompt.value = true;
  });

  // Listen for the 'appinstalled' event
  window.addEventListener("appinstalled", () => {
    // Hide our install prompt UI as the app is already installed
    showInstallPrompt.value = false;
  });
});

// Function to handle the installation process
const installPWA = async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We no longer need the prompt, clear it
    deferredPrompt = null;
    // Hide our install prompt UI
    showInstallPrompt.value = false;
  }
};
</script>