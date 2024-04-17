export type UserType = {
    id:number,
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    dateCreated:string
}
export type PostType = {
    id:number,
    title:string,
    body:string,
    dateCreated:string,
    author:UserType
}

export type PostFormDataType = {
    title:string,
    body:string
}
