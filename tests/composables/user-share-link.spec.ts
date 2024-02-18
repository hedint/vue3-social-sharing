import { describe, expect, it, vi } from "vitest";
import { useShareLink } from "../../src/composables/use-share-link";

describe("useShareLink composable - shareLink function", () => {
  it("should call window open", () => {
    const spy = vi.spyOn(window, "open").mockImplementationOnce(() => {

    });
    const { shareLink } = useShareLink();
    shareLink({ url: "https://example.com", network: "facebook" });
    expect(spy).toBeCalledWith("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com&title=&description=&quote=&hashtag=", "sharer", "width=500,height=500");
  });
});
