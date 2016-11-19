## Building the app

First, install packages with

```
npm install
```

Use

```
npm run start:hmr
```

when developing the app with hot-module reloading. 

Use 

```
npm run build:dev 
```

respective

```
npm run build:prod
```

to deploy the app.

To run the app with Hapi.js execute 

```
ts-node ./server.ts 
```

## Building the WebWorker

Use 

```
npm run build:worker
```

to create the JavaScript output that will be copied by the above scripts when deploying the app.


