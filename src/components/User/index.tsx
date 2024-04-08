import { useAppSelector } from '../../hooks/useTypedSelector'

import styles from './user.module.scss'

const User = () => {
    const {currentUser} = useAppSelector(state=>state.user)
    return (
        <>
            {currentUser && 
                <a className={styles.user} target='_blank' href={currentUser.html_url}>
                    Link to profile of the owner: <span>{currentUser?.login}</span>
                </a>
            }
        
        </>

    )
}

export default User