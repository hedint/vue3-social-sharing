import type AvailableNetworks from "../data/networks.ts";

export type SocialNetworks = typeof AvailableNetworks & Record<string, string>;