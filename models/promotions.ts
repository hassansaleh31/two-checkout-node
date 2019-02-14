import { TwoCheckotApi } from "../util";

class Promotions {
    constructor(private api: TwoCheckotApi) { }

    async createPromotion(promotion: Promotion): Promise<boolean> {
        const res = await this.api.post('https://api.2checkout.com/rest/5.0/promotions/', promotion);
        return res.Name !== undefined;
    }

    async updatePromotion(promotion: Promotion): Promise<boolean> {
        if (!promotion.Code) return false;
        const res = await this.api.put(`https://api.2checkout.com/rest/5.0/promotions/${promotion.Code}/`, promotion);
        return res.Name !== undefined;
    }

    async updatePromotionCoupon(PromotionCode: String, coupon: PromotionCoupon): Promise<boolean> {
        const res = await this.api.post(`https://api.2checkout.com/rest/5.0/promotions/${PromotionCode}/coupons/`, coupon);
        return res.Type !== undefined;
    }

    async addPromotionCoupon(PromotionCode: string, coupon: PromotionCoupon): Promise<boolean> {
        const res = await this.api.put(`https://api.2checkout.com/rest/5.0/promotions/${PromotionCode}/coupons/`, coupon);
        return res.Type !== undefined;
    }

    async addProdutsToPromotion(PromotionCode: string, products: PromotionProduct[]): Promise<boolean> {
        const res = await this.api.put(`https://api.2checkout.com/rest/5.0/promotions/${PromotionCode}/products/`, products);
        return res.length !== undefined;
    }
}

export default Promotions;

export interface Promotion {
    Code?: string;
    Name?: string;
    Description?: string;
    StartDate?: string;
    EndDate?: string;
    MaximumOrdersNumber?: number;
    MaximumQuantity?: number;
    InstantDiscount?: boolean;
    Coupon?: PromotionCoupon;
    Enabled?: boolean;
    ChannelType?: String;
    Type?: String;
    Discount?: {
        Type?: string;
        Value?: number;
        Values?: {
            Currency?: string;
            Amount?: number;
        }[];
        DefaultCurrency?: String;
    };
    Products?: PromotionProduct[];
    PriceThreshold?: {
        Amount?: number;
        Currency?: string;
    };
    Translations?: {
        Name?: string;
        Language?: string;
    }[];
}

export interface PromotionCoupon {
    Type?: String;
    Code?: String;
    Codes?: String[];
}

export interface PromotionProduct {
    Code?: String;
    Id?: number;
    PricingConfigurationCode?: string;
    PricingOptionCodes?: string[];
}