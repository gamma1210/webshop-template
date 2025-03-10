import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './style.css'

const app = createApp(App);
app.config.globalProperties.$appName = import.meta.env.VITE_APP_NAME;
app.use(router);
app.mount("#app");