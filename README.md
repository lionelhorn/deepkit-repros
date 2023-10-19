Error is
```shell

```

How to reproduce
````shell
docker run -p 5432:5432 --name postgres-tmp -e POSTGRES_PASSWORD=root -d postgres 
npm run dev
docker stop postgres-tmp
docker rm postgres-tmp
````
