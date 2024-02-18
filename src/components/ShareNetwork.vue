<script lang="ts">
import { defineComponent, h } from "vue";
import { useShareLink } from "../composables/use-share-link.ts";

export default defineComponent({
  props: {
    network: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    quote: {
      type: String,
      default: "",
    },
    hashtags: {
      type: String,
      default: "",
    },
    twitterUser: {
      type: String,
      default: "",
    },
    media: {
      type: String,
      default: "",
    },
  },
  setup(_props, ctx) {
    const { shareLink } = useShareLink();
    return () => {
      if (ctx.slots.default) {
        return ctx.slots.default({ share: () => shareLink(_props) });
      }
      return h("div", { onClick: () => shareLink(_props) }, "Share");
    };
  },
});
</script>
