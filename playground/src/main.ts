import { createApp } from "vue";
import Vue3SocialSharingPlugin from "vue3-social-sharing";
import App from "./App.vue";
import "./assets/main.css";

const app = createApp(App);
app.use(Vue3SocialSharingPlugin);
app.mount("#app");
