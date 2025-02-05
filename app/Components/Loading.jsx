import styles from '../Components/loading.module.css';

export default function Loading() {
    return(
        <div className={`${styles.container} flex flex-col`}><div className={styles.spinner}></div> <p>Loading. Please wait...</p></div>
    )
}