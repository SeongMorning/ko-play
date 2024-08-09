"use client";

import styles from "./MainModal.module.scss";
import BlurBox from "@/app/component/boxes/BlurBox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FirstVisit from "./modals/FirstVisit";
import NormalGame from "./modals/NormalGame";
import Setting from "./modals/Setting";
import Test from "./modals/Test";
import RankGame from "./modals/RankGame";

export default function MainModal() {
  const modalNum = useSelector((state) => state.modal);
  let [isopened, setIsopened] = useState("");
  useEffect(() => {
    if (modalNum !== 0) {
      setIsopened("modalOpen");
    } else {
      setIsopened("");
    }
  }, [modalNum]);
  return (
    <div
      className={`${styles.MainModal} ${
        isopened === "modalOpen" ? styles.modalOpen : ""
      }`}
    >
      <SelectModal idx={modalNum}></SelectModal>
    </div>
  );
}

const SelectModal = ({ idx }) => {
  if (idx === 1000) {
    return <FirstVisit />;
  } else if (idx === 1) {
    return <NormalGame />;
  } else if (idx === 2) {
    return <Setting />;
  } else if (idx === 3) {
    return <Test />;
  } else if (idx === 4){
    return <RankGame/>;
  }else{
    return null;
  }
};