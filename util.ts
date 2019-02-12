import * as crypto from 'crypto';
import axios from 'axios';

// Convert a digit into a two number string
// Example: 1 => '01'
const toTwoDigits = (x: number): string => {
    return x > 9 ? `${x}` : `0${x}`;
}

export class TwoCheckotApi {
    constructor(private merchantCode: string, private secretKey: string) { }

    public async get(url: string, params: any): Promise<any> {
        const headers = await this.generateHeaders();
        const res = await axios({
            method: 'get',
            url,
            headers,
            params
        });
        return res.data;
    }

    public async post(url: string, data: any): Promise<any> {
        const headers = await this.generateHeaders();
        const res = await axios({
            method: 'post',
            data,
            url,
            headers
        });
        return res.data;
    }

    public async put(url: string, data: any): Promise<any> {
        const headers = await this.generateHeaders();
        const res = await axios({
            method: 'put',
            data,
            url,
            headers
        });
        return res.data;
    }

    public async delete(url: string, params: any): Promise<any> {
        const headers = await this.generateHeaders();
        const res = await axios({
            method: 'delete',
            url,
            headers,
            params
        });
        return res.data;
    }

    // To authenticate to the 2Checkout REST API include a header with the following structure into your requests:
    // X-Avangate-Authentication: code="{VENDOR_CODE}" date="{REQUEST_DATE_TIME}" hash="{HASH}"
    // The 2Checkout REST API supports only JSON encoded requests and responses.
    // You need to include the following headers in your requests:
    // Content-Type: application/json
    // Accept: application/json
    private async generateHeaders() {
        const date = new Date();
        const formatedDate = this.getFormatedUTCDate(date);
        const hash = await this.generateHash(formatedDate);
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Avangate-Authentication': `code="${this.merchantCode}" date="${formatedDate}" hash="${hash}"`
        };
        return headers;
    }

    // Generate required md5 hash string
    // HASH: The hashmac digest with an md5 hashing algorithm of the following: LEN(VENDOR_CODE) + VENDOR_CODE + LEN(REQUEST_DATE_TIME) + REQUEST_DATE_TIME.
    // Use the secret key associated with your account for the hashing.
    private async generateHash(formatedDate: string): Promise<string> {
        const authString = `${this.merchantCode.length}${this.merchantCode}${formatedDate.length}${formatedDate}`;
        const saltedHashAsync = crypto.createHmac('md5', this.secretKey).update(authString).digest('hex');
        return saltedHashAsync;
    }

    // Convert date to YYYY-MM-DD hh:mm:ss
    // REQUEST_DATE_TIME: The UTC date time of the request. Format: YYYY-MM-DD HH:MM:SS.
    // You must provide the time of the request in the GMT timezone.
    private getFormatedUTCDate(date: Date): string {
        return `${date.getUTCFullYear()}-${toTwoDigits(date.getUTCMonth() + 1)}-${toTwoDigits(date.getUTCDate())} ${toTwoDigits(date.getUTCHours())}:${toTwoDigits(date.getUTCMinutes())}:${toTwoDigits(date.getUTCSeconds())}`;
    }
}