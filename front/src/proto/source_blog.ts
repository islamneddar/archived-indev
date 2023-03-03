export interface SourceBlog {
    name : string,
    image : string
}

export enum TypeFeed {
    UNKOWN = "unkown",
    COMMUNITY = "community",
    ORIGINAL = "original",
    NEWS = "news",
    DESIGN = "design",
    DATASCIENCE = "datascience",
    DEVOPS = "devops",
    ALL = "all"
}