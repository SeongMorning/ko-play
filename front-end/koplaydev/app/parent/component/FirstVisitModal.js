import modifyParentNationAxios from "@/app/axios/modifyParentNationAxios";
import styles from "./FirstVisitModal.module.scss"; 
import modifyParentVisitAxios from "@/app/axios/modifyParentVisitAxios";
import { changeParentInfo, setNationality, setVisited } from "@/redux/slices/parentSlice";
import { useDispatch,useSelector } from "react-redux";
import translations from "@/app/axios/translations";
import { changeTranslationWords } from "@/redux/slices/translationWords";

export default function FirstVisitModal({ onclose }) {
    const translationWords = useSelector((state) => state.translationWords);

    const dispatch = useDispatch();
    const parentChilds = useSelector((state) => state.parent);

    const nationClick = async (nation) =>{
        dispatch(changeTranslationWords(await translations(nation.locale)));

        // console.log(nation)
        const modifyNation = await modifyParentNationAxios(nation);
        const modifyVisited = await modifyParentVisitAxios();
        if(modifyVisited != null){
            changeParentInfo(modifyVisited)
        }
        onclose();
    }
    return (
        <>
            <div className={styles.modalBg}></div>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h1>{translationWords.selectNation}</h1>
                    <div className={styles.imgContent}>
                    <img src="korea-parent-choice.png" alt="" onClick={()=>nationClick('Korea')}/>
                    <img src="thailand-parent-choice.png" alt="" onClick={()=>nationClick('Tailand')} />
                    <img src="china-parent-choice.png" alt="" onClick={()=>nationClick('China')}/>
                    <img src="vietnam-parent-choice.png" alt="" onClick={()=>nationClick('Vietnam')}/>
                    </div>
                </div>
            </div>
        </>
    );   
}