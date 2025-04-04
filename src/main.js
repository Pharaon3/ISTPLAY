// Импорт основных зависимостей Vue
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "./style.css";
import App from "./App.vue";

//New Lines start here

import WebSocketService from '@/services/websocket';
import { useMainStore } from '@/stores/main';

console.log('WebSocketService initialized:', WebSocketService);

//------

// Импорт стилей PrimeVue
import "primevue/resources/themes/lara-light-blue/theme.css"; // Тема оформления
import "primevue/resources/primevue.min.css"; // Основные стили
import "primeicons/primeicons.css"; // Иконки
import "primeflex/primeflex.css"; // Утилиты FlexBox

// Импорт компонентов PrimeVue
import DataTable from "primevue/datatable"; // Таблица данных
import Column from "primevue/column"; // Колонка таблицы
import Button from "primevue/button"; // Кнопка
import InputText from "primevue/inputtext"; // Текстовое поле
import Dialog from "primevue/dialog"; // Диалоговое окно
import Dropdown from "primevue/dropdown"; // Выпадающий список
import Checkbox from "primevue/checkbox"; // Чекбокс
import ConfirmDialog from "primevue/confirmdialog"; // Диалог подтверждения
import ConfirmationService from "primevue/confirmationservice"; // Сервис подтверждений
import ToastService from "primevue/toastservice"; // Сервис уведомлений
import Toast from "primevue/toast"; // Компонент уведомлений

// Создание приложения Vue
const app = createApp(App);

// Подключение Pinia для управления состоянием
app.use(createPinia());

//New Lines start here
// Start the pulse effect for WebSocket connecting - data comes from "con://idle" over WebSocket
const store = useMainStore();
store.startPulse();

//------

// Подключение PrimeVue и его сервисов
app.use(PrimeVue, {
  ripple: true,
  inputStyle: "filled",
  // Устанавливаем Manrope как основной шрифт для PrimeVue
  styleClass: "manrope-font",
  style: {
    "--font-family": "'Manrope', sans-serif",
  },
});
app.use(ConfirmationService); // Сервис подтверждений
app.use(ToastService); // Сервис уведомлений

// Регистрация глобальных компонентов
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("Checkbox", Checkbox);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Toast", Toast);

// Монтирование приложения
app.mount("#app");
