import styles from './MyPageBg.module.scss';

export default function MyPageBg(){
    return(
        <div className={styles.MyPageBg}>
            <img className={styles.MyPageBgImg} src="/MyPage-bg.png"/>
        </div>
    )
}