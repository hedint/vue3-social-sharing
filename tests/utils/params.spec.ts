import { describe, expect, it, vi } from "vitest";
import {
  getDefaultParams,
  getNetworkSharingTemplate,
  processLinkTemplate,
} from "../../src/utils/params";
import type { ShareParams } from "../../src/types/share-params";
import networks from "../../src/data/networks";

const getParams = (params: Partial<ShareParams>): Required<ShareParams> => {
  return Object.assign(getDefaultParams(), params);
};
const template = "test?u=@u&t=@t&d=@d&q=@q&h=@h&m=@m";

describe("processLinkTemplate util params", () => {
  it("replace url param", () => {
    const result = processLinkTemplate(template, getParams({ url: "test" }));
    expect(result).toContain("test?u=test&t=&d=&q=&h=&m=");
  });
  it("replace title param", () => {
    const result = processLinkTemplate(template, getParams({ title: "test" }));
    expect(result).toContain("test?u=&t=test&d=&q=&h=&m=");
  });
  it("replace description param", () => {
    const result = processLinkTemplate(template, getParams({ description: "test" }));
    expect(result).toContain("test?u=&t=&d=test&q=&h=&m=");
  });
  it("replace quote param", () => {
    const result = processLinkTemplate(template, getParams({ quote: "test" }));
    expect(result).toContain("test?u=&t=&d=&q=test&h=&m=");
  });
  it("replace hashtags param", () => {
    const result = processLinkTemplate(template, getParams({ hashtags: "test" }));
    expect(result).toContain("test?u=&t=&d=&q=&h=test&m=");
  });
  it("replace media param", () => {
    const result = processLinkTemplate(template, getParams({ media: "test" }));
    expect(result).toContain("test?u=&t=&d=&q=&h=&m=test");
  });
  it("replace twitterUser param", () => {
    const result = processLinkTemplate("test?u=@u&t=@t&d=@d&q=@q&h=@h&m=@m&v=@tu", getParams({ twitterUser: "test" }));
    expect(result).toContain("test?u=&t=&d=&q=&h=&m=&v=test");
  });
});

describe("getNetworkSharingTemplate util params", () => {
  it("returns custom social network template by key", () => {
    const result = getNetworkSharingTemplate("test", { test: "test", ...networks });
    expect(result).toEqual("test");
  });

  it("returns default network template by key", () => {
    const result = getNetworkSharingTemplate("facebook", { ...networks });
    expect(result).toEqual(networks.facebook);
  });
  it("check special case for sms and iphone", () => {
    const navigatorMock = { userAgent: "iphone" };
    vi.stubGlobal("navigator", navigatorMock);
    const result = getNetworkSharingTemplate("sms", { ...networks });
    expect(result).toEqual("sms:&body=@t%0D%0A@u%0D%0A@d");
    vi.unstubAllGlobals();
  });
});
