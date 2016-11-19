import * as _ from 'lodash';
import { NwClient } from './nw.client';

onmessage = (e: MessageEvent) => {
    const client = new NwClient();
    client.get(e.data.table).subscribe(msg => {
        const result = _.slice(msg.data);
        (<any>postMessage)(result);
    });
};
