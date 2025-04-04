<template>
  <!-- Основной контейнер бокового меню -->
  <div class="side-menu">
    <!-- Секция с логотипом -->
    <div class="logo-section mb-4">
      <img :src="GroupIcon" alt="Logo" class="logo" />
      <span class="logo-text">Pappays</span>
    </div>

    <!-- Основная секция меню -->
    <div class="menu-section">
      <!-- Пункт Dashboard -->
      <div class="menu-category">
        <div
          class="menu-item"
          :class="{ expanded: expandedMenus.dashboard }"
          @click="toggleExpand('dashboard')"
        >
          <img :src="DashboardIcon" alt="Dashboard" class="menu-icon" />
          <span>Dashboard</span>
          <span class="expand-icon ml-auto">{{
            expandedMenus.dashboard ? "-" : "+"
          }}</span>
        </div>
        <div
          class="submenu"
          :class="{ 'submenu-expanded': expandedMenus.dashboard }"
        >
          <!-- Добавьте пункты подменю для Dashboard -->
        </div>
      </div>

      <!-- Раздел PP Hesaplar с подменю -->
      <div class="menu-category">
        <div
          class="menu-item"
          :class="{ expanded: expandedMenus.ppHesaplar }"
          @click="toggleExpand('ppHesaplar')"
        >
          <img :src="PPHIcon" alt="PP Hesaplar" class="menu-icon" />
          <span>PP Hesaplar</span>
          <span class="expand-icon ml-auto">{{
            expandedMenus.ppHesaplar ? "-" : "+"
          }}</span>
        </div>
        <!-- Подменю PP Hesaplar -->
        <div
          class="submenu"
          :class="{ 'submenu-expanded': expandedMenus.ppHesaplar }"
        >
          <div
            v-for="item in [
              'Sözleşmeli Hesaplar',
              'Bankalı Hesaplar',
              'Onaysız Hesaplar',
              'Çekime Kapalılar',
              'Hesap Ekle',
              'Yeni Hesap Aç',
              'Çekim Hareketleri',
              'Çekim Oluştur',
              'Hesap Kategorileri',
            ]"
            :key="item"
            class="submenu-item pl-4"
            :class="{ active: activeSubmenuItem === item }"
            @click="setActiveSubmenuItem(item)"
          >
            <svg
              v-if="activeSubmenuItem === item"
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3.70946L12 3.70946M12 3.70946L9.13043 0.709458M12 3.70946L9.13043 6.70946"
                stroke="#303030"
                stroke-width="1"
                stroke-linecap="round"
              />
            </svg>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- PP Sorunlular с подменю -->
      <div class="menu-category">
        <div
          class="menu-item"
          :class="{ expanded: expandedMenus.ppSorunlular }"
          @click="toggleExpand('ppSorunlular')"
        >
          <img :src="PPSIcon" alt="PP Sorunlular" class="menu-icon" />
          <span>PP Sorunlular</span>
          <span class="expand-icon ml-auto">{{
            expandedMenus.ppSorunlular ? "-" : "+"
          }}</span>
        </div>
        <div
          class="submenu"
          :class="{ 'submenu-expanded': expandedMenus.ppSorunlular }"
        >
          <div
            v-for="item in [
              'Sorunlu Hesaplar',
              'Çözülen Sorunlar',
              'Sorun Bildirimleri',
              'Sorun Kategorileri',
            ]"
            :key="item"
            class="submenu-item pl-4"
            :class="{ active: activeSubmenuItem === item }"
            @click="setActiveSubmenuItem(item)"
          >
            <svg
              v-if="activeSubmenuItem === item"
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3.70946L12 3.70946M12 3.70946L9.13043 0.709458M12 3.70946L9.13043 6.70946"
                stroke="#303030"
                stroke-width="1"
                stroke-linecap="round"
              />
            </svg>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- Taşıma İstatistikleri с подменю -->
      <div class="menu-category">
        <div
          class="menu-item"
          :class="{ expanded: expandedMenus.tasima }"
          @click="toggleExpand('tasima')"
        >
          <img :src="TasIcon" alt="Taşıma İstatistikleri" class="menu-icon" />
          <span>Taşıma İstatistikleri</span>
          <span class="expand-icon ml-auto">{{
            expandedMenus.tasima ? "-" : "+"
          }}</span>
        </div>
        <div
          class="submenu"
          :class="{ 'submenu-expanded': expandedMenus.tasima }"
        >
          <div
            v-for="item in [
              'Günlük İstatistikler',
              'Haftalık Rapor',
              'Aylık Rapor',
              'Taşıma Geçmişi',
              'Taşıma Ayarları',
            ]"
            :key="item"
            class="submenu-item pl-4"
            :class="{ active: activeSubmenuItem === item }"
            @click="setActiveSubmenuItem(item)"
          >
            <svg
              v-if="activeSubmenuItem === item"
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3.70946L12 3.70946M12 3.70946L9.13043 0.709458M12 3.70946L9.13043 6.70946"
                stroke="#303030"
                stroke-width="1"
                stroke-linecap="round"
              />
            </svg>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- Остальные пункты меню -->
      <div
        class="menu-item"
        :class="{ active: activeMenuItem === 'istatistik' }"
        @click="setActiveMenuItem('istatistik')"
      >
        <img :src="IsIcon" alt="İstatistik" class="menu-icon" />
        <span>İstatistik</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: activeMenuItem === 'telegram' }"
        @click="setActiveMenuItem('telegram')"
      >
        <img :src="TelIcon" alt="Telegram Bildirimleri" class="menu-icon" />
        <span>Telegram Bildirimleri</span>
      </div>

      <!-- Пункт меню Kullanıcılar (убран класс active) -->
      <div
        class="menu-item"
        :class="{ active: activeMenuItem === 'kullanicilar' }"
        @click="setActiveMenuItem('kullanicilar')"
      >
        <img :src="KuIcon" alt="Kullanıcılar" class="menu-icon" />
        <span>Kullanıcılar</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: activeMenuItem === 'sifre' }"
        @click="setActiveMenuItem('sifre')"
      >
        <img :src="SifIcon" alt="Şifremi Değiştir" class="menu-icon" />
        <span>Şifremi Değiştir</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: activeMenuItem === '2fa' }"
        @click="setActiveMenuItem('2fa')"
      >
        <img :src="TwoFAIcon" alt="2FA Güvenlik" class="menu-icon" />
        <span>2FA Güvenlik</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: activeMenuItem === 'sss' }"
        @click="setActiveMenuItem('sss')"
      >
        <img :src="SSSIcon" alt="SSS" class="menu-icon" />
        <span>SSS</span>
      </div>
    </div>

    <!-- Нижняя секция меню -->
    <div class="menu-footer">
      <div class="menu-custom">
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.00023 4.43748C8.19674 4.43748 7.4113 4.67574 6.74322 5.12213C6.07515 5.56853 5.55445 6.203 5.24696 6.94533C4.93948 7.68765 4.85903 8.50449 5.01578 9.29253C5.17254 10.0806 5.55945 10.8044 6.1276 11.3726C6.69575 11.9408 7.41962 12.3277 8.20767 12.4844C8.99572 12.6412 9.81255 12.5607 10.5549 12.2532C11.2972 11.9458 11.9317 11.4251 12.3781 10.757C12.8245 10.0889 13.0627 9.30346 13.0627 8.49998C13.0615 7.42292 12.6331 6.39033 11.8715 5.62873C11.1099 4.86713 10.0773 4.43872 9.00023 4.43748ZM9.00023 10.6875C8.56758 10.6875 8.14465 10.5592 7.78491 10.3188C7.42518 10.0785 7.14481 9.73681 6.97924 9.3371C6.81367 8.93739 6.77035 8.49755 6.85476 8.07322C6.93916 7.64889 7.1475 7.25911 7.45343 6.95318C7.75936 6.64726 8.14913 6.43892 8.57347 6.35451C8.9978 6.27011 9.43763 6.31343 9.83735 6.47899C10.2371 6.64456 10.5787 6.92494 10.8191 7.28467C11.0594 7.6444 11.1877 8.06733 11.1877 8.49998C11.1877 9.08014 10.9573 9.63654 10.547 10.0468C10.1368 10.457 9.58039 10.6875 9.00023 10.6875ZM16.1877 8.5617V8.43826L17.2815 7.07029C17.3733 6.95567 17.4369 6.82108 17.4671 6.67737C17.4974 6.53367 17.4935 6.38486 17.4557 6.24295C17.2583 5.4985 16.9633 4.78344 16.5784 4.11639C16.5042 3.98918 16.4011 3.88124 16.2775 3.80129C16.1538 3.72135 16.0131 3.67165 15.8666 3.65623L14.126 3.46092L14.0393 3.3742L13.844 1.63279C13.8284 1.4865 13.7787 1.34591 13.6987 1.2224C13.6188 1.0989 13.5109 0.99594 13.3838 0.921855C12.7167 0.535674 12.0014 0.239607 11.2565 0.0413859C11.1144 0.00415039 10.9656 0.000799466 10.8221 0.0316032C10.6785 0.0624069 10.5442 0.126504 10.4299 0.21873L9.06194 1.31248H8.93851L7.57054 0.21873C7.45592 0.126918 7.32133 0.063319 7.17762 0.0330577C7.03391 0.0027964 6.88511 0.00671962 6.74319 0.044511C5.99855 0.243113 5.28348 0.539438 4.61663 0.925761C4.48992 0.99954 4.38229 1.10201 4.30237 1.22494C4.22245 1.34787 4.17248 1.48783 4.15647 1.63357L3.96116 3.3742L3.87444 3.46092L2.13304 3.65623C1.98674 3.67177 1.84616 3.72152 1.72265 3.80146C1.59914 3.8814 1.49618 3.98928 1.4221 4.11639C1.037 4.78365 0.74199 5.49899 0.544756 6.24373C0.507093 6.38553 0.503236 6.53418 0.533495 6.67774C0.563754 6.8213 0.627284 6.95576 0.718974 7.07029L1.81272 8.43826V8.5617L0.718974 9.92967C0.627163 10.0443 0.563564 10.1789 0.533302 10.3226C0.503041 10.4663 0.506964 10.6151 0.544756 10.757C0.743605 11.5017 1.04019 12.2168 1.42679 12.8836C1.50049 13.0102 1.60284 13.1178 1.72562 13.1977C1.84841 13.2776 1.98821 13.3276 2.13382 13.3437L3.87444 13.5375L3.96116 13.6242L4.15647 15.3672C4.17201 15.5135 4.22176 15.654 4.3017 15.7776C4.38164 15.9011 4.48953 16.004 4.61663 16.0781C5.28374 16.4643 5.99908 16.7604 6.74398 16.9586C6.88601 16.9958 7.03481 16.9992 7.17838 16.9684C7.32195 16.9376 7.45628 16.8735 7.57054 16.7812L8.93851 15.6875H9.06194L10.4299 16.7812C10.5445 16.873 10.6791 16.9366 10.8228 16.9669C10.9665 16.9972 11.1153 16.9932 11.2573 16.9554C12.0017 16.7581 12.7168 16.4631 13.3838 16.0781C13.5108 16.0045 13.6188 15.9021 13.699 15.7792C13.7792 15.6562 13.8294 15.5162 13.8455 15.3703L14.0393 13.6297L14.126 13.5429L15.8674 13.3437C16.0133 13.3276 16.1534 13.2773 16.2763 13.1971C16.3992 13.117 16.5016 13.009 16.5752 12.882C16.9614 12.2149 17.2575 11.4996 17.4557 10.7547C17.4931 10.6131 17.4968 10.4647 17.4666 10.3215C17.4363 10.1782 17.3729 10.044 17.2815 9.92967L16.1877 8.5617ZM14.3034 8.17967C14.3159 8.39303 14.3159 8.60693 14.3034 8.82029C14.2894 9.05223 14.3621 9.28108 14.5073 9.46248L15.5104 10.7164C15.4157 10.9967 15.3027 11.2704 15.1721 11.5359L13.576 11.7133C13.3449 11.7397 13.1319 11.8511 12.9784 12.0258C12.8364 12.1857 12.6851 12.337 12.5252 12.4789C12.3505 12.6324 12.2391 12.8455 12.2127 13.0765L12.0362 14.6719C11.7707 14.803 11.497 14.9165 11.2166 15.0117L9.96273 14.0078C9.79632 13.875 9.58968 13.8028 9.37679 13.8031C9.35804 13.8031 9.33929 13.8031 9.32054 13.8031C9.10718 13.8156 8.89327 13.8156 8.67991 13.8031C8.44813 13.7894 8.21945 13.8617 8.03773 14.0062L6.78382 15.0101C6.50353 14.9154 6.22976 14.8024 5.96429 14.6719L5.78694 13.0758C5.76052 12.8447 5.64914 12.6317 5.47444 12.4781C5.31455 12.3362 5.16324 12.1849 5.02132 12.025C4.86776 11.8503 4.65475 11.7389 4.42366 11.7125L2.82835 11.5359C2.69723 11.2705 2.58371 10.9967 2.48851 10.7164L3.49163 9.46248C3.63683 9.28108 3.7095 9.05223 3.69554 8.82029C3.68304 8.60693 3.68304 8.39303 3.69554 8.17967C3.7095 7.94773 3.63683 7.71888 3.49163 7.53748L2.49007 6.28357C2.58476 6.00328 2.69777 5.72952 2.82835 5.46404L4.42444 5.2867C4.65553 5.26028 4.86854 5.1489 5.0221 4.9742C5.16402 4.8143 5.31533 4.663 5.47522 4.52107C5.64992 4.36752 5.7613 4.1545 5.78772 3.92342L5.96429 2.3281C6.22972 2.19699 6.50349 2.08346 6.78382 1.98826L8.03773 2.99217C8.21945 3.13669 8.44813 3.20902 8.67991 3.19529C8.89327 3.18279 9.10718 3.18279 9.32054 3.19529C9.55237 3.20947 9.78122 3.13709 9.96273 2.99217L11.2166 1.98826C11.497 2.08346 11.7707 2.19699 12.0362 2.3281L12.2135 3.9242C12.2399 4.15528 12.3513 4.3683 12.526 4.52185C12.6859 4.66378 12.8372 4.81509 12.9791 4.97498C13.1327 5.14968 13.3457 5.26106 13.5768 5.28748L15.1721 5.46404C15.3032 5.72948 15.4167 6.00324 15.5119 6.28357L14.5088 7.53748C14.3631 7.71865 14.2898 7.94753 14.3034 8.17967Z"
            fill="#FE6A35"
          />
        </svg>
        <span>Şifremi Değiştir</span>
      </div>
      <div class="menu-custom">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.9375 15.375C8.9375 15.6236 9.03627 15.8621 9.21209 16.0379C9.3879 16.2137 9.62636 16.3125 9.875 16.3125H14.25C14.6644 16.3125 15.0618 16.1479 15.3549 15.8549C15.6479 15.5618 15.8125 15.1644 15.8125 14.75V2.25C15.8125 1.8356 15.6479 1.43817 15.3549 1.14515C15.0618 0.85212 14.6644 0.6875 14.25 0.6875H9.875C9.62636 0.6875 9.3879 0.786272 9.21209 0.962087C9.03627 1.1379 8.9375 1.37636 8.9375 1.625C8.9375 1.87364 9.03627 2.1121 9.21209 2.28791C9.3879 2.46373 9.62636 2.5625 9.875 2.5625H13.9375V14.4375H9.875C9.62636 14.4375 9.3879 14.5363 9.21209 14.7121C9.03627 14.8879 8.9375 15.1264 8.9375 15.375ZM0.46172 7.83672L3.58672 4.71172C3.76284 4.5356 4.00171 4.43665 4.25078 4.43665C4.49985 4.43665 4.73872 4.5356 4.91484 4.71172C5.09096 4.88784 5.18991 5.12671 5.18991 5.37578C5.18991 5.62485 5.09096 5.86372 4.91484 6.03984L3.39063 7.5625H9.875C10.1236 7.5625 10.3621 7.66127 10.5379 7.83709C10.7137 8.0129 10.8125 8.25136 10.8125 8.5C10.8125 8.74864 10.7137 8.9871 10.5379 9.16291C10.3621 9.33873 10.1236 9.4375 9.875 9.4375H3.39063L4.91563 10.9617C5.09175 11.1378 5.19069 11.3767 5.19069 11.6258C5.19069 11.8749 5.09175 12.1137 4.91563 12.2898C4.73951 12.466 4.50064 12.5649 4.25156 12.5649C4.00249 12.5649 3.76362 12.466 3.5875 12.2898L0.462502 9.16484C0.375051 9.0778 0.305643 8.97435 0.258258 8.86042C0.210874 8.74649 0.186444 8.62433 0.186372 8.50094C0.186298 8.37755 0.210585 8.25537 0.257835 8.14138C0.305085 8.0274 0.374372 7.92387 0.46172 7.83672Z"
            fill="#FE6A35"
          />
        </svg>
        <span>Çıkış Yap</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  GroupIcon,
  TwoFAIcon,
  DashboardIcon,
  PPHIcon,
  PPSIcon,
  TasIcon,
  IsIcon,
  TelIcon,
  KuIcon,
  SifIcon,
  SSSIcon,
} from "../assets/icons";

// Текущий активный пункт основного меню
const activeMenuItem = ref("ppHesaplar");

// Состояния раскрытия для каждого меню
const expandedMenus = ref({
  dashboard: false,
  ppHesaplar: true,
  ppSorunlular: false,
  tasima: false,
});

// Активный элемент подменю
const activeSubmenuItem = ref("Sözleşmeli Hesaplar");

// Переключение состояния подменю
const toggleExpand = (menu) => {
  // Закрываем все меню
  Object.keys(expandedMenus.value).forEach((key) => {
    expandedMenus.value[key] = false;
  });
  // Открываем только выбранное
  expandedMenus.value[menu] = true;
  activeMenuItem.value = menu;
};

// Установка активного элемента подменю
const setActiveSubmenuItem = (item) => {
  activeSubmenuItem.value = item;
};

// Установка активного пункта меню (для не раскрывающихся пунктов)
const setActiveMenuItem = (item) => {
  // Закрываем все раскрывающиеся меню
  Object.keys(expandedMenus.value).forEach((key) => {
    expandedMenus.value[key] = false;
  });
  activeMenuItem.value = item;
};
</script>

<style scoped>
/* Основные стили бокового меню */
.side-menu {
  width: 277px;
  height: 1125px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 8px 20px 25px 20px;
  backdrop-filter: blur(80px);
  background: rgba(162, 162, 162, 0.25);
}

/* Стили секции логотипа */
.logo-section {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(147, 147, 148, 0.2);
}

.logo {
  width: 74px;
  height: 74px;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #495057;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 30px;
  line-height: 140%;
  color: #303030;
}

/* Стили основной секции меню */
.menu-section {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.menu-section::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Стили пунктов меню */
.menu-item {
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 6px 15px 6px 8px;
  width: 237px;
  height: 41px;
  background: rgba(0, 0, 0, 0.05);
  cursor: pointer;
  color: #495057;
  transition: all 0.2s;
  margin: 0.25rem 0;
  font-weight: 600;
  font-size: 15px;
  line-height: 140%;
  color: #303030;
}

.menu-item:hover {
  background: #e9ecef;
}

.menu-item.active {
  background: #fe6a35;
  color: white;
}

.menu-item.expanded {
  background: #fe6a35;
  color: white;
}

/* Стили категорий меню */
.menu-category {
  margin: 0.5rem 0;
}

/* Стили подменю */
.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.submenu-expanded {
  max-height: 500px;
}

/* Анимация иконки */
.menu-icon-rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

/* Стили футера меню */
.menu-footer {
  border-top: 1px solid rgba(147, 147, 148, 0.2);

  padding-top: 1rem;
}

/* Добавляем стили для иконок меню */
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.submenu .submenu-item {
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  color: #000;
  opacity: 0.5;
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0.25rem 0;
}

.submenu .submenu-item.active {
  color: #303030;
  opacity: 1;
}

.submenu .submenu-item.active svg {
  display: inline-block;
  margin-right: 8px;
}

.submenu .submenu-item svg {
  display: none;
}

.expand-icon {
  font-size: 18px;
  font-weight: bold;
}
</style>
