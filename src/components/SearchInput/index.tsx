import React, { useEffect, useState } from 'react'
import styles from './search.module.scss'
import { useLazyGetGitRepoQuery } from '../../store/api/api';
import { IRepo } from '../../types/repo.type';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { setSearch } from '../../store/search/searchSlice';
import { addTodoToLockalStorage } from '../../utils/addTodoToLockalStorage';
import Preloader from '../Preloader';
import { setUser } from '../../store/user/userSlice';

interface SearchInputProps{
    setCards: (cards: IRepo[]) => void;
}

const SearchInput:React.FC<SearchInputProps> = ({setCards}) => {
    const [getPosts] = useLazyGetGitRepoQuery();
    const [loading, setLoading] = useState(false)
    const searchValue = useAppSelector(state=>state.search)
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearch(e.target.value));
    }
    const handleSubmit = (search: string)=>{
        const searchString = "https://github.com/";
        const startIndex = search.indexOf(searchString);
        if (startIndex !== -1) { // Если найдена подстрока
            const resultString = search.substring(startIndex + searchString.length);
            setLoading(true)
            getPosts({url: resultString}).
            then((data)=>{
                if(data.isError === false) { 
                    const dataRepo = data.data as IRepo[]
                    const currentUser ={
                        type: dataRepo[0].user.type,
                        login: dataRepo[0].user.login,
                        html_url: dataRepo[0].user.html_url
                    }
                    dispatch(setUser(currentUser))
                    addTodoToLockalStorage(dataRepo, setCards, search)
                }else{
                    dispatch(setUser(null))
                    setCards([])
                }                
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
                setLoading(false)
            })
            
        } else {
            alert('url must start https://github.com/ ')
        }
    }

    useEffect(()=>{
        const localSearch = localStorage.getItem('setSearch')
        if(localSearch){
            dispatch(setSearch(localSearch))
            handleSubmit(localSearch)        
        }
    },[] )

    return (
        <>
            {loading && <Preloader/>}
            <div className={styles.search}>
                <input value={searchValue} onChange={handleChange}/>
                <button onClick={()=>handleSubmit(searchValue)}>Loading issuse</button>
            </div> 
        </>
    )
}

export default SearchInput