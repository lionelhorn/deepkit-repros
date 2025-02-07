import {eventDispatcher} from "@deepkit/event";
import {onServerMainBootstrapDone} from "@deepkit/framework";
import {typeOf} from "@deepkit/type";
import {User} from "./User.js";

export class Bootstrap {
  @eventDispatcher.listen(onServerMainBootstrapDone)
  async onMainBoostrap() {
    const t = typeOf<User>();
    console.log(t);
  }
}