import { apiKey } from '../../types/index';

type endpointType = 'everything' | 'sources';

type appRequest = { sources: string } | Record<string, never>;

export type Callback<T> = (data: T) => void;

export default class Loader {
    baseLink: string;
    options: apiKey;
    
    constructor(baseLink: string, options: apiKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    // getResp(
    //     { endpoint, options = {} }: { endpoint: endpointType, options?: appRequest },
    //     callback = (): void => {
    //         console.error('No callback for GET response');
    //     }
    // ) {
    //     this.load('GET', endpoint, callback, options);
    // }
    getResp<T>(
        { endpoint, options = {} }: { endpoint: endpointType, options?: appRequest },
        callback: Callback<T>,
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(endpoint: endpointType, options?: appRequest) {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<U>(method: string, endpoint: endpointType, callback: Callback<U>, options: appRequest) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: U) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}
