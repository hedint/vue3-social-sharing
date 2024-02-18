import { isClient } from "./environment.ts";

const getPopupWindowPosition = (popupWidth: number, popupHeight: number) => {
  if (!isClient()) {
    return null;
  }
  const width = window.innerWidth || (document.documentElement.clientWidth || window.screenX);
  const height = window.innerHeight || (document.documentElement.clientHeight || window.screenY);
  const systemZoom = width / window.screen.availWidth;
  const popupLeft = (width - popupWidth) / 2 / systemZoom + (window.screenLeft !== undefined ? window.screenLeft : window.screenX);
  const popupTop = (height - popupHeight) / 2 / systemZoom + (window.screenTop !== undefined ? window.screenTop : window.screenY);
  return {
    top: popupTop,
    left: popupLeft,
    width: popupWidth,
    height: popupHeight,
  };
};
const formatPopupWindowParams = (params: Record<string, string | number>) => {
  return Object.entries(params).map(([key, value]) => {
    return value ? `${key}=${value}` : "";
  }).filter(i => i).join(",");
};
const getPopupWindow = (link: string) => {
  if (!isClient()) {
    return null;
  }
  if (link.substring(0, 4) !== "http") {
    return window.open(link, "_blank");
  }
  const popupWindowPosition = getPopupWindowPosition(500, 500);
  if (!popupWindowPosition) {
    return null;
  }
  const popupWindow = window.open(link, "sharer", formatPopupWindowParams(popupWindowPosition));
  return popupWindow;
};
export {
  getPopupWindow,
  getPopupWindowPosition,
  formatPopupWindowParams,
};
