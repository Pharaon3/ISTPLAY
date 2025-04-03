<template>
  <aside :class="['w-[280px]', mobileOpen ? 'block h-full' : 'hidden', 'md:block']">
    <div class="logo-menu-bottom-container h-full rounded-2xl relative flex flex-col justify-between" :class="[ mobileOpen ? 'shadow-md' : '']">
      <div class="logo-menu-container">
        
      <!-- Logo and Title -->
      <div class="flex items-center justify-between top-head logo-border-bottom">
        <!-- Logo and Pappays Span (Aligned to Start) -->
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center rounded-full">
           <img src="@/assets/logo.svg" alt="Logo" class="logo-img"/>
          </div>
          <span class="text-xl font-medium text-gray-800 app-title">Pappays</span>
        </div>

        <div class="flex flex-row top-head-end gap-2">
          <div class="circle">
    	      <span class="letter">M</span>
          </div>
          <!-- Mobile Toggle Button (Aligned to End) -->
          <div class="flex items-center justify-center button-div" :class="[mobileOpen ? 'bg-black' : 'bg-white']" >
            <button @click="mobileOpen = !mobileOpen" class="md:hidden text-gray-800 button">
              <Icon :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation (Conditionally Rendered) -->
      <transition name="slide">
        <nav v-if="mobileOpen || !isMobile" class="mt-6 space-y-1 navigation-bar flex flex-col gap-5">
          <div v-for="(item, index) in menuItems" :key="index" class="item">
            <router-link :to="item.to"
              class="flex items-center justify-between gap-3 rounded-15 text-sm transition-all duration-200 item-box
              :'dashboard-background': item.label === 'Dashboard'"
              :class="[openedIdx == index ? 'bg-orange-500 text-white' : 'gray-liter-transparent text-gray-700']"
              @click.prevent="toggleDropdown(index)" >
              <div class="flex items-center gap-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200" :class="openedIdx === index
                  ? 'bg-white text-orange-500'
                  : 'bg-blue-100 text-blue-600'
                  ">
                  <!-- <Icon :icon="item.icon" width="24" height="24" /> -->
                  <img :src="`src/assets/icons/${item.img}`" width="24" height="24" />
                </div>
                <p>{{ item.label }}</p>
              </div>
              <button v-if="item.hasDropdown" class="focus:outline-none">
                <Icon :icon="openedIdx === index ? 'mdi:minus' : 'mdi:plus'" width="20" height="20" />
              </button>
            </router-link>
            <div v-if="openedIdx == index && item.dropdownItems && item.dropdownItems.length" class="mt-2 space-y-2 submenu-container">
              <div v-for="(dropdownItem, subIdx) in item.dropdownItems" :key="subIdx"
                  :class="['rounded cursor-pointer vertical-middle', {'font-bold': clickedSubIdx == subIdx}]"
                  @click.prevent="clickSubItem(subIdx)">
                <Icon icon="mdi:arrow-right" v-if="clickedSubIdx == subIdx" />{{ dropdownItem }}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between mobile bottom-menu">
            <div>
              <img src="../assets/icons/gear.png" width="20" height="20" >
              <span>Sifremi Degistir</span>
            </div>
            <div>
              <img src="../assets/icons/signout.png" width="20" height="20" >
              <span>Cikis Yap</span>
            </div>
          </div>
        </nav>
      </transition>
      
      </div>

      <!-- Logo and Title -->
      <div class="flex items-center justify-between desktop bottom-menu">
        <div>
          <img src="../assets/icons/gear.png" width="20" height="20" >
          <span>Sifremi Degistir</span>
        </div>
        <div>
          <img src="../assets/icons/signout.png" width="20" height="20" >
          <span>Cikis Yap</span>
        </div>
      </div>

    </div>
  </aside>
</template>

<script setup>
  import { Icon } from "@iconify/vue";
  import { useRoute } from "vue-router";
  import { ref, onMounted, onUnmounted } from "vue";

  const route = useRoute();
  const openDropdown = ref(null);
  const mobileOpen = ref(false);
  const openedIdx = ref(null);
  const clickedSubIdx = ref(null);
  const isMobile = ref(window.innerWidth < 768); // Check if the screen is mobile initially
  const touchStartX = ref(0);
  const touchEndX = ref(0);

  // Function to update isMobile based on window width
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };

  // Detect swipe gestures
  const handleTouchStart = (event) => {
    touchStartX.value = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.value = event.changedTouches[0].clientX;
    if (touchEndX.value - touchStartX.value > 50 && touchStartX.value < 100) {
      mobileOpen.value = true; // Open sidebar on left-to-right swipe
    }
    if (touchStartX.value - touchEndX.value > 50) {
      mobileOpen.value = false;
    }
  };

  // Add event listener for window resize
  onMounted(() => {
    window.addEventListener("resize", updateIsMobile);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
  });

  // Cleanup event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener("resize", updateIsMobile);
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchend", handleTouchEnd);
  });

  const menuItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: "mdi:home",
      img: "dashboard.png",
      hasDropdown: true,
      dropdownItems: ["Dashboard Item 1", "Dashboard Item 2"],
    },
    {
      to: "/",
      label: "PP Hesaplar",
      icon: "mdi:account-group",
      img: "pp-heasaplar.png",
      hasDropdown: true,
      dropdownItems: [
        "Sozleşmeli Hesaplar",
        "Bankalı Hesaplar",
        "Onaysız Hesaplar",
        "Cekime Kapalılar",
        "Hesap Ekle",
        "Yeni Hesap Ac",
        "Cekim Hareketleri",
        "Cekim Oluştur",
        "Hesap Kategorileri",
      ],
    },
    {
      to: "/",
      label: "PP Sorunlular",
      icon: "mdi:account-group",
      img: "pp-sorunlular.png",
      hasDropdown: true,
      dropdownItems: ["PP Sorunlular Item 1", "PP Sorunlular Item 2"],
    },
    {
      to: "/",
      label: "Taşıma İstatistikleri",
      icon: "mdi:account-tie",
      img: "dashboard.png",
      hasDropdown: false,
    },
    {
      to: "/",
      label: "İstatistik",
      icon: "mdi:chart-line",
      img: "pp-heasaplar.png",
      hasDropdown: false,
    },
    {
      to: "/",
      label: "Telegram Bildirimleri",
      icon: "mdi:chart-bar",
      img: "pp-sorunlular.png",
      hasDropdown: false,
    },
    {
      to: "/",
      label: "Kullanıcılar",
      icon: "mdi:account-group",
      img: "dashboard.png",
      hasDropdown: false,
    },
    {
      to: "/",
      label: "Şifremi Değiştir",
      icon: "mdi:lock-reset",
      img: "pp-heasaplar.png",
      hasDropdown: false,
    },
    {
      to: "/",
      label: "2FA Guvenlik",
      icon: "mdi:shield-lock",
      img: "pp-sorunlular.png",
      hasDropdown: false,
    },
    { 
      to: "/", 
      label: "SSS", 
      icon: "mdi:help-circle", 
      img: "sss.png",
      hasDropdown: false },
  ];

  const toggleDropdown = (index) => {
    if (openedIdx.value != index) {
      openedIdx.value = index;
      clickedSubIdx.value = null;
    } else {
      openedIdx.value = null;
    }
  };
  const clickSubItem = (subIndex) => {
    clickedSubIdx.value = subIndex;
  }
</script>

<style scoped>
  /* Sidebar Transition */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-enter-from {
    transform: translateX(-100%);
  }

  .slide-leave-to {
    transform: translateX(-100%);
  }

  /* Sidebar Styling */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 50;
    background: white;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    width: 280px;
  }

  @media (min-width: 786px) {
    .button {
      display: none;
    }
  }

  .button-div {
    border-radius: 15px;
    height: 36px;
    width: 36px;
    padding-top: 2px;
    gap: 5px;
  }
  .bg-black {
    background-color: black;
  }
  .bg-white {
    background-color: white;
  }

  .bg-black.button-div> button {
    color: white;
  }
  .bg-white.button-div> button {
    color: black;
  }
  .img-div {
    border-radius: 15px;
    height: 36px;
    width: 36px;
    margin-right: 10px;
  }
  
  .font-bold {
    font-weight: 700!important;
  }

  .vertical-middle {
    display: flex;
    align-items: center;
  }

  .top-head-end {
    display: none;
  }
  .circle {
      width: 36px; /* Adjust as needed */
      height: 36px; /* Adjust as needed */
      background-color: green;
      border-radius: 50%; /* Makes the div circular */
      display: flex;
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
  }

  .letter {
      color: white; /* White text color */
      font-size: 20px; /* Adjust font size as needed */
      font-weight: bold; /* Make the letter bold */
  }

  .gray-liter-transparent {
    background-color: #0000000D;
  }

  .logo-border-bottom {
    border-bottom: #c1c1c1 solid 1px;
    padding-bottom: 8px;
    margin-bottom: 20px;
  }

  .item-box {
    padding: 10px 15px 10px 8px;
  }

  .bottom-menu {
    border-top: #c1c1c1 solid 1px;
    margin-top: 5px;
    padding-top: 5px;
    /* padding-bottom: 37px; */
    padding-bottom: 77px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
  }
  .bottom-menu> div {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 12px;
    width: 100%;
  }
  .bottom-menu> div> * {
    cursor: pointer;
  }
  .submenu-container {
    padding: 15px 0px 20px 44px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .logo-menu-container {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  .logo-menu-container> nav {
    overflow-y: auto;
  }
  .logo-img {
    width: 75px;
    height: 75px;
  }
  .app-title {
    font-size: 30px;
  }

  .mobile.bottom-menu {
    display: none;
  }
  .logo-menu-bottom-container {
    background: #A2A2A240;
    padding: 20px;
  }
  .desktop.bottom-menu {
    display: flex;
  }

  @media (max-width: 768px) {
    .logo-img {
        width: 45px;
        height: 45px;
    }
    .app-title {
      font-size: 18px;
    }
    .logo-menu-bottom-container {
      background: transparent;
      padding: 10px;
    }
    .mobile.bottom-menu {
      display: flex;
    }
    .desktop.bottom-menu {
      display: none;
    }
  }

  @media (max-width: 786px) {
    .button {
      display: block;
    }

    .dashboard-background {
      background: rgba(0, 0, 0, 0.05);
    }

    .item-box {
      border-radius: 15px;
      margin-bottom: 5px;
    }

    .dashboard-padding {
      padding: 10px 15px 10px 8px;
    }

    .navigation-bar {
      /* background: #E2E2E2; */
      background: #E2E2E2CC;
      -webkit-backdrop-filter: blur(80px);
      /* Safari */
      backdrop-filter: blur(80px);
      /* Standard */

      padding: 25px 20px 25px 20px;
      border-radius: 20px;
      margin-top: 8px;
    }

    .top-head-end {
      display: flex;
    }

    .top-head {
      background-color: rgba(162, 162, 162, 0.25);
      padding-left: 3px;
      padding-right: 3px;
      border-radius: 18px;
      height: 42px;
      gap: 10px;
    }

    aside {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
      width: 100%;
      backdrop-filter: blur(10px);
    }
    
    .logo-border-bottom {
      border-bottom: none;
      padding-bottom: 0px;
      margin-bottom: 0px;
    }

  }
  .rounded-15 {
    border-radius: 15px;
  }
  .flex-col {
    flex-direction: column;
  }
  .gap-5 {
    gap: 5px;
  }
</style>