export interface ProductModel{
    productId?: number,
    productName: string,
    productImageUrl: string,
    productPrice: number,
    productDesc: string,
    productCategory: string,
    productAmount:number,
    productAmountSuggestion: number
    vendorName?: string
}

export interface CategoriesModel{
    categoryId?: number
    categoryName:string
    categoryDesc?: string
}

export interface BuyModel{
    productId?:number,
    productName:string,
    productCategory:string,
    soldAmount:number,
    clientName?:string,
    vendorName?:string,
    soldTime?:string
}