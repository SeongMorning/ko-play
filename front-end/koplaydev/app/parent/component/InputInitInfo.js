import CompleteBox from "./CompleteBox";
import styles from "./InputInitInfo.module.scss";

export default function InputInitInfo() {

    return (
        <>
            <div className={styles.overlay} ></div>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>초기 정보 입력</h2>
                    <img className={styles.star} src="Star-bg.png" alt="" />
                    <img className={styles.planet} src="planet-bg.png" alt="" />
                    <img className={styles.ufo} src="ufo-bg.png" alt="" />
                    <div className={styles.infomation}>
                        <div className={styles.table}>

                            <table>
                                <thead>
                                    <tr><th colSpan="3">듣기(Listening)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableNumber}>1.</td><td className={styles.tableContent}>자녀가 일상 대화를 이해할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>2.</td><td className={styles.tableContent}>자녀가 간단한 명령이나 지시를 이해할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>3.</td><td className={styles.tableContent}>자녀가 짧은 이야기나 설명을 이해할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>4.</td><td className={styles.tableContent}>자녀가 국어(또는 학습할 언어)로 된 노래나 동화를 듣고 이해할 수 있는 정도는 어느 정도인가요?</td>
                                        <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="checkbox" />잘 이해한다</label><label><input type="checkbox" />보통이다</label><label><input type="checkbox" />거의 이해하지 못한다</label>
                                            </div></td></tr>
                                </tbody>
                            </table>


                            <table>
                                <thead>
                                    <tr><th colSpan="3">읽기(Reading)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableNumber}>1.</td><td className={styles.tableContent}>자녀가 간단한 문장을 읽고 이해할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>2.</td><td className={styles.tableContent}>자녀가 짧은 이야기나 동화를 읽을 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>3.</td><td className={styles.tableContent}>자녀가 길고 복잡한 문장을 읽을 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>4.</td><td className={styles.tableContent}>자녀가 국어(또는 학습할 언어)로 된 간단한 책을 읽을 수 있는 정도는 어느 정도인가요?</td>
                                        <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label>  <input type="checkbox" />잘 읽는다</label><label><input type="checkbox" />보통이다</label><label><input type="checkbox" />거의 읽지 못한다</label>
                                            </div></td></tr>
                                </tbody>
                            </table>

                            <table>
                                <thead>
                                    <tr><th colSpan="3">말하기(Speaking)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableNumber}>1.</td><td className={styles.tableContent3}>자녀가 간단한 인사말이나 자기소개를 영어(또는 학습할 언어)로 할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>2.</td><td className={styles.tableContent3}>자녀가 일상적인 대화를 영어(또는 학습할 언어)로 할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>3.</td><td className={styles.tableContent3}>자녀가 자신의 생각이나 의견을 국어(또는 학습할 언어)로 표현할 수 있나요?</td><td className={styles.checkboxColumn}><label><input type="checkbox" />예</label> <label><input type="checkbox" />아니오</label></td></tr>
                                    <tr><td className={styles.tableNumber}>4.</td><td className={styles.tableContent4}>자녀가 국어(또는 학습할 언어)로 자신의 일상생활이나 경험을 이야기할 수 있는 정도는 어느 정도인가요?</td>
                                        <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="checkbox" />잘 이야기한다</label><label><input type="checkbox" />보통이다</label><label><input type="checkbox" />거의 이야기하지 못한다</label></div>
                                        </td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.completeBoxContainer}>
                        <CompleteBox text="완료" width={50} height={88}/>
                    </div>
                </div>
            </div>
        </>
    );
}