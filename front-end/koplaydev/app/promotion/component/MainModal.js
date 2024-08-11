"use client";

import styles from "./MainModal.module.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NonLoginGame from "../modal/NonLoginGame"

export default function MainModal() {
  const modalNum = useSelector((state) => state.modal);
  let [isopened, setIsopened] = useState("");
  useEffect(() => {
    // console.log(modalNum)
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
      <NonLoginGame />
    </div>
  );
}
