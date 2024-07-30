import styles from "./page.module.scss";
import ParentBg from "../component/background/ParentBg";
import ChildProfileCard from "./component/ChildProfileCard";


export default function Parent() {
    return (
        <>
        <ChildProfileCard />
        <ParentBg />

            {/* <main>
                <ChildProfileCard></ChildProfileCard>
            </main> */}
        </>
    );
}