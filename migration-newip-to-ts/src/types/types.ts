export type ApiKey = {
    apiKey: string,
}

export type Source = {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string,
}

export type Article = {
    source: Source,
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
    articles: Article[],
}

export interface ISources {
    status: string,
    sources: Source[],
}

export type VoidGenericCallback<T> = (data: T) => void;