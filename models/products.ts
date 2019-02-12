import { TwoCheckotApi } from "../util";
import { PricingConfiguration } from "./pricingConfigurations";

class Products {
    constructor(private api: TwoCheckotApi) { }

    async getProducts(params: ProductQueryParameters): Promise<Product[]> {
        const res = await this.api.get(`https://api.2checkout.com/rest/5.0/products/`, params);
        return res.Items;
    }

    async getProduct(ProductCode: string): Promise<Product> {
        const res = await this.api.get(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/`, null)
        return res;
    }

    async addProduct(product: Product): Promise<boolean> {
        const res = await this.api.post('https://api.2checkout.com/rest/5.0/products/', product)
        return res == "TRUE";
    }

    async updateProduct(product: Product): Promise<boolean> {
        const res = await this.api.put('https://api.2checkout.com/rest/5.0/products/', product)
        return res == "TRUE";
    }

    async enableProduct(ProductCode: string): Promise<boolean> {
        const res = await this.api.post(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/`, null)
        return res == "TRUE";
    }

    async deleteProduct(ProductCode: string): Promise<boolean> {
        const res = await this.api.delete(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/`, null)
        return res == "TRUE";
    }
}

export default Products

export interface Product {
    AvangateId: string;
    ProductCode: string;
    ProductType: string;
    ProductName: string;
    ProductVersion: string;
    PurchaseMultipleUnits: boolean;
    GroupName: string;
    ShippingClass: {
        Name: string;
        Amount: string;
        Currency: string;
        ApplyTo: any;
        Type: string;
    };
    GiftOption: boolean;
    ShortDescription: string;
    LongDescription: string;
    SystemRequirements: string;
    ProductCategory: string;
    Platforms: [{
        IdPlatform: string;
        PlatformName: string;
        Category: string;
    }];
    ProductImages: [{
        Default: boolean;
        URL: string;
    }],
    TrialUrl: string;
    TrialDescription: string;
    Enabled: boolean;
    AdditionalFields: [any];
    Translations: [{
        LongDescription: string;
        TrialUrl: string;
        TrialDescription: string;
        SystemRequirements: string;
        Name: string;
        Description: string;
        Language: string;
    }];
    PricingConfigurations: PricingConfiguration[];
    Prices: [any];
    BundleProducts: [any];
    Fulfillment: string;
    GeneratesSubscription: boolean;
    SubscriptionInformation: {
        DeprecatedProducts: [any];
        BundleRenewalManagement: string;
        BillingCycle: string;
        BillingCycleUnits: string;
        IsOneTimeFee: boolean;
        ContractPeriod: {
            Action: string;
            EmailsDuringContract: boolean;
            Period: number;
            PeriodUnits: string;
            IsUnlimited: boolean;
        };
        UsageBilling: number;
        GracePeriod: {
            Type: string;
            PeriodUnits: string;
            Period: string;
            IsUnlimited: boolean;
        };
        RenewalEmails: {
            Type: string;
            Settings: {
                ManualRenewal: {
                    Before30Days: boolean;
                    Before15Days: boolean;
                    Before7Days: boolean;
                    Before1Day: boolean;
                    OnExpirationDate: boolean;
                    After5Days: boolean;
                    After15Days: boolean;
                };
                AutomaticRenewal: {
                    Before30Days: boolean;
                    Before15Days: boolean;
                    Before7Days: boolean;
                    Before1Day: boolean;
                    OnExpirationDate: boolean;
                    After5Days: boolean;
                    After15Days: boolean;
                };
            };
        };
    };
    FulfillmentInformation: {
        IsStartAfterFulfillment: boolean;
        IsElectronicCode: boolean;
        IsDownloadLink: boolean;
        IsBackupMedia: boolean;
        IsDownloadInsuranceService: boolean;
        IsInstantDeliveryThankYouPage: boolean;
        IsDisplayInPartnersCPanel: boolean;
        CodeList: {
            Code: string;
            Name: string;
            Type: string;
        };
        BackupMedia: {
            Code: string;
            Name: string;
            Type: string;
        };
        ProductFile: {
            Code: string;
            Name: string;
            File: string;
            Version: string;
            Size: string;
            Type: string;
            LastUpdate: string;
        };
        AdditionalInformationByEmail: string;
        AdditionalInformationEmailTranslations: [{
            Name: string;
            Description: string;
            Language: string;
        }];
        AdditionalThankYouPage: string;
        AdditionalThankYouPageTranslations: [{
            Name: string;
            Description: string;
            Language: string;
        }];
    };
}

export interface ProductQueryParameters {
    Name?: string;
    Types?: string[];
    Enabled?: boolean;
    GroupName?: string;
    Limit?: number;
    Page?: number;
}