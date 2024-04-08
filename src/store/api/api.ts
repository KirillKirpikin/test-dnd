import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo } from "../../types/repo.type";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl:'https://api.github.com/repos/' }),
    tagTypes: ['Git'],
    endpoints:(builder)=>({
        getGitRepo: builder.query<IRepo[],{url:string}>({
            query:({url})=> `/${url}/issues`
        })
    })
})

export const {
    useLazyGetGitRepoQuery
} = api