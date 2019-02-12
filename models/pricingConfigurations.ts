import { TwoCheckotApi } from "../util";

class PricingConfigurations {
    constructor(private api: TwoCheckotApi) {}

    async addPricingConfiguration(ProductCode: string, configuration: PricingConfiguration): Promise<boolean> {
        let res = await this.api.post(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/pricingconfigurations/`, configuration);
        return res == "TRUE";
    }

    async getPricingConfigurations(ProductCode: string): Promise<PricingConfiguration[]> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/pricingconfigurations/`, null);
        return res;
    }

    async getPricingConfiguration(ProductCode: string, ConfigurationCode: string): Promise<PricingConfiguration[]> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/pricingconfigurations/${ConfigurationCode}/`, null);
        return res;
    }

    async updatePricingConfiguration(ProductCode: string, configuration: PricingConfiguration): Promise<boolean> {
        let res = await this.api.put(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/pricingconfigurations/${configuration.Code}/`, configuration);
        return res == "TRUE";
    }

    async getSKUDetails(ProductCode: string, ConfigurationCode: string, SKUCode: string): Promise<SKUDetails> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/pricingconfigurations/${ConfigurationCode}/sku/${SKUCode}`, null);
        return res;
    }
}

export default PricingConfigurations;

export interface PricingConfiguration {
    Name: string;
    Code: string;
    Default: boolean;
    BillingCountries: [any];
    PricingSchema: string;
    PriceType: string;
    DefaultCurrency: string;
    Prices: {
        Regular: [{
            Amount: number;
            Currency: string;
            MinQuantity: string;
            MaxQuantity: string;
            OptionCodes: [any];
        }];
        Renewal: [{
            Amount: number;
            Currency: string;
            MinQuantity: string;
            MaxQuantity: string;
            OptionCodes: [any];
        }];
    };
    PriceOptions: [{
        Code: string;
        Required: boolean;
    }]
}

export interface SKUDetails {
    PricingConfigurationCode: string;
    ProductCode: string;
    Currency: string;
    PriceOptions: any[];
    PurchaseType: any;
    FromQuantity: any;
    ToQuantity: any;
}