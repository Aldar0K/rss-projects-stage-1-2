interface IArticle {
    source: object,
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
    articles: IArticle[],
}

export interface ITopHeadlines {
    status: string,
    totalResults: number,
    articles: IArticle[],
}

interface ISource {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string,
}

export interface ISources {
    status: string,
    sources: ISource[],
}