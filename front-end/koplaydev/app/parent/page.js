import styles from "./page.module.scss";
import ParentBg from "../component/background/ParentBg";
import ChildProfileCard from "./component/ChildProfileCard";
import AddProfileCard from "./component/AddProfileCard";
import FirstVisitModal from "./component/FirstVisitModal";
import InputInitInfo from "./component/InputInitInfo";
import InputChildInfo from "./component/InputChildInfo";
import CheckChildInfo from "./component/CheckChildInfo";


export default function Parent() {
    return (
        // container 적용안되는 중
        <div className={styles.container}>
            {/* FirstVisitModal = 모달 */}
            {/* <FirstVisitModal /> */}

            {/* InputInitInfo = 초기 정보 입력 */}
            {/* <InputInitInfo /> */}

            {/* InputChildInfo = 자녀 정보 입력 */}
            {/* <InputChildInfo /> */}

            {/* CheckChildInfo = 자녀 정보 확인 */}
            {/* <CheckChildInfo /> */}
            <ChildProfileCard idx="1" src="hehe.png" name="홍길동" birth="2024.06.15" />
            <ChildProfileCard idx="2" src="hehe.png" isBgBlue={true} name="김철수" birth="2024.07.30" />
            <AddProfileCard />
            <ParentBg />
        </div>
    );
}