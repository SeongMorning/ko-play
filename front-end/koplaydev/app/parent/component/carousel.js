"use client";

import { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./carousel.module.scss";
import ParentBg from "@/app/component/background/ParentBg";
import AddProfileCard from "./AddProfileCard";
import InputChildInfo from "./InputChildInfo";
import ChildProfileCard from "./ChildProfileCard";

export default function Carousel() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [childProfiles, setChildProfiles] = useState([]);

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
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <>
            <div className={styles.carousel}>
                <Slider className={styles.slider} {...settings}>
                    {childProfiles?.map((profile) => (
                        <div key={profile.idx} className={styles.profileCard}>
                            <ChildProfileCard 
                                idx={profile.idx}
                                src={profile.src}
                                name={profile.name}
                                birth={profile.birth}
                                bgColor={profile.bgColor}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className={styles.AddProfileButton} onClick={openModal}>
                <AddProfileCard />
            </div>
            
            <ParentBg />

            {isModalOpen && (<InputChildInfo onClose={closeModal} onAdd={addChildProfile} />)}
        </>
    );
}
