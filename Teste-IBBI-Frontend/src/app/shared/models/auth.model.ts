export interface UserModel{
    id?:number
    username:string
    password?:string
    role:string
}
export interface AuthModel{
    username:string
    password:string
}
export interface AuthResponse{
    username:string
    role:string
    acess_token:string

}
export interface Cargo{
    role:string
}