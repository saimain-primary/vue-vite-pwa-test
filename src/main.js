/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    alert("need refresh");
  },
  onOfflineReady() {
    alert("offline ready");
  },
});

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event for later (to show the prompt)
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  //   showInstallPromotion();
  alert("install pwa please");
});

console.log(deferredPrompt);

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
