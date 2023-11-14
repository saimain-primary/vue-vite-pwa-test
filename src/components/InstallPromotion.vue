<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Install App</v-card-title>
      <v-card-text>
        Add this app to your home screen for quick and easy access.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="emitInstallEvent"
          >Install</v-btn
        >
        <v-btn color="red darken-1" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
  <script setup>
import { ref, defineEmits } from "vue";

const dialog = ref(true);
const emit = defineEmits(["install"]);

const emitInstallEvent = () => {
  emit("install");
  dialog.value = false;
};

const close = () => {
  dialog.value = false;
};
</script>