import type { ShareParams } from "./types/share-params.ts";
import type { SocialNetworks } from "./types/social-networks.ts";
import ShareNetwork from "./components/ShareNetwork.vue";
import { useShareLink } from "./composables/use-share-link.ts";
import networks from "./data/networks.ts";
import Vue3SocialSharingPlugin from "./plugin/vue3-social-sharing.ts";

export { networks as availableNetworks, ShareNetwork, useShareLink };
export type { ShareParams, SocialNetworks };
export default Vue3SocialSharingPlugin;
