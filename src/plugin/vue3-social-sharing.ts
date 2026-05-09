import type { Plugin } from "vue";
import type { SocialNetworks } from "@/types/social-networks.ts";
import ShareNetwork from "../components/ShareNetwork.vue";

const plugin: Plugin = {
  install(app, options: { shareNetworks?: SocialNetworks } = {}) {
    app.provide("share-networks", options.shareNetworks || {});
    app.component("share-network", ShareNetwork);
  },
};
export default plugin;
