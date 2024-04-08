
export interface User{
    type: string,
    login: string,
    html_url: string
}

export interface IRepo {
    id: string,
    number: number,
    title: string, 
    user: User,
    comments: number,
    created_at: string,
    html_url:string
    column: string
}