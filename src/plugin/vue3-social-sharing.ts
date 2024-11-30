import type { Plugin } from "vue";
import ShareNetwork from "../components/ShareNetwork.vue";
import type { SocialNetworks } from "@/types/social-networks.ts";

const plugin: Plugin = {
  install(app, options: { shareNetworks?: SocialNetworks } = {}) {
    app.provide("share-networks", options.shareNetworks || {});
    app.component("share-network", ShareNetwork);
  },
};
export default plugin;
