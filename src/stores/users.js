import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [
      {
        isim: "Eldar",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
      {
        isim: "Eldar Eldaroğlu",
        email: "elder@just.com",
        yetki: "Şirket Yöneticisi",
        sonGiris: "2025-02-22 11:10:41",
        cekimYetkisi: "Çekim Yapabilir",
        "2faGuvenlik": "2FA Kapalı",
      },
    ],
  }),

  actions: {
    addUser(user) {
      this.users.push(user);
    },

    updateUser(index, user) {
      this.users[index] = user;
    },

    deleteUser(index) {
      this.users.splice(index, 1);
    },
  },
});
