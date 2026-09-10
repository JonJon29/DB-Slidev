<script setup lang="ts">
import Schwelle from "../components/schwelle.vue";

</script>

<template>
  <div class="main">
    <header>
      <object class="logo" data="../assets/logos/DB_logo_red_rgb_100px.svg" type="image/svg+xml" />
      <div>Systel</div>
    </header>
    <div class="content">
      <slot />
    </div>
    <Schwelle color="var(--db-red)" :number-of-lines="12" height="50px" id="schwelle"/>
  </div>
</template>

<style scoped>
.main {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

header {
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 40px;
  gap: 16px;
}

#schwelle {
  position: absolute;
  bottom: 0;
  right: 0;
}

.logo {
  height: 50px;
}
</style>
