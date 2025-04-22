<template>
  <div>
    <h2>/api/worker-h3/add</h2>
    <pre>{{ workerH3Add }}</pre>
    <h2>/api/worker-h3/say-hello</h2>
    <pre>{{ workerH3DoSayHello }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data: workerH3Add } = await useFetch("/api/worker-h3/add", {
  method: "POST",
  body: { a: 1, b: 2 },
});
console.log(workerH3Add.value);

const { data: workerH3DoSayHello } = await useFetch(
  "/api/worker-h3/say-hello",
  {
    method: "POST",
    body: { str: "world" },
  }
);
console.log(workerH3DoSayHello.value);
</script>
