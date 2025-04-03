<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-container">
        <div class="card-header-info">
          <span class="card-header-info-text">2 kayıttan 1 - 2 arasındaki kayıtlar gösteriliyor</span>
        </div>
        <div class="card-header-tools">
          <div class="search-container">
            <span class="p-input-icon-left">
              <InputText v-model="searchQuery" placeholder="Arama" class="p-inputtext-sm custom-search-input" />
              <span class="search-icon-right">
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="36" height="36" rx="15" fill="#FE6A35" />
                  <path d="M24.0385 22.5385L21.5 20" stroke="white" stroke-width="2" stroke-linecap="round" />
                  <circle cx="18" cy="16.5" r="4.5" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>
              </span>
            </span>
          </div>
          <span class="card-header-tools-span">Sayfada kayıt göster </span>
          <Dropdown v-model="rows" :options="[10, 20, 50]" class="dropdown" />
          <Button label="Excel" class="p-button-success p-button-sm excel-button" @click="exportExcel">
            <template #icon>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="15" fill="white" />
                <path
                  d="M18.0789 12.5V20.3333M18.0789 20.3333L14.8684 18.1667M18.0789 20.3333L21.2895 18.1667M24.5 21.5V21.5C24.5 22.6046 23.6046 23.5 22.5 23.5H13.5C12.3954 23.5 11.5 22.6046 11.5 21.5V21.5"
                  stroke="#FE6A35"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </template>
          </Button>
        </div>
      </div>
    </div>

    <DataTable
      :value="filteredUsers"
      :paginator="true"
      :rows="5"
      paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
      responsiveLayout="scroll"
      class="custom-datatable p-datatable-sm"
    >
      <Column field="name" header="İsim" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
      </Column>
      <Column field="email" header="E-Posta Adresi" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
      </Column>
      <Column field="username" header="Kullanıcı Adı" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
      </Column>
      <Column field="tfa_type" header="2FA Türü" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
        <template #body="slotProps">
          <span :class="{ 'text-red-500': slotProps.data.tfa_type === 'none' }">
            {{ slotProps.data.tfa_type === 'none' ? '2FA Kapalı' : slotProps.data.tfa_type }}
          </span>
        </template>
      </Column>
      <Column field="is_owner" header="Sahip" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
        <template #body="slotProps">
          {{ slotProps.data.is_owner ? 'Evet' : 'Hayır' }}
        </template>
      </Column>
      <Column field="is_disabled" header="Devre Dışı" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
        <template #body="slotProps">
          {{ slotProps.data.is_disabled ? 'Evet' : 'Hayır' }}
        </template>
      </Column>
      <Column field="websockets" header="WebSocket Bağlantıları" sortable>
        <template #sorticon="slotProps">
          <i class="pi pi-sort-alt" :class="{ 'opacity-50': !slotProps.sorted }"></i>
        </template>
      </Column>
      <Column header="İşlem" :style="{ width: '100px' }">
        <template #body="slotProps">
          <div class="flex">
            <Button
              icon="pi pi-file-edit"
              class="p-button-rounded p-button-text p-button-plain"
              @click="openEditDialog(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              @click="confirmDelete(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <div class="table-notes">
      <ul class="explanation-list">
        <li>
          Yatırım sütunundaki parantez içindeki rakam o cüzdanın bu ay içinde kaç farklı kişiden yatırım aldığını
          gösterir. Fare ile üzerine gelirseniz detaylı bilgi gösterir.
        </li>
        <li>
          Çekim sütunundaki parantez içindeki rakam o cüzdanın bu ay içinde kaç çekim işlemi yaptığını gösterir.
        </li>
        <li>
          Limitli sütunundaki yeşil onay ikonu o cüzdanın bu ay ödeme alma limiti doldurmadığını, kırmızı ünlem ikonu
          o cüzdanın bu ay ödeme alma limitini doldurduğunu ifade eder.
        </li>
      </ul>
    </div>

    <UserDialog
      :visible="dialogVisible"
      @update:visible="dialogVisible = $event"
      :editData="selectedUser"
      @hide="onDialogHide"
    />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '../stores/main'; // main.js store'u kullanıyoruz
import { useConfirm } from 'primevue/useconfirm';
import UserDialog from './UserDialog.vue';
import ConfirmDialog from 'primevue/confirmdialog';

const mainStore = useMainStore();
const confirm = useConfirm();

const dialogVisible = ref(false);
const selectedUser = ref(null);
const searchQuery = ref('');
const rows = ref(10);

// admin_users nesnesini diziye çevirip filtreleme
const filteredUsers = computed(() => {
  const adminUsersArray = Object.values(mainStore.admin_users); // Nesneyi diziye çevir

  if (!searchQuery.value) return adminUsersArray;

  const query = searchQuery.value.toLowerCase();
  return adminUsersArray.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.tfa_type.toLowerCase().includes(query)
  );
});

const openEditDialog = (user) => {
  selectedUser.value = user;
  dialogVisible.value = true;
};

const onDialogHide = () => {
  selectedUser.value = null;
};

const confirmDelete = (user) => {
  confirm.require({
    message: 'Bu kullanıcıyı silmek istediğinizden emin misiniz?',
    header: 'Silme Onayı',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Evet',
    rejectLabel: 'Hayır',
    accept: () => deleteUser(user),
  });
};

const deleteUser = (user) => {
  // admin_users bir nesne olduğu için ID ile silme yapıyoruz
  if (user.id in mainStore.admin_users) {
    delete mainStore.admin_users[user.id];
  }
};

const exportExcel = () => {
  console.log('Экспорт в Excel');
};
</script>

<style scoped>
/* Стили карточки */
.card {
  /* height: 660px; */
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 20px 25px;
  background: #fff;
  border-radius: 20px;
  width: 1361px;
  height: 246px;
  display: flex;
  align-items: flex-start; /* Прижимаем содержимое к верху */
}

.card-header-container {
  width: 100%;
  display: flex;
  justify-content: space-between; /* Распределяем элементы по ширине */
  align-items: center; /* Выравниваем по центру вертикально */
}

.card-header-info {
  font-size: 14px;
  color: #6c757d;
  display: flex;
  align-items: center;
  height: 100%;
}

.card-header-info-text {
  font-weight: 500;
  font-size: 15px;
  line-height: 140%;
  color: #696969;
}

.card-header-tools {
  display: flex;
  align-items: center;
  gap: 16px; /* Отступ между элементами */
  height: 100%;
}

.card-header-tools-span {
  font-weight: 500;
  font-size: 15px;
  line-height: 140%;
  color: #696969;
  white-space: nowrap;
}

.dropdown {
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  padding: 3px 3px 3px 20px;
  width: 122px;
  height: 51px;
  background: rgba(0, 0, 0, 0.05);
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  color: #696969;
}

.custom-datatable {
  position: relative;
  bottom: 160px;
  border-radius: 20px;
  width: 1361px;
  height: 480px;
  padding: 25px;
  background-color: #ecf0f5;
}

.search-container {
  margin-right: 166px;
  position: relative;
  display: inline-block;
}

.custom-search-input {
  padding-right: 40px; /* Оставляем место для SVG */
}

.search-icon-right {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.search-icon-right svg {
  width: 24px;
  height: 24px;
}

/* Для корректного отображения в PrimeVue */
:deep(.p-inputtext) {
  padding-right: 40px !important;
}

:deep(.p-datatable-wrapper) {
  margin-bottom: 30px;
}

:deep(.p-datatable.p-datatable-sm .p-datatable-thead > tr > th) {
  padding: 0;
  padding-left: 20px;
}

:deep(.p-datatable-table .p-datatable-thead > tr > th) {
  background: #ecf0f5;
}
:deep(.p-column-title) {
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  color: rgba(0, 0, 0, 0.35);
}

/* Стили для иконок сортировки */
/* :deep(.p-sortable-column .p-sortable-column-icon) {
  border-radius: 15px;
  border: 1px solid rgba(108, 117, 125, 0.5);
  width: 30px;
  height: 30px;
  padding: 6px 0 6px 0;
  opacity: 0.5;
  color: #6c757d;
}

:deep(.p-sortable-column .p-sortable-column-icon path) {
  stroke-width: 1.5px;
  stroke: rgba(0, 0, 0, 0.2);
}

:deep(.p-sortable-column.p-highlight .p-sortable-column-icon) {
  color: #495057;
} */

/* Стили для строк таблицы */
:deep(.p-datatable .p-datatable-tbody > tr) {
  border-radius: 15px;
  width: 1311px;
  height: 54px;
  display: table-row;
}

:deep(.p-datatable-table) {
  border-collapse: separate;
  border-spacing: 0 10px;
}

:deep(.p-datatable-tbody > tr) {
  transform: translateY(5px);
  margin-bottom: 5px;
}

/* Стили для ячеек таблицы */
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 8px 8px 8px 17px;
  vertical-align: middle;
  border: none;
}

/* Первая ячейка - скругление слева */
:deep(.p-datatable .p-datatable-tbody > tr > td:first-child) {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

/* Последняя ячейка - скругление справа */
:deep(.p-datatable .p-datatable-tbody > tr > td:last-child) {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

/* Альтернативный вариант с box-shadow для визуального разделения строк */
:deep(.p-datatable .p-datatable-tbody > tr) {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin: 5px 0;
  background: white;
}

/* Стиль при наведении */
:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #f8f9fa !important;
}

/* Для корректного отображения скругленных углов */
:deep(.p-datatable .p-datatable-wrapper) {
  border-collapse: separate;
  border-spacing: 0 5px;
}

/* Стили для пагинации */

:deep(.p-paginator) {
  background: none;
}

/* Общие стили пагинатора */
:deep(.p-paginator .p-paginator-pages .p-paginator-page):nth-last-child(n + 2) {
  /* background: none; */
  margin-right: 10px;
}

:deep(.p-paginator .p-paginator-prev:after) {
  content: "Önceki";
  margin-left: 5px;
  font-weight: 600;
  font-size: 15px;
  line-height: 140%;
  text-align: center;
  color: #000;
}

:deep(.p-paginator .p-paginator-next:before) {
  content: "Sonraki";
  margin-right: 5px;
  font-weight: 600;
  font-size: 15px;
  line-height: 140%;
  text-align: center;
  color: #000;
}

:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-prev) {
  border-radius: 18px;
  width: 102px;
  height: 42px;
  margin-left: 10px;
  margin-right: 10px;
  background: rgba(0, 0, 0, 0.05);
}

/* Отключенные кнопки */
:deep(.p-paginator .p-paginator-first.p-disabled),
:deep(.p-paginator .p-paginator-prev.p-disabled),
:deep(.p-paginator .p-paginator-next.p-disabled),
:deep(.p-paginator .p-paginator-last.p-disabled) {
  opacity: 0.5;
  cursor: default;
}

/* Активная страница */
:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  border-radius: 18px;
  width: 42px;
  height: 42px;
  background: #fe6a35;
  color: white;
}

/* список под таблицей */

.table-notes {
  position: relative;
  bottom: 25px;
}

.explanation-list {
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: rgba(0, 0, 0, 0.5);
}

/* Стили кнопок */
:deep(.p-button.p-button-text) {
  padding: 0.5rem;
}

:deep(.p-button.p-button-text:hover) {
  background: rgba(0, 0, 0, 0.04);
}

:deep(.p-button.p-button-danger.p-button-text:hover) {
  background: rgba(255, 0, 0, 0.04);
}
</style>
