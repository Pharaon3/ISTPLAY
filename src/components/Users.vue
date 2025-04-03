<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=more_vert" />
  <div class="w-full min-h-screen bg-gradient-to-r from-[#003c62] via-[#006b8f] to-[#003c62]">
    <!-- Users Management Card -->
    <div class="user-header">
      <!-- Header with search and user -->
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center bg-white text-blue-600 user-icon">
            <img src="@/assets/icons/user-icon.png" width="20" height="20" />
          </div>

          <span class="text-lg text-white font-size-24">Kullanıcılar</span>
        </div>

        <div class="flex items-center gap-2 user-box">
          <div class="user-circle">
            <span class="user-letter">M</span>
          </div>
          <div class="flex flex-col">
            <span class="text-white">User (anonymous)</span>
            <span class="text-grey">36341</span>
          </div>
          <span class="material-symbols-outlined"> more_vert </span>
        </div>
      </div>

      <hr class="h-[1px] w-full bg-gray-400 border-0 mt-4" />

      <!-- Blue info box -->
      <div class="mb-6 rounded-lg text-white h-full">
        <div class="ekle">
          <div class="icon-button">
            <Button icon="pi pi-plus" class="download-icon" />
            <span>Ekle</span>
          </div>
        </div>
        <p class="mb-2 text-xl font-34 text-left">Kullanıcılar</p>
        <p class="text-sm opacity-90 text-left">
          Here, you can see the averages of all the companies banned today in
          the PANEL, grouped by the total number of investors and the total
          number of withdrawals for accounts with deductions.
        </p>
      </div>
    </div>

    <!-- Main Content Box -->
    <div class="-mt-5 bg-white rounded-t-2xl overflow-hidden">
      <div class="bg-white rounded-lg shadow">
        <DataTable :value="users" paginator :rows="rows" :rowsPerPageOptions="[10, 20, 50]" stripedRows
          responsiveLayout="scroll">
          <template #header>
            <div class="flex flex-wrap justify-between items-center datatable-header">
              <div class="text-gray-600 text-sm p-2 w-full sm:w-auto">
                {{ paginationInfo }}
              </div>
              <!-- Paginator Controls in Header -->
              <div class="flex flex-wrap gap-2 search-box w-full sm:w-auto justify-end">
                <InputText v-model="search" placeholder="Arama" class="p-inputtext-sm w-full sm:w-auto" />
                <Button icon="pi pi-search" class="p-button-warning search-icon" />
              </div>
              <!-- Rows per page dropdown in header -->
              <div class="flex flex-wrap gap-2 items-center w-full">
                <span class="text-dark">Sayfada kayıt göster</span>
                <Dropdown :options="rowsPerPageOptions" v-model="rows" option-label="label" option-value="value"
                  class="p-dropdown" placeholder="Rows per page" style="border-radius: 20px; margin-right: 5px;"/>
              </div>

              <div class="flex gap-2 download-button-container ml-2">
                <div class="icon-button">
                  <Button icon="pi pi-download" class="download-icon" />
                  <span>Exel</span>
                </div>
              </div>
            </div>
            <hr class="h-[1px] w-full border-0 mt-3" />
          </template>

          <Column field="name" header="İsim" sortable></Column>
          <Column field="email" header="E-Posta Adresi" sortable></Column>
          <Column field="role" header="Yetki" sortable></Column>
          <Column field="lastLogin" header="Son Giriş" sortable></Column>

          <Column field="withdrawal" header="Çekim Yetkisi">
            <template #body="slotProps">
              <span class="px-3 py-1 text-sm rounded-full bg-yellow-200 text-yellow-700 cekim">
                {{ slotProps.data.withdrawal }}
              </span>
            </template>
          </Column>

          <Column field="2fa" header="2FA Güvenlik">
            <template #body="slotProps">
              <span v-if="slotProps.data.twoFA === 'Kapalı'"
                class="px-3 py-1 text-sm rounded-full bg-red-200 text-red-700 kapali">
                <img src="@/assets/icons/orange-warning.png" />
                <span>2FA Kapalı</span>
              </span>
              <span v-else
                class="px-3 py-1 text-sm rounded-full bg-green-200 text-green-700 flex justify-center align-center">
                <img src="@/assets/icons/2fa-check.png" />
              </span>
            </template>
          </Column>

          <Column header="İşlem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-sm p-button-secondary mr-2" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-sm p-button-danger" />
            </template>
          </Column>

          <template #paginatorstart>
            <Button type="button" icon="pi pi-chevron-left" class="p-button-text p-button-sm" />
          </template>
          <template #paginatorend>
            <Button type="button" icon="pi pi-chevron-right" class="p-button-text p-button-sm" />
          </template>
        </DataTable>
      </div>
      <div class="bg-[#ECF0F5] px-5">
        <div class="bottom-5 p-4 text-xs text-gray-500">
          <p class="mb-1">
            • Yetki ile ilişkilendirilen parametreler çalışma izinleri ile
            ilişkilidir bu şekilde ilgili yetki verilir ve ilgili görevleri
            yapabilir, hesap işlemleri yapabilir.
          </p>
          <p class="mb-1">
            • Çalışma yetkisi olmayan kullanıcılar sadece görüntüleme yapabilir,
            işlem yapamazlar. Çalışma yetkisi olan kullanıcılar işlem
            yapabilirler.
          </p>
          <p>
            • Lütfen kullanıcıların yetki seviyelerini doğru belirleyiniz bu
            şekilde güvenlik açığı oluşmaması için önemlidir. Kullanıcı hesap
            işlemleri için yetki verilmesi gereklidir.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Icon } from "@iconify/vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  computed: {
    paginationInfo() {
      if (!this.users || this.users.length === 0) return "Kayıt bulunamadı";
      if (!this.currentPage || !this.rows) return "Kayıt bilgisi yükleniyor...";

      const start = (this.currentPage - 1) * this.rows + 1;
      const end = Math.min(start + this.rows - 1, this.users.length);

      if (isNaN(start) || isNaN(end)) return "Kayıt bilgisi yükleniyor...";

      return `${this.users.length} kayıttan ${start} - ${end} arasındaki kayıtlar gösteriliyor`;
    },
  },

  watch: {
    users(newUsers) {
      if (newUsers.length > 0 && this.currentPage === 0) {
        this.currentPage = 1;
      }
    },
  },

  data() {
    return {
      currentPage: 1, // Initialize currentPage
      search: "",
      rows: 10, // Initial value of rows
      rowsPerPageOptions: [
        { label: "10", value: 10 },
        { label: "20", value: 20 },
        { label: "50", value: 50 },
      ],
      users: [
        {
          name: "Eldar",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar1 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar2 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar3 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Aktif",
        },
        {
          name: "Eldar4",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar5 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar6 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar7 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Aktif",
        },
        {
          name: "Eldar8",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar9 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar0 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar11 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar12 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar13 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Aktif",
        },
        {
          name: "Eldar14",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar15 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar16 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar17 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Aktif",
        },
        {
          name: "Eldar18",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar19 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar10 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar21 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar22 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar23 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Aktif",
        },
        {
          name: "Eldar24",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar25 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar26 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar27 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Aktif",
        },
        {
          name: "Eldar22",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar29 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
        {
          name: "Eldar20 Eldaroğlu",
          email: "elder@just.com",
          role: "Şirket Yöneticisi",
          lastLogin: "2025-02-22 11:10:41",
          withdrawal: "Çekim Yapabilir",
          twoFA: "Kapalı",
        },
      ],
    };
  },
};
</script>

<style>
#pv_id_241 {
  display: none;
}

#pv_id_141 {
  display: none;
}

.user-icon {
  width: 24px;
  height: 24px;
  border-radius: 10px;
}

.gap-16px {
  gap: 16px;
}

.font-size-24 {
  font-size: 24px;
}

.font-size-15 {
  font-size: 15px;
}

.user-circle {
  width: 42px;
  /* Adjust as needed */
  height: 42px;
  /* Adjust as needed */
  background-color: green;
  border-radius: 18px;
  /* Makes the div circular */
  display: flex;
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
}

.user-letter {
  color: white;
  /* White text color */
  font-size: 20px;
  /* Adjust font size as needed */
  font-weight: bold;
  /* Make the letter bold */
}

.user-box {
  background: #ffffff33;
  height: 48px;
  border-radius: 20px;
  padding: 3px;
  padding-right: 15px;
  font-size: 12px;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  color: white;
}

.gap-10px {
  gap: 10px;
}

.flex-col {
  flex-direction: column;
}

.p-datatable.p-component.p-datatable-striped>.p-datatable-header {
  background: white;
  color: #374151;
  border-width: 0px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.p-datatable-table-container {
  background: #ecf0f5;
  color: #374151;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 25px;
}

.p-paginator.p-component {
  background: #ecf0f5;
  border-radius: 0px;
}

.p-datatable .p-datatable-thead>tr>th {
  background: #ecf0f5;
  color: #374151;
  text-wrap: nowrap;
}

.p-datatable .p-datatable-tbody>tr {
  background: #fff;
  color: #000;
  border-radius: 15px;
  text-wrap: nowrap;
}

.icon-button {
  background-color: #fe6a35;
  color: white;
  height: 42px;
  border-radius: 18px;
  padding: 3px;
  display: flex;
  gap: 12px;
  align-items: center;
  padding-right: 20px;
  cursor: pointer;
  width: fit-content;
}

.download-icon {
  background: white !important;
  border-color: white !important;
  color: #fe6a35 !important;
  border-radius: 15px !important;
  width: 36px !important;
  height: 36px !important;
}

.p-datatable-header .search-icon {
  background-color: #fe6a35;
  border-color: #fe6a35;
  border-radius: 15px;
  width: 36px;
  height: 36px;
}

.search-box {
  border: 1px solid var(--p-inputtext-border-color);
  box-shadow: var(--p-inputtext-shadow);
  border-radius: 18px;
  align-items: center;
  height: 42px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 3px;
}

.search-box input {
  border: none;
  box-shadow: none;
  background-color: transparent;
  padding-left: 17px;
  height: 34px;
}

.cekim {
  width: fit-content;
  border: 1px solid;
  background: #ffb80014;
  border-color: #be983614;
  color: #be9836;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin: auto;
  text-wrap: nowrap;
  padding-right: 25px;
}

.kapali {
  width: fit-content;
  border: 1px solid;
  background: #fff2f0;
  border-color: #fe6a3533;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin: auto;
  text-wrap: nowrap;
  padding-right: 25px;
}

.p-datatable-column-header-content {
  color: rgba(0, 0, 0, 0.35);
}

.p-datatable-column-sorted .p-datatable-column-header-content {
  color: rgba(0, 0, 0, 0.65);
}

.datatable-header>hr {
  display: none;
}

.ekle {
  display: flex;
  justify-content: end;
  padding-top: 20px;
  padding-bottom: 18px;
}

.user-header {
  padding: 25px;
}

@media (max-width: 786px) {
  .datatable-header {
    flex-direction: column;
    gap: 20px;
  }

  .datatable-header>span {
    order: 3;
    width: 100%;
    justify-content: start;
    color: #696969;
  }

  .datatable-header>hr {
    order: 2;
    display: block;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .search-box {
    width: 100%;
    justify-content: space-between;
    order: 1;
  }

  .download-button-container {
    justify-content: end;
    width: 100%;
    order: 4;
  }

  main .user-box {
    display: none;
  }

  .ekle {
    justify-content: start;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .user-header {
    padding: 15px;
  }
}
</style>
