"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DetailpageChildProfileCard.module.scss";
import CheckChildInfo from "./CheckChildInfo";
import parentChildStatisticsAxios from "@/app/axios/parentChildStatisticsAxios";
import { changeParentChaildStatistic } from "@/redux/slices/parentChaildStatisticSlice";
import ClickedPinkBtn from "./ClickedPinkBtn";
import useSound from "@/app/utils/useSound";
import effectSound from "@/app/utils/effectSound";

const mouseClickSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3";
const buttonSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3";

export default function DetailpageChildProfileCard({ child }) {
  const [myPageList, setMyPageList] = useState([
    "분야별/레벨별 정답률",
    "진도 현황",
    "성취도 비교",
    "스냅샷",
  ]);
  const parent = useSelector((state) => state.parent);
  const translationWords = useSelector((state) => state.translationWords);

  const dispatch = useDispatch();
  const mouseClickEs = effectSound(mouseClickSound, 1);
  const buttonEs = effectSound(buttonSound, 1);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const copy = [...myPageList];
    copy[0] = translationWords.parentStatistic1;
    copy[1] = translationWords.parentStatistic2;
    copy[2] = translationWords.parentStatistic3;
    copy[3] = translationWords.album;

    setMyPageList(copy);
  }, [translationWords]);

  const clickIcon = () => {
    mouseClickEs.play();
    setOpenModal(true);
  };

  const closeModal = () => {
    buttonEs.play();
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchstudentStatistics = async () => {
      const res = await parentChildStatisticsAxios(child.id);
      dispatch(changeParentChaildStatistic(res));
    };
    fetchstudentStatistics();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileCardBg}></div>
        <div className={styles.profileCard}>
          <img
            className={styles.settingIcon}
            src="/settingIcon2.png"
            onClick={clickIcon}
          />
          <div className={styles.profileInput}>
            <div className={styles.profileImgBg}>
              <img
                className={styles.profileImg}
                src={child.profileImg || "/hehe.png"}
                onError={(e) => {
                  e.target.src = "/hehe.png";
                }}
              />
            </div>
            <h1 className={styles.profileName}>{child.name}</h1>
          </div>
        </div>
        <div>
          <div className={styles.inputTotal}>
            <div className={styles.MyPagePink}>
              {myPageList.map((data, index) => (
                <ClickedPinkBtn
                  key={index}
                  width={"94"}
                  height={"20"}
                  text={data}
                  id={child.id}
                  idx={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {openModal && <CheckChildInfo onClose={closeModal} child={child} />}
    </>
  );
}
