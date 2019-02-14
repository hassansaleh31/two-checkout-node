import { TwoCheckotApi } from './util';

import Products from './models/products';
import ProductGroups from './models/productGroups';
import PricingConfigurations from './models/pricingConfigurations';
import PriceOptionGroups from './models/priceOptionGroups';
import AdditionalFields from './models/additionalFields';
import Promotions from './models/promotions';

class TwoCheckout {

    private api: TwoCheckotApi;

    public products: Products;
    public productGroups: ProductGroups;
    public pricingConfigurations: PricingConfigurations;
    public priceOptionGroups: PriceOptionGroups;
    public additionalFields: AdditionalFields;
    public promotions: Promotions;

    constructor(private merchantCode: string, private secretKey: string) {
        this.api = new TwoCheckotApi(this.merchantCode, this.secretKey);

        this.products = new Products(this.api);
        this.productGroups = new ProductGroups(this.api);
        this.pricingConfigurations = new PricingConfigurations(this.api);
        this.priceOptionGroups = new PriceOptionGroups(this.api);
        this.additionalFields = new AdditionalFields(this.api);
        this.promotions = new Promotions(this.api);
    }

}

export default (merchantCode: string, secretKey: string) => new TwoCheckout(merchantCode, secretKey);