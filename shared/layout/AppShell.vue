<script setup lang="ts">
import AppSidebar from "./AppSidebar.vue";
import AppTopbar from "./AppTopbar.vue";
</script>

<template>
  <div class="flex h-screen overflow-hidden" style="background: var(--flux-bg); color: var(--flux-fg)">
    <AppSidebar />


    <div class="flex flex-col flex-1 overflow-hidden">
      <AppTopbar />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
