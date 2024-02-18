import "./assets/main.css";
import Vue3SocialSharingPlugin from "vue3-social-sharing";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
app.use(Vue3SocialSharingPlugin);
