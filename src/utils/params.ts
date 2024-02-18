import type { ToRefs } from "vue";
import { toValue } from "vue";
import type { SocialNetworks } from "../types/social-networks.ts";
import type { ShareParams } from "../types/share-params.ts";

const getNetworkSharingTemplate = (networkKey: string, netWorkList: SocialNetworks): string => {
  const ua = window.navigator.userAgent.toLowerCase();
  /**
   * On IOS, SMS sharing link need a special formatting
   * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
   */
  if (networkKey === "sms" && (ua.includes("iphone") || ua.includes("ipad"))) {
    return netWorkList[networkKey].replace(":?", ":&");
  }
  return netWorkList[networkKey];
};
const encodeHashtags = (hashTags: string, networkKey: string) => {
  if (networkKey === "facebook" && hashTags && hashTags.length > 0) {
    return `%23${hashTags.split(",")[0]}`;
  }
  return hashTags;
};

const getDefaultParams = (): Required<ShareParams> => {
  return {
    network: "",
    url: "",
    title: "",
    description: "",
    quote: "",
    hashtags: "",
    twitterUser: "",
    media: "",
  };
};
const normalizeParams = (shareParams: ShareParams | ToRefs<ShareParams>): Required<ShareParams> => {
  const defaultParams = getDefaultParams();
  return Object.fromEntries((Object.keys(defaultParams) as Array<keyof ShareParams>).map((paramName) => {
    let paramValue = toValue(shareParams[paramName]) || defaultParams[paramName];
    paramValue = paramName === "hashtags" ? encodeHashtags(paramValue, paramName) : encodeURIComponent(paramValue);
    return [paramName, paramValue];
  })) as Required<ShareParams>;
};

const processLinkTemplate = (linkTemplate: string, linkParts: Required<ShareParams>) => {
  return linkTemplate
    .replace(/@tu/g, linkParts.twitterUser)
    .replace(/@u/g, linkParts.url)
    .replace(/@t/g, linkParts.title)
    .replace(/@d/g, linkParts.description)
    .replace(/@q/g, linkParts.quote)
    .replace(/@h/g, linkParts.hashtags)
    .replace(/@m/g, linkParts.media);
};
export {
  getNetworkSharingTemplate,
  encodeHashtags,
  getDefaultParams,
  normalizeParams,
  processLinkTemplate,
};
