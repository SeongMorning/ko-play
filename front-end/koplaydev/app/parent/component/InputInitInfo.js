
import { useSelector } from "react-redux";
import CompleteBox from "./CompleteBox";
import styles from "./InputInitInfo.module.scss";
import { useState } from "react";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function InputInitInfo({ onClose, setChildInfo }) {
    const translationWords = useSelector((state) => state.translationWords);
    const es = effectSound(buttonSound, 1);

    const [formState, setFormState] = useState({
        listening1: '',
        listening2: '',
        listening3: '',
        listening4: '',
        reading1: '',
        reading2: '',
        reading3: '',
        reading4: '',
        speaking1: '',
        speaking2: '',
        speaking3: '',
        speaking4: ''
    });

        // 닫기 버튼 클릭 시 실행되는 함수
        const handleClose = () => {
            es.play();
            // 상태 초기화
            setChildInfo({
                name: '',
                id: '',
                pw: '',
                birth: '',
            });
            // 모달 닫기
            onClose();
        };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const calculateScore = (value) => {
        if (value === 'yes') return 3;
        if (value === 'so') return 2;
        if (value === 'no') return 1;
        return 0;
    };

    const calculateLevel = (scores) => {
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / scores.length;

        if (averageScore >= 2.5) return 5;
        if (averageScore >= 2.0) return 4;
        if (averageScore >= 1.5) return 3;
        if (averageScore >= 1.0) return 2;
        return 1;
    };

    const handleSubmit = () => {
        const listeningScores = [
            calculateScore(formState.listening1),
            calculateScore(formState.listening2),
            calculateScore(formState.listening3),
            calculateScore(formState.listening4)
        ];

        const readingScores = [
            calculateScore(formState.reading1),
            calculateScore(formState.reading2),
            calculateScore(formState.reading3),
            calculateScore(formState.reading4)
        ];

        const speakingScores = [
            calculateScore(formState.speaking1),
            calculateScore(formState.speaking2),
            calculateScore(formState.speaking3),
            calculateScore(formState.speaking4)
        ];

        const listeningLevel = calculateLevel(listeningScores);
        const readingLevel = calculateLevel(readingScores);
        const speakingLevel = calculateLevel(speakingScores);

        // childInfo 초기화
        setChildInfo({
            name: '',
            id: '',
            pw: '',
            birth: '',
            listeningLevel: listeningLevel,
            readingLevel: readingLevel,
            speakingLevel: speakingLevel,
        });

        // 모달 닫기
        onClose();
    };

    return (
        <>
            <div className={styles.overlay} ></div>
            
            <div className={styles.modal}>
                <div className={styles.modalContent}>

                    <h2>{translationWords.initialIfnoInput}</h2>
                    <img className={styles.closeButton} onClick={handleClose} src="close.png" alt=""/>
                    <img className={styles.star} src="Star-bg.png" alt="" />
                    <img className={styles.planet} src="planet-bg.png" alt="" />
                    <img className={styles.ufo} src="ufo-bg.png" alt="" />
                    <div className={styles.infomation}>
                        <div className={styles.table}>
                            {/* Listening Table */}
                            <table>
                                <thead>
                                    <tr><th colSpan="3">{translationWords.listen}(Listening)</th></tr>
                                </thead>
                                <tbody>

                                    <tr><td className={styles.tableContent}>{translationWords.listen1}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label  className={styles.customRadio}><input type="radio" name='listening1' value='yes'onChange={handleRadioChange} />{translationWords.yes}</label> <label><input type="radio" name='listening1' value='no' onChange={handleRadioChange}/>{translationWords.no}</label></td>   </tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen2}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening2' value='yes'onChange={handleRadioChange} />{translationWords.yes}</label> <label><input type="radio"  name='listening2' value='no' onChange={handleRadioChange}/>{translationWords.no}</label></td></tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen3}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening3' value='yes' onChange={handleRadioChange}/>{translationWords.yes}</label> <label><input type="radio"  name='listening3' value='no'onChange={handleRadioChange} />{translationWords.no}</label></td></tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen4}</td></tr>
                                    <tr> <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="radio"  name='listening4' value='yes'  onChange={handleRadioChange}/>{translationWords.good}</label><label><input type="radio"  name='listening4' value='so' onChange={handleRadioChange}/>{translationWords.nomal}</label><label><input type="radio" name='listening4' value='no'  onChange={handleRadioChange}/>{translationWords.bad}</label>
                                            </div></td></tr>
                                </tbody>
                            </table>

                            {/* Reading Table */}
                            <table>
                                <thead>
                                    <tr><th colSpan="3">{translationWords.read}(Reading)</th></tr>
                                </thead>
                                <tbody>

                                    <tr><td className={styles.tableContent}>{translationWords.listen5}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label  className={styles.customRadio}><input type="radio" name='listening1' value='yes'onChange={handleRadioChange} />{translationWords.yes}</label> <label><input type="radio" name='listening1' value='no' onChange={handleRadioChange}/>{translationWords.no}</label></td>   </tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen6}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening2' value='yes'onChange={handleRadioChange} />{translationWords.yes}</label> <label><input type="radio"  name='listening2' value='no' onChange={handleRadioChange}/>{translationWords.no}</label></td></tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen7}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening3' value='yes' onChange={handleRadioChange}/>{translationWords.yes}</label> <label><input type="radio"  name='listening3' value='no'onChange={handleRadioChange} />{translationWords.no}</label></td></tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen8}</td></tr>
                                    <tr> <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="radio"  name='listening4' value='yes'  onChange={handleRadioChange}/>{translationWords.yes}</label><label><input type="radio"  name='listening4' value='so' onChange={handleRadioChange}/>{translationWords.nomal}</label><label><input type="radio" name='listening4' value='no'  onChange={handleRadioChange}/>{translationWords.bad}</label>
                                            </div></td></tr>
                                </tbody>
                            </table>

                            {/* Speaking Table */}
                            <table>
                                <thead>
                                    <tr><th colSpan="3">{translationWords.speak}(Speaking)</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className={styles.tableContent}>{translationWords.listen9}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label  className={styles.customRadio}><input type="radio" name='listening1' value='yes'onChange={handleRadioChange} />{translationWords.yes}</label> <label><input type="radio" name='listening1' value='no' onChange={handleRadioChange}/>{translationWords.no}</label></td>   </tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen10}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening2' value='yes'onChange={handleRadioChange} />{translationWords.yes}</label> <label><input type="radio"  name='listening2' value='no' onChange={handleRadioChange}/>{translationWords.no}</label></td></tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen11}</td></tr>
                                    <tr><td className={styles.checkboxColumn}><label className={styles.customRadio}><input type="radio" name='listening3' value='yes' onChange={handleRadioChange}/>{translationWords.yes}</label> <label><input type="radio"  name='listening3' value='no'onChange={handleRadioChange} />{translationWords.no}</label></td></tr>
                                    <tr><td className={styles.tableContent}>{translationWords.listen12}</td></tr>
                                    <tr> <td className={styles.checkboxColumn}>
                                            <div className={styles.threeCheck}><label> <input type="radio"  name='listening4' value='yes'  onChange={handleRadioChange}/>{translationWords.yes}</label><label><input type="radio"  name='listening4' value='so' onChange={handleRadioChange}/>{translationWords.nomal}</label><label><input type="radio" name='listening4' value='no'  onChange={handleRadioChange}/>{translationWords.bad}</label>
                                            </div></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.completeBoxContainer} onClick={handleSubmit}>
                        <CompleteBox text={translationWords.childRegister} width={50} height={88}/>
                    </div>
                </div>
            </div>
        </>
    );
}
