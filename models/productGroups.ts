import { TwoCheckotApi } from "../util";

class ProductGroups {
    constructor(private api: TwoCheckotApi) { }

    async createProductGroup(group: ProductGroup): Promise<boolean> {
        let res = await this.api.post('https://api.2checkout.com/rest/5.0/productgroups/', group);
        return res == "TRUE";
    }

    async getProductGroup(ProductGroupCode: string): Promise<ProductGroup> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/productgroups/${ProductGroupCode}/`, null);
        return res;
    }

    async getProductGroups(): Promise<ProductGroup[]> {
        let res = await this.api.get(`https://api.2checkout.com/rest/5.0/productgroups/`, null);
        return res;
    }

    async assignProductToGroup(ProductCode: string, ProductGroupCode: string): Promise<boolean> {
        let res = await this.api.post(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/productgroups/${ProductGroupCode}/`, null);
        return res == 'TRUE';
    }

    async unassignProductFromGroup(ProductCode: string, ProductGroupCode: string): Promise<boolean> {
        let res = await this.api.delete(`https://api.2checkout.com/rest/5.0/products/${ProductCode}/productgroups/${ProductGroupCode}/`, null);
        return res == 'TRUE';
    }
}

export default ProductGroups;

export interface ProductGroup {
    Name: string;
    Code: string;
    TemplateName: string;
    Description: string;
}