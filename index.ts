import { TwoCheckotApi } from './util';

class TwoCheckout {

    api: TwoCheckotApi;

    constructor(private merchantCode: string, private secretKey: string) {
        this.api = new TwoCheckotApi(this.merchantCode, this.secretKey);
    }
}

export default TwoCheckout;