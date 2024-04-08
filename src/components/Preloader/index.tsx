import styles from './preloader.module.scss'

const Preloader = () => {
  return (
    <div className={styles.send}> 
        <div className={styles.circle } style={{height: '100%'}}>
            <div className={styles.obj } style={{width: '75px', height:'75px'}}></div>
        </div>
    </div>
  )
}

export default Preloader