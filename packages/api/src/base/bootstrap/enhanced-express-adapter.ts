/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

export class EnhancedExpressAdapter extends ExpressAdapter {
  private readonly log = new Logger(this.constructor.name);
  constructor() {
    super();
    this.disable('x-powered-by');
    // this.set('json replacer', (_: any, v: any) => {
    //   if (v instanceof Timestamp) {
    //     return v.toDate().toISOString();
    //   }
    //   return v;
    // });
  }
}
