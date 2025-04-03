<template>
  <div
    class="flex h-screen w-full h-full bg-gradient-to-b from-[#BFDCFD] to-[#FDFCFF] gap-30px"
  >
    <!-- Left Sidebar -->
    <AppSidebar />

    <main class="flex-1 overflow-auto">
      <Users />
    </main>
  </div>
</template>

<script>
import AppSidebar from "./components/AppSidebar.vue";
import Users from "./components/Users.vue";

export default {
  components: {
    AppSidebar,
    Users,
  },
};
</script>

<style>
#app> div {
  padding: 30px;
}
html, body {
  overflow: hidden;
  overscroll-behavior: contain;
  touch-action: none;
}
.gap-30px {
  gap: 30px;
}
main {
  border-radius: 20px;
}
@media (max-width: 768px) {
  #app> div {
    padding: 10px;
    padding-top: 60px;
  }
}
</style>