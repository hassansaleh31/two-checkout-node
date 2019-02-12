import { TwoCheckotApi } from "../util";

class PriceOptionGroups {
    constructor(private api: TwoCheckotApi) { }

    async createPriceOption(priceOptionGroup: PriceOptionGroup): Promise<boolean> {
        let res = await this.api.post('https://api.2checkout.com/rest/5.0/priceoptions/', priceOptionGroup);
        return res == 'TRUE';
    }

    async updatePriceOption(GroupCode: string, priceOptionGroup: PriceOptionGroup): Promise<boolean> {
        let res = await this.api.put(`https://api.2checkout.com/rest/5.0/priceoptions/${GroupCode}/`, priceOptionGroup);
        return res == 'TRUE';
    }

    async getPriceOptionGroups(options: { Name?: string, Types?: string[], Limit?: number, Page?: number }): Promise<PriceOptionGroup[]> {
        let res = await this.api.get('https://api.2checkout.com/rest/5.0/priceoptions/', options);
        return res;
    }

    async getPriceOptionGroup(GroupCode: string): Promise<PriceOptionGroup> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/priceoptions/${GroupCode}/`, null);
        return res;
    }

    async getAssignedPricePriceOptionGroups(ProductCode: string): Promise<PriceOptionGroup[]> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/priceoptions/`, null);
        return res;
    }
}

export default PriceOptionGroups;

export interface PriceOptionGroup {
    Type: string;
    Options: {
        Code: string;
        ScaleMin: string;
        ScaleMax: string;
        SubscriptionImpact: any;
        PriceImpact: {
            Amounts: any;
            ImpactOn: any;
            Method: string;
            Percent: string;
            Impact: string;
        };
        Default: boolean;
        Name: string;
        Description: string;
        Translations: {
            Name: string;
            Description: string;
            Language: string;
        }[];
    }[];
    Code: string;
    Required: boolean;
    Name: string;
    Description: string;
    Translations: {
        Name: string;
        Description: string;
        Language: string;
    }[];
}