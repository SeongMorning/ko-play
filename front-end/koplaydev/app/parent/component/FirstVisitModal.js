import modifyParentNationAxios from "@/app/axios/modifyParentNationAxios";
import styles from "./FirstVisitModal.module.scss"; 
import modifyParentVisitAxios from "@/app/axios/modifyParentVisitAxios";
import { changeParentInfo, setNationality, setVisited } from "@/redux/slices/parentSlice";
import { useDispatch,useSelector } from "react-redux";

export default function FirstVisitModal({ onclose }) {
    const dispatch = useDispatch();
    const parentChilds = useSelector((state) => state.parent);

    const nationClick = async (nation) =>{
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
                    <h1>당신의 국적을 선택하세요</h1>
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