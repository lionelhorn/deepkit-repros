import {App} from '@deepkit/app';
import {FrameworkModule} from '@deepkit/framework';
import {Bootstrap} from "./bootstrap.js";

new App({
  listeners: [Bootstrap],
  imports: [
    new FrameworkModule({
      debug: true
    }),
  ]
}).run()
