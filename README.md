# Vue 3 social sharing

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg?style=flat-square" alt="Vue 2"></a>

Style agnostic Vue 3 plugin for social sharing your links on major social networks.
Typescript friendly! <br/>
Basically it's a modern fork of [vue-social-sharing](https://github.com/nicolasbeauvais/vue-social-sharing) library.
If you are using vue 2 you should use that library.

## Available networks

`Baidu`
`Buffer`
`Email`
`EverNote`
`Facebook`
`FlipBoard`
`HackerNews`
`InstaPaper`
`Line`
`LinkedIn`
`Messenger`
`Odnoklassniki`
`Pinterest`
`Pocket`
`Reddit`
`Skype`
`SMS`
`StumbleUpon`
`Telegram`
`Tumblr`
`Twitter`
`Viber`
`VK`
`Weibo`
`WhatsApp`
`Wordpress`
`Xing`
`Yammer`

## Installation 

```bash
# Using pnpm
pnpm add -D vue3-social-sharing

# Using yarn
yarn add --dev vue3-social-sharing

# Using npm
npm install --save-dev vue3-social-sharing
```

## Usage

### As composable

```vue
<script setup lang="ts">
  import {useShareLink} from "vue3-social-sharing";
  const {shareLink} = useShareLink();
  const share = () => {
    shareLink({
      network: "facebook",
      url: "https://example.com"
    })
  }
</script>

<template>
  <main>
    <span @click="share">Share on facebook</span>
  </main>
</template>
```

### As Vue plugin

You can use this package as a [regular vue plugin](https://vuejs.org/guide/reusability/plugins.html#introduction). 

```typescript
import Vue3SocialSharingPlugin from "vue3-social-sharing";


const app = createApp(App);
app.mount("#app");
app.use(Vue3SocialSharingPlugin);
```

After you'll be able to use ShareNetwork component in your app like this:
```vue

<ShareNetwork
    network="facebook"
    url="https://example.com"
    v-slot="{ share }"
  >
    <span @click="share">Share on Facebook</span>
</ShareNetwork>

```

### As renderless component

```vue
<script setup lang="ts">
import { ShareNetwork } from "vue3-social-sharing";
</script>

<template>
  <ShareNetwork
      network="facebook"
      url="https://example.com"
      v-slot="{ share }"
  >
    <span @click="share">Share on Facebook</span>
  </ShareNetwork>
</template>
```

## Available properties

The `url` is the only property required for all networks.


| Prop           | Type   | Description                                                |
|----------------|--------|------------------------------------------------------------|
| `url*`         | String | URL to share.                                              |
| `network*`     | String | Network name.                                              |
| `title`        | String | Sharing title (if available).                              |
| `description`  | String | Sharing description (if available).                        |
| `quote`        | String | Facebook quote (Facebook only).                            |
| `hashtags`     | String | A list of comma-separated hashtags (Twitter and Facebook). |
| `twitter-user` | String | Twitter user (Twitter only).                               |
| `media`        | String | Url to a media (Pinterest, VK, Weibo, and Wordpress).      |

## More examples?

You can find more examples in the playground dir of this repo.

## Feature request

Feel free to open an issue to ask for a new social network support.