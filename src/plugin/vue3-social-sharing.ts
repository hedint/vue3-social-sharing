import type { Plugin } from "vue";
import ShareNetwork from "./components/ShareNetwork.vue";

const plugin: Plugin = {
  install(app, options = {}) {
    app.provide("share-networks", options.shareNetworks || {});
    app.component("share-network", ShareNetwork);
  },
};
export default plugin;
