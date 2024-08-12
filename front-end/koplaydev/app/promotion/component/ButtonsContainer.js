"use client";

import styles from "./ButtonsContainer.module.scss";
import StartButton from "./StartButton";
import { useState } from "react";

export default function ButtonsContainer() {
  return (
    <>
      <div className={styles.buttonsContainer}>
        <StartButton
          fontColor={"black"}
          bg={"#78F860"}
          shadow={"#23C505"}
          text={"회원"}
        />
        <StartButton
          fontColor={"white"}
          bg={"#FF61A3"}
          shadow={"#FF237F"}
          text={"비회원"}
        />
      </div>
    </>
  );
}
