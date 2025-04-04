<script setup>
// Импорты компонентов
import { ref } from "vue";
import UsersTable from "./components/UsersTable.vue";
import UserDialog from "./components/UserDialog.vue";
import SideMenu from "./components/SideMenu.vue";

// Состояние диалога создания/редактирования пользователя
const dialogVisible = ref(false);

// Методы управления диалогом
const openNewUserDialog = () => {
  dialogVisible.value = true;
};

const onDialogHide = () => {
  dialogVisible.value = false;
};
</script>

<template>
  <div class="layout-wrapper">
    <SideMenu />

    <div class="layout-main">
      <header class="layout-header flex align-items-center">
        <div class="user-header flex justify-content-between">
          <div class="user-header-left flex align-items-center">
            <svg
              class="user-header-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H14C19.5228 0 24 4.47715 24 10V14C24 19.5228 19.5228 24 14 24H10C4.47715 24 0 19.5228 0 14V10Z"
                fill="white"
              />
              <circle
                cx="12"
                cy="8"
                r="2.25"
                stroke="#3E555D"
                stroke-width="1.5"
              />
              <path
                d="M16.4699 14.0303C16.8729 14.4333 17.0819 14.9793 17.1791 15.6785C17.2484 16.1769 17.2556 16.6979 17.2535 17.25H11.9998L6.74614 17.25C6.74408 16.6979 6.75135 16.177 6.82076 15.6787C6.91815 14.9795 7.1273 14.4334 7.53033 14.0303C7.95581 13.6049 8.65795 13.2742 9.51208 13.0544C10.3513 12.8383 11.2559 12.75 11.9998 12.75C12.7436 12.75 13.6484 12.8383 14.4879 13.0544C15.3422 13.2743 16.0445 13.6049 16.4699 14.0303Z"
                stroke="#3E555D"
                stroke-width="1.5"
              />
            </svg>
            <span class="user-header-name">Kullanıcılar</span>
          </div>
          <Button
            icon="pi pi-user"
            class="p-button-rounded p-button-text user-header-button"
          />
        </div>
        <div
          class="content-header flex align-items-center justify-content-between mb-4"
        >
          <Button
            label="Ekle"
            class="p-button-success ekle-button"
            @click="openNewUserDialog"
          >
            <template #icon>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.000114441"
                  width="36"
                  height="36"
                  rx="15"
                  fill="#EEEDF0"
                />
                <path
                  d="M12 18.0001H24"
                  stroke="#FE6A35"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M18 12.0001L18 24.0001"
                  stroke="#FE6A35"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </template>
          </Button>
          <h1 class="content-header-title">Kullanıcılar</h1>
          <div class="content-header-description">
            UYARI: Şirket yöneticisi yetkisi en üst düzey yetkidir, şirket
            yöneticisine çekim yetkisini kapasanız bile çekim atabilir.
          </div>
        </div>
      </header>

      <div class="layout-content">
        <UsersTable ref="usersTable" />

        <UserDialog
          :visible="dialogVisible"
          @update:visible="dialogVisible = $event"
          :editData="null"
          @hide="onDialogHide"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Применяем шрифт ко всем элементам в компоненте */
:deep(*) {
  font-family: var(--font-family);
}

/* Основной контейнер */
.layout-wrapper {
  /* min-height: 100vh; */
  display: flex;
  gap: 30px;
}

/* Основной контент */
.layout-main {
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
}

/* Верхняя панель */
.layout-header {
  flex-direction: column;

  background-image: radial-gradient(
      60% 80% at 50% 42%,
      #02d1ffd4 0%,
      #073aff00 100%
    ),
    radial-gradient(113% 91% at 17% -2%, #000b2bff 0%, #000b2b00 99%),
    radial-gradient(180% 94% at 50% 100%, #01c2dbeb 22%, #ff000000 99%),
    radial-gradient(240% 50% at 50% 100%, #00ffa2ff 0%, #ff000000 59%),
    radial-gradient(140% 94% at 50% 100%, #0064ffff 0%, #ff000000 100%),
    radial-gradient(0% 0% at 0% 0%, #016dffff 0%, #00254fff 100%);
  border-radius: 20px 20px 0 0;
  padding: 25px;
  width: 1361px;
  height: 673px;
}

.user-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  padding: 25px 25px;
  margin-bottom: 20px;
}

.user-header-left {
  gap: 10px;
}

.user-header-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 23px;
  color: #fff;
  opacity: 0.5;
}

.user-header-icon {
  margin-right: 16px;
  width: 24px;
  height: 24px;
}

.user-header-button {
  background: #fff;
  color: #000;
}

/* Контейнер контента */
.layout-content {
  position: relative;
  bottom: 350px;
  /* left: 0; */
  width: 100%;
}

.ekle-button {
  align-self: flex-end;
}
/* Заголовок контента */
.content-header {
  flex-direction: column;
  width: 100%;
}

.content-header-title {
  align-self: flex-start;
  font-weight: 400;
  font-size: 34px;
  line-height: 140%;
  color: #fff;
}

.content-header-description {
  align-self: flex-start;
  font-weight: 500;
  font-size: 15px;
  line-height: 150%;
  text-transform: capitalize;
  color: #b0e4ef;
}

/* Стили кнопки */
:deep(.p-button.p-button-success) {
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  padding: 3px 10px 3px 3px;
  width: 98px;
  height: 42px;
  background: #fe6a35;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: #fff;
}

:deep(.p-button.p-button-success:hover) {
  /* background: #16a34a; */
}
</style>
