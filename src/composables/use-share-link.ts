import type { ToRefs } from "vue";
import { inject } from "vue";
import defaultNetworks from "../data/networks.ts";
import type { ShareParams } from "../types/share-params.ts";
import type { SocialNetworks } from "../types/social-networks.ts";
import { getPopupWindow } from "../utils/popup.ts";
import { getNetworkSharingTemplate, normalizeParams, processLinkTemplate } from "../utils/params.ts";

export const useShareLink = () => {
  const networksList = Object.assign({}, defaultNetworks, inject("share-networks", {}) as SocialNetworks);
  const getSharingLink = (shareParams: ShareParams | ToRefs<ShareParams>) => {
    const linkParts = normalizeParams(shareParams);
    if (!linkParts.network || !networksList[linkParts.network]) {
      throw new Error(`Network ${linkParts.network} does not exist`);
    }
    let linkTemplate = getNetworkSharingTemplate(linkParts.network, networksList);
    /**
     * Twitter sharing shouldn't include empty parameter
     * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
     */
    if (linkParts.network === "twitter") {
      if (!linkParts.hashtags.length) {
        linkTemplate = linkTemplate.replace("&hashtags=@h", "");
      }
      if (!linkParts.twitterUser.length) {
        linkTemplate = linkTemplate.replace("&via=@tu", "");
      }
    }
    return processLinkTemplate(linkTemplate, linkParts);
  };
  const shareLink = (shareParams: ShareParams | ToRefs<ShareParams>) => {
    const link = getSharingLink(shareParams);
    const popupWindow = getPopupWindow(link);
    return popupWindow;
  };
  return { getSharingLink, shareLink };
};
