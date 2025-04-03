import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router'
import WebSocketService from '@/services/websocket';
import { useMainStore } from '@/stores/main';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Aura from '@primevue/themes/aura';

import 'primeicons/primeicons.css';
import './assets/main.css';

console.log('WebSocketService initialized:', WebSocketService);

const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    }
  }
});
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Button", Button);
app.component("InputText", InputText);
app.use(pinia);
app.use(router)

// Start the pulse effect
const store = useMainStore();
store.startPulse();

app.mount('#app');