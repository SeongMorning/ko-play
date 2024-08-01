import styles from "./page.module.scss";
import MypageChildProfileCard from "../component/MypageChildProfileCard";
import ParentBg from "@/app/component/background/ParentBg";


export default function Parent() {
    return (
        <div>
            <MypageChildProfileCard name="김철수"/>
            
            <ParentBg />
        </div>
    );
}