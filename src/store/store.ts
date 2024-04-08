import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/api"
import searchSlice from './search/searchSlice'
import userSlice from "./user/userSlice"


export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
        search: searchSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch