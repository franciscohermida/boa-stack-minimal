export default defineEventHandler((event) => {
  console.log("env", event.context.cloudflare.env);
  {
    const result = event.context.cloudflare.env.APP_WORKER.add(1, 2);
    console.log("APP_WORKER.add", result);
  }

  {
    const result = event.context.cloudflare.env.APP_WORKER.doSayHello("world");
    console.log("APP_WORKER.doSayHello", result);
  }

  // TODO: doesn't work
  // const resultDo = event.context.cloudflare.env.DO.sayHello("world");
  // console.log("resultDo", resultDo);

  return "Start by editing <code>server/routes/index.ts</code>.";
});
