import { TwoCheckotApi } from "../util";

class AdditionalFields {
    constructor(private api: TwoCheckotApi) { }

    async createAdditionalField(field: AdditionalField): Promise<boolean> {
        let res = await this.api.post('https://api.2checkout.com/rest/5.0/additionalfields/', field);
        return res == true;
    }

    async getAdditionalFields(): Promise<AdditionalField[]> {
        let res = await this.api.get('https://api.2checkout.com/rest/5.0/additionalfields/', null);
        return res;
    }

    async getAdditionalField(FieldCode: string): Promise<AdditionalField> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/additionalfields/${FieldCode}`, null);
        return res;
    }
}

export default AdditionalFields;

export interface AdditionalField {
    Label: string;
    Code: string;
    Type: string;
    ApplyTo: string;
    Values: string[];
    ValidationRule: string;
    Translations: any;
}