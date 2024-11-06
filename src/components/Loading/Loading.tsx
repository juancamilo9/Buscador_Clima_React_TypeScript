import styles from './Loading.module.css'

export const Loading = () => {
    return (
        <div className={styles.sk_chase}>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
        </div>
    )
}