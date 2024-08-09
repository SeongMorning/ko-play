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
  changeParentChildsInfo
} from "../../redux/slices/parentChaildsSlice";
import BackScoreBtn from "../component/buttons/BackScoreBtn";
import parentInfoAxios from "../axios/parentInfoAxios";
import FirstVisitModal from "./component/FirstVisitModal";
import { changeParentInfo } from "@/redux/slices/parentSlice";

export default function Parent() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitModalOpen, setIsInitModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  const parentChilds = useSelector((state) => state.parentChilds);

  useEffect(() => {
    const fetchParentInfo = async () => {
      const data = await parentInfoAxios();

      if (data) {
        changeParentInfo(data)
        if (!data.visited) {
          setIsFirstModalOpen(true);
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

  const closeFirstModal = () => {
    setIsFirstModalOpen(false);
  }

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
