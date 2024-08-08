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
  changeParentChildsInfo,
  addParentChild,
} from "../../redux/slices/parentChaildsSlice";
import InputInitInfo from "./component/InputInitInfo";
import insertChildAxios from "../axios/insertChildAxios";
import {
  changeListenLevel,
  changeReadLevel,
  changeSpeechLevel,
} from "@/redux/slices/levelSlice";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import parentInfoAxios from "../axios/parentInfoAxios";

export default function Parent() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitModalOpen, setIsInitModalOpen] = useState(false);

  const parentChilds = useSelector((state) => state.parentChilds);
  
  useEffect(()=>{
    const fetchParentInfo = async () => {
        const data = await parentInfoAxios();

        if(data){
            if(!data.visited){
                setIsInitModalOpen(true);
            }
        }
    }
    fetchParentInfo();
  }, [])

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

  useEffect(() => {
    console.log("parentChilds가 변경되었습니다:", parentChilds);
  }, [parentChilds]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsInitModalOpen(true);
  };

  const closeAllModal = () => {
    setIsModalOpen(false);
    setIsInitModalOpen(false);
  };

  const closeInitModal = () => {
    setIsInitModalOpen(false);
    addChildProfile();

    setChildInfo({
      name: "",
      birth: "",
      id: "",
      pw: "",
      listeningLevel: 1,
      readingLevel: 1,
      speechLevel: 1,
    });
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

  const addChildProfile = async () => {
    console.log(childInfo);
    const response = await insertChildAxios(childInfo);

    if (response != null) {
      dispatch(addParentChild(childInfo));
      dispatch(changeSpeechLevel(childInfo.speechLevel));
      dispatch(changeReadLevel(childInfo.readingLevel));
      dispatch(changeListenLevel(childInfo.listeningLevel));
    }
  };

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
        text="로그아웃"
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
      <motion.div
      initial = {{
        opacity : 0,
      }}
      animate={{
        opacity : 1,
        transition : {
            duration : 2,
            delay : 3,
        }
      }}
      >
    
        {isInitModalOpen && (
          <InputInitInfo onclose={closeInitModal} setChildInfo={setChildInfo} />
        )}
      </motion.div>
    </>
  );
}
