export type apiKey = {
    apiKey: string,
}

export type source = {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string,
}

export type article = {
    source: source,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
}

export interface IEverything {
    status: string,
    totalResults: number,
    articles: article[],
}

export interface ITopHeadlines extends IEverything {}


export interface ISources {
    status: string,
    sources: source[],
}

export type voidGenericCallback<T> = (data: T) => void;