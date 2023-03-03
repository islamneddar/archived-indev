export interface PageMeta {
    page : number,
    take : number,
    itemCount : number,
    pageCount : number,
    hasPreviousPage : boolean,
    hasNextPage : boolean
}


export interface PaginationRequestMeta {
    page : number,
    take : number,
    order : Order
}

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC',
}