<template>
  <div class="dashboard-container" @touchstart="startSwipe" @touchend="endSwipe">
    <div :class="['sidemenu', { 'sidemenu-hidden': !isMenuVisible && isMobile }]">
      <div class="sidemenu-logo-container">
        <img src="@/assets/logo1.png" alt="Pappays Logo" class="logo" height="75" />
        <div>Pappays</div>
      </div>
      <div class="hor-divider"></div>
	<div class="flex items-center justify-between top-head">
        <!-- Logo and Pappays Span (Aligned to Start) -->
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center rounded-full">
            <img src="@/assets/logo.svg" width="44.82px" height="44.82px" alt="Logo" />
          </div>
          <span class="text-xl font-medium text-gray-800">Pappays</span>
        </div>

        <div class="flex flex-row top-head-end">
          <!-- Mobile Toggle Button (Aligned to End) -->
          <div class="flex items-center justify-center button-div">
            <button @click="mobileOpen = !mobileOpen" class="md:hidden text-gray-800 button">
              <Icon :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
      <div class="sidemenu-list">
        <div>
          <img src="@/assets/icons/dashboard.png" alt="Dashboard Icon" />
          <div>Dashbaord</div>
        </div>
        <div>
          <img src="@/assets/icons/pp-heasaplar.png" alt="PP Heasaplar Icon" />
          <div>PP Heasaplar</div>
        </div>
        <div>
          <img src="@/assets/icons/pp-sorunlular.png" alt="PP Sorunlular Icon" />
          <div>PP Sorunlular</div>
        </div>
        <div>
          <img src="@/assets/icons/sss.png" alt="SSS Icon" />
          <div>SSS</div>
        </div>
        <div>
          <img src="@/assets/icons/pp-heasaplar.png" alt="PP Heasaplar Icon" />
          <div>PP Heasaplar</div>
        </div>
        <div>
          <img src="@/assets/icons/pp-sorunlular.png" alt="PP Sorunlular Icon" />
          <div>PP Sorunlular</div>
        </div>
        <div>
          <img src="@/assets/icons/sss.png" alt="SSS Icon" />
          <div>SSS</div>
        </div>
        <div>
          <img src="@/assets/icons/pp-heasaplar.png" alt="PP Heasaplar Icon" />
          <div>PP Heasaplar</div>
        </div>
        <div>
          <img src="@/assets/icons/pp-sorunlular.png" alt="PP Sorunlular Icon" />
          <div>PP Sorunlular</div>
        </div>
        <div>
          <img src="@/assets/icons/sss.png" alt="SSS Icon" />
          <div>SSS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      isMenuVisible: false,
      startX: 0,
      isMobile: window.innerWidth <= 768
    };
  },
  methods: {
    startSwipe(event) {
      if (!this.isMobile) return;
      this.startX = event.touches[0].clientX;
    },
    endSwipe(event) {
      if (!this.isMobile) return;
      const endX = event.changedTouches[0].clientX;
      const diffX = endX - this.startX;

      if (Math.abs(diffX) > 50) {
        event.preventDefault();
        event.stopPropagation();
        if (diffX > 0) {
          this.isMenuVisible = true; // Swipe right to show
        } else {
          this.isMenuVisible = false; // Swipe left to hide
        }
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>


<style>
body {
  background: linear-gradient(to bottom, #bfdcfd 0%, #fdfcff 36%, #fdfcff 65%, #cce0fe 100%);
  height: 100vh;
}
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.dashboard-container {
  display: flex;
  gap: 30px;
  justify-content: space-between;
  max-width: 1800px;
  margin: 30px;
}
.sidemenu {
  background-color: rgba(163, 163, 163, 0.25);
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  padding: 8px 20px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}
.sidemenu-hidden {
  transform: translateX(-100%);
  opacity: 0;
}
.sidemenu-logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 30px;
}
.sidemenu-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
}
.sidemenu-list > div {
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  height: 43px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 10px 8px;
  gap: 12px;
}
.flex {
display: flex;
}
.items-center {
align-items: center;
}

.sidemenu .top-head {
  background-color: rgba(162, 162, 162, 0.25);
  padding-left: 3px;
  padding-right: 3px;
  border-radius: 18px;
  height: 42px;
  gap: 10px;
}

@media (max-width: 500px) {
  .sidemenu {
    width: 100%;
  }
}
</style>
