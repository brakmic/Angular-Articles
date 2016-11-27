### Intro to Angular 2 - Part 6 - ServiceWorkers

[Live Demo](https://brakmic.github.io/sw-demo/)

[Article](http://blog.brakmic.com/intro-to-angular-2-part-6-serviceworkers/)

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
npm run start:hmr 
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

## Building the ServiceWorker

Use 

```
npm run build:sw
```

to create the JavaScript output that will be copied by the above scripts when deploying the app.