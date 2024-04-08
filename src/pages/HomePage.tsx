import { useState } from 'react'
import SearchInput from '../components/SearchInput'
import { IRepo } from '../types/repo.type'

import styles from './homes.module.scss'
import User from '../components/User'
import Board from '../components/Board'

const HomePage = () => {
    const [cards, setCards] = useState<IRepo[]>([])

    return (
        <div className={styles.container}>
            <SearchInput setCards={setCards}/>
            <User/>
            {cards.length > 0 ? 
            <Board cards={cards} setCards={setCards}/> : 
            <div className={styles.not_found}>No Todo</div>}      
        </div>
    )
}

export default HomePage