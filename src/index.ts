import { useShareLink } from "./composables/use-share-link.ts";
import ShareNetwork from "./components/ShareNetwork.vue";
import Vue3SocialSharingPlugin from "./plugin/vue3-social-sharing.ts";
import networks from "./data/networks.ts";
import type { SocialNetworks } from "./types/social-networks.ts";
import type { ShareParams } from "./types/share-params.ts";

export { useShareLink, ShareNetwork, networks as availableNetworks };
export type { SocialNetworks, ShareParams };
export default Vue3SocialSharingPlugin;
