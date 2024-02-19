<template>
  <main>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125">
    <div class="social-sharing-block">
      <share-network v-for="network in socialList" :key="network" v-slot="{ share }" :network="network" title="My  perfect title" url="https://example.com">
        <i class="fab fah fa-lg" :class="`fa-${network}`" @click="share">
          <span> {{ network.toUpperCase() }}</span>
        </i>
      </share-network>
    </div>
  </main>
</template>

<script setup lang="ts">
const socialList = ["facebook", "twitter", "telegram"];

/*
const { shareLink } = useShareLink();
const share = () => {
  shareLink({
    network: "pinterest",
    url: "https://canpregnantuse.ru",
    title: "My perfect title",
    media: "https://canpregnantuse.ru/images/medication/ultrasound.webp",
  });
};
 */
</script>

<style scoped lang="scss">
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.social-sharing-block {
  cursor: pointer;
  display: flex;
  gap: 1rem;
  margin: 3rem;
  span {
    padding-left: 0.5rem;
    font-weight: 600;
  }
}
</style>
