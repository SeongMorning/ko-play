"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./page.module.scss";
import ChildProfileCard from "./component/ChildProfileCard";
import AddProfileCard from "./component/AddProfileCard";
import ParentBg from "../component/background/ParentBg";
import InputChildInfo from "./component/InputChildInfo";
import parentChildInfoAxios from "../axios/parentChildInfoAxios";
import {
  addParentChild,
  changeParentChildsInfo
} from "../../redux/slices/parentChaildsSlice";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import parentInfoAxios from "../axios/parentInfoAxios";
import FirstVisitModal from "./component/FirstVisitModal";
import { changeParentInfo } from "@/redux/slices/parentSlice";
import InputInitInfo from "./component/InputInitInfo";
import insertChildAxios from "../axios/insertChildAxios";
import { changeListenLevel, changeReadLevel, changeSpeechLevel } from "@/redux/slices/levelSlice";
import useSound from "@/app/utils/useSound";
import translations from "../axios/translations";
import { changeTranslationWords } from "@/redux/slices/translationWords";
import effectSound from '@/app/utils/effectSound'
import { changeCurrNation } from "@/redux/slices/currNationSlice";

const albumBGM = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/background/albumBGM.wav';
const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';
const mouseClickSound = "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3";

export default function Parent() {
  useSound(albumBGM, 0.8, 0);
  const buttonEs = effectSound(buttonSound, 1);
  const mouseClickEs = effectSound(mouseClickSound, 1);

  const translationWords = useSelector((state) => state.translationWords);
  const parent = useSelector((state) => state.parent)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitModalOpen, setIsInitModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  const parentChilds = useSelector((state) => state.parentChilds);

  const nations = [
    { name: "Korea", src: "/korea-3.png", locale: "ko-KR" },
    { name: "Thailand", src: "/thailand-parent-choice.png", locale: "th-TH" },
    { name: "China", src: "/china-3.png", locale: "zh-CN" },
    { name: "Vietnam", src: "/vietnam-3.png", locale: "vi-VN" },
  ];

  

  useEffect(() => {
    const fetchParentInfo = async () => {
      const data = await parentInfoAxios();
      console.log(data);
      if (data) {
        dispatch(changeParentInfo(data))
        if (!data.visited) {
          setIsFirstModalOpen(true);
        }
        if(data.nationality){
          const index = nations.findIndex((data2) => data2.name === data.nationality)
          dispatch(changeCurrNation(data.nationality));
          dispatch(changeTranslationWords(await translations(nations[index].locale)));
        }
      }
    }
    fetchParentInfo();
  }, [])

  // useEffect(() => {
  //   const fetchTranslations = async () =>{
  //     dispatch(changeTranslationWords(await translations(parent.nationality)));
  //   }
  //   fetchTranslations();
  // }, [parent])


  useEffect(() => {
    const fetchParentChildsInfo = async () => {
      try {
        const response = await parentChildInfoAxios();
        if (response) {
          dispatch(changeParentChildsInfo(response));
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchParentChildsInfo();
  }, [dispatch]);

  const openModal = () => {
    buttonEs.play();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    buttonEs.play();
    setIsModalOpen(false);
    setIsInitModalOpen(true);
  };

  const closeAllModal = () => {
    buttonEs.play();
    setIsModalOpen(false);
    setIsInitModalOpen(false);
  };

  const closeFirstModal = () => {
    buttonEs.play();
    setIsFirstModalOpen(false);
  }

  const addChildProfile = async () => {
    // console.log(childInfo);
    const response = await insertChildAxios(childInfo);

    if (response != null) {
      dispatch(addParentChild(childInfo));
      dispatch(changeSpeechLevel(childInfo.speechLevel));
      dispatch(changeReadLevel(childInfo.readingLevel));
      dispatch(changeListenLevel(childInfo.listeningLevel));
    }
  };

  const [childInfo, setChildInfo] = useState({
    name: "",
    birth: "",
    id: "",
    pw: "",
    listeningLevel: 1,
    readingLevel: 1,
    speechLevel: 1,
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    initialSlide: 0,
  };

  return (
    <>
      <BackScoreBtn
        className={styles.backButton}
        left={27}
        top={20}
        text={translationWords.logout}
      />
      <div className={styles.carousel}>
        <Slider key="1" className={styles.slider} {...settings}>
          {parentChilds?.map((profile) => (
            <div key={profile.id} className={styles.profileCard}>
              <ChildProfileCard
                id={profile.id}
                src={profile.profileImg}
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

      <div>
        {isModalOpen && (
          <InputChildInfo
            onClose={closeModal}
            onAllClose={closeAllModal}
            childInfo={childInfo}
            setChildInfo={setChildInfo}
          />
        )}
      </div>
      {isInitModalOpen && (
          <InputInitInfo onClose={closeAllModal} setChildInfo={setChildInfo} addChildProfile={addChildProfile} />
      )}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 2,
          }
        }}
      >

        {isFirstModalOpen && (
          <FirstVisitModal onclose={closeFirstModal} />
        )}
      </motion.div>
    </>
  );
}
