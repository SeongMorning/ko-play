"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import ParentBg from "../component/background/ParentBg";
import ChildProfileCard from "./component/ChildProfileCard";
import AddProfileCard from "./component/AddProfileCard";

export default function Parent() {
    const [childProfiles, setChildProfiles] = useState([
        { idx: "1", src: "hehe.png", name: "홍길동", birth: "2024.06.15", bgColor: "rgb(250, 201, 201)" },
        { idx: "2", src: "hehe.png", name: "김철수", birth: "2024.07.30", bgColor: "rgba(189, 224, 254)" }
    ]);

    const colors = [
        "rgb(250, 201, 201)",
        "rgba(189, 224, 254)",
        "rgba(252, 246, 189)",
        "rgb(175, 224, 197)",
        "rgb(234, 197, 243)"
    ];

    const addChildProfile = () => {
        const newIdx = (childProfiles.length + 1).toString();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newProfile = {
            idx: newIdx,
            src: "new_profile.png", // 프로필 이미지 src를 적절히 변경
            name: `아이 ${newIdx}`,
            birth: "2024.01.01", // 예시 생년월일
            bgColor: randomColor
        };

        setChildProfiles([...childProfiles, newProfile]);
    };

    return (
        <div className={styles.container}>
            {childProfiles.length > 0 && (
                <div className={styles.profileList}>
                    {childProfiles.map((profile) => (
                        <ChildProfileCard
                            key={profile.idx}
                            idx={profile.idx}
                            src={profile.src}
                            name={profile.name}
                            birth={profile.birth}
                            bgColor={profile.bgColor}
                        />
                    ))}
                </div>
            )}
            <AddProfileCard onAdd={addChildProfile} />
            <ParentBg />
        </div>
    );
}
