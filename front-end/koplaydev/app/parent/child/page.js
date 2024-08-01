import styles from "./page.module.scss";
import DetailpageChildProfileCard from "../component/DetailpageChildProfileCard";
import ParentBg from "@/app/component/background/ParentBg";


export default function Child() {
    return (
        <div>
            <DetailpageChildProfileCard name="김철수"/>            
            <ParentBg />
        </div>
    );
}