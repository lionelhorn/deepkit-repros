Error is
```shell
[ERROR] unhandledRejection Error: No type found for path raw.productId
    at resolvePath (/home/re/PROG/deepkit-repros/node_modules/@deepkit/type/dist/cjs/src/path.js:43:15)
```

How to reproduce
````shell
docker run -p 5432:5432 --name postgres-tmp -e POSTGRES_PASSWORD=root -d postgres 
npm run build
npm run dev
docker stop postgres-tmp
docker rm postgres-tmp
````
