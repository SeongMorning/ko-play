"use client";

import { useState } from "react";
import { useRef } from 'react';
import styles from "./page.module.scss";
import ParentBg from "../component/background/ParentBg";
import ChildProfileCard from "./component/ChildProfileCard";
import AddProfileCard from "./component/AddProfileCard";

export default function Parent() {

    const [childProfiles, setChildProfiles] = useState([]
    //     [
    //     { idx: "1", src: "hehe.png", name: "홍길동", birth: "2024.06.15", bgColor: "rgb(250, 201, 201)" },
    //     { idx: "2", src: "hehe.png", name: "김철수", birth: "2024.07.30", bgColor: "rgb(232, 208, 238)" }
    // ]
);

    const colors = [
        "rgb(250, 201, 201)",
        "rgb(189, 224, 254)",
        "rgb(252, 246, 189)",
        "rgb(175, 224, 197)",
        "rgb(232, 208, 238)",
        "rgb(200, 252, 250)",
        "rgb(255, 229, 204)",
        "rgb(250, 241, 242)"
    ];

    const addChildProfile = ({name, birth}) => {
        const newIdx = (childProfiles.length + 1).toString();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newProfile = {
            idx: newIdx,
            src: "hehe.png", // 새로운 프로필 이미지
            name: name, // student Idx의 이름
            birth: birth,
            bgColor: randomColor
        };

        setChildProfiles([...childProfiles, newProfile]);
    };

    return (
        <div className={styles.container}>
                <div className={styles.profileList}>
            {/* {childProfiles.length > 0 && ( */}
                    {childProfiles?.map((profile) => (
                        <ChildProfileCard
                            key={profile.idx}
                            idx={profile.idx}
                            src={profile.src}
                            name={profile.name}
                            birth={profile.birth}
                            bgColor={profile.bgColor}
                        />
                    )
                )}
                </div>
                <div className={styles.profileList}>
            <AddProfileCard onAdd={addChildProfile} />
                </div>
            <ParentBg />
        </div>
    );
}
