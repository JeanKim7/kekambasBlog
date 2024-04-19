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

export type UserFormDataType = {
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    password:string,
    confirmPassword:string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'


export type TokenType = {
    token:string,
    tokenExpiration:string
}
