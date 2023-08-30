import {ApiConsoleModule} from '@deepkit/api-console-module';
import {App} from '@deepkit/app';
import {eventDispatcher} from "@deepkit/event";
import {FrameworkModule, onServerMainBootstrapDone} from '@deepkit/framework';
import {LoggerInterface} from '@deepkit/logger';
import {Database} from "@deepkit/orm";
import {PostgresDatabaseAdapter} from "@deepkit/postgres";
import {AutoIncrement, cast, entity, PrimaryKey} from "@deepkit/type";
import "reflect-metadata";

@(entity.name('product')).collection("products")
export class Product {
  id: number & PrimaryKey & AutoIncrement = 0;
  raw?: { [key: string]: any };

  constructor() {}
}

export class PostgresDatabase extends Database {
  constructor() {
    super(new PostgresDatabaseAdapter({
      host: '0.0.0.0',
      port: 54433,
      user: "postgres",
      password: "root"
    }), [Product]);
  }
}

class Bootstrap {
  constructor(private database: PostgresDatabase, private logger: LoggerInterface) {
  }

  // @ts-ignore
  @eventDispatcher.listen(onServerMainBootstrapDone)
  async onMainBoostrap() {
    await this.database.migrate();

    // Seed some items
    const itemsInDb = await this.database.query(Product).filter().find();
    if (itemsInDb.length == 0) {
      await this.database.persist(cast<Product>({raw: {productId: 1, name: "first"}}));
      await this.database.persist(cast<Product>({raw: {productId: 2, name: "second"}}));
    }

    try {
      console.log("Trying to get product with raw.productId")
      const query = this.database.query(Product).filter({"raw.productId": 1});
      console.log(query.findOneOrUndefined());
    } catch (e: any) {
      console.log(e);
    }

    try {
      console.log(`Trying to get product with {"raw": {productId: 1}`)
      const query = this.database.query(Product).filter({"raw": {productId: 1}});
      console.log(query.findOneOrUndefined());
    } catch (e: any) {
      console.log(e);
    }
  }
}

const app = new App({
  providers: [PostgresDatabase],
  listeners: [
    Bootstrap,
  ],
  controllers: [],
  imports: [
    new FrameworkModule({
      debug: true,
    }),
    new ApiConsoleModule({
      path: '/api'
    }),
  ]
});

app.loadConfigFromEnv({prefix: 'APP_'})
.run();
