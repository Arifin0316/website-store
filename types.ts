

export interface Banner{
    id: string,
    label: string,
    imageUrl: string
}

export interface Catagori{
    id: string,
    name: string,
    banner: Banner
}

export interface Prodak {
    id: string,
    name: string,
    price: string,
    catagori: Catagori,
    isFiatured: boolean,
    images: Images[]

}

export interface Images {
    url: string 
    id: string,
    ulr: string
}