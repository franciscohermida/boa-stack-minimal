<template>
  <div class="w-screen h-screen align-middle flex flex-col gap-2 justify-center items-center">
    <div>
      <h1 class="text-xl font-medium">app-vue DurableVue result: </h1>
      <p>{{ message }}</p>
      <h1 class="text-xl font-medium">APP_WORKER.add result: </h1>
      <p>{{ message2 }}</p>
      <h1 class="text-xl font-medium">APP_WORKER.doSayHello result: </h1>
      <p>{{ message3 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");
const message2 = ref("");
const message3 = ref("");
async function fetchData() {
  {
    const res = await fetch("/api/do");
    const data = await res.json();
    console.log(data);
    message.value = data.message;
  }

  {
    const res = await fetch("/api/app-worker/add");
    const data = await res.json();
    console.log("/api/app-worker/add", data);
    message2.value = data.result;
  }

  {
    const res = await fetch("/api/app-worker/do-say-hello");
    const data = await res.json();
    console.log("/api/app-worker/do-say-hello", data);
    message3.value = data.result;
  }
}

fetchData();
</script>
