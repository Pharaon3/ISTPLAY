<template>
  <Dialog
    :visible="visible"
    :style="{ width: '450px' }"
    :header="isEdit ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'"
    :modal="true"
    class="p-fluid"
    @update:visible="$emit('update:visible')"
  >
    <div class="field">
      <label for="isim">İsim</label>
      <InputText id="isim" v-model="userData.isim" required autofocus />
    </div>
    <div class="field">
      <label for="email">E-Posta Adresi</label>
      <InputText id="email" v-model="userData.email" required type="email" />
    </div>
    <div class="field">
      <label for="yetki">Yetki</label>
      <Dropdown
        id="yetki"
        v-model="userData.yetki"
        :options="yetkiOptions"
        optionLabel="name"
        optionValue="value"
        placeholder="Yetki Seçin"
      />
    </div>
    <div class="field">
      <label for="cekimYetkisi">Çekim Yetkisi</label>
      <Dropdown
        id="cekimYetkisi"
        v-model="userData.cekimYetkisi"
        :options="cekimYetkisiOptions"
        optionLabel="name"
        optionValue="value"
        placeholder="Çekim Yetkisi Seçin"
      />
    </div>
    <div class="field-checkbox">
      <Checkbox id="twoFa" v-model="userData.twoFaGuvenlik" :binary="true" />
      <label for="twoFa">2FA Güvenlik</label>
    </div>
    <template #footer>
      <Button
        label="İptal"
        icon="pi pi-times"
        class="p-button-text"
        @click="$emit('update:visible', false)"
      />
      <Button
        label="Kaydet"
        icon="pi pi-check"
        class="p-button-text"
        @click="save"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import { useUsersStore } from "../stores/users";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  editData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:visible"]);
const usersStore = useUsersStore();

const isEdit = computed(() => !!props.editData);

const yetkiOptions = [
  { name: "Şirket Yöneticisi", value: "Şirket Yöneticisi" },
  { name: "Normal Kullanıcı", value: "Normal Kullanıcı" },
];

const cekimYetkisiOptions = [
  { name: "Çekim Yapabilir", value: "Çekim Yapabilir" },
  { name: "Çekim Yapamaz", value: "Çekim Yapamaz" },
];

const userData = ref({
  isim: "",
  email: "",
  yetki: "",
  cekimYetkisi: "",
  twoFaGuvenlik: false,
  sonGiris: new Date().toISOString(),
});

watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      const data = { ...newVal };
      if ("2faGuvenlik" in data) {
        data.twoFaGuvenlik = data["2faGuvenlik"];
        delete data["2faGuvenlik"];
      }
      userData.value = data;
    } else {
      userData.value = {
        isim: "",
        email: "",
        yetki: "",
        cekimYetkisi: "",
        twoFaGuvenlik: false,
        sonGiris: new Date().toISOString(),
      };
    }
  },
  { immediate: true }
);

const save = () => {
  const saveData = { ...userData.value };
  saveData["2faGuvenlik"] = saveData.twoFaGuvenlik;
  delete saveData.twoFaGuvenlik;

  if (isEdit.value) {
    const index = usersStore.users.findIndex(
      (u) => u.email === props.editData.email
    );
    if (index !== -1) {
      usersStore.updateUser(index, saveData);
    }
  } else {
    usersStore.addUser(saveData);
  }
  emit("update:visible", false);
};
</script>
