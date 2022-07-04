import { ApiKey, VoidGenericCallback } from '../../types/types';

type EndpointType = 'everything' | 'sources';

type AppRequest = { sources: string } | Record<string, never>;

export default class Loader {
    private baseLink: string;
    private options: ApiKey;
    
    constructor(baseLink: string, options: ApiKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: { endpoint: EndpointType, options?: AppRequest },
        callback: VoidGenericCallback<T>,
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

    private makeUrl(endpoint: EndpointType, options?: AppRequest) {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<U>(method: string, endpoint: EndpointType, callback: VoidGenericCallback<U>, options: AppRequest) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: U) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}
