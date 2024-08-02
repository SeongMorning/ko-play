"use client";

import { useState } from "react";
import styles from "./AddProfileCard.module.scss";
import InputChildInfo from "./InputChildInfo";

export default function AddProfileCard({ onAdd }) {

    return (
        <>
            <div className={styles.addProfileCardBg}>
                <img className={styles.plusIcon} src="plus.png" alt="Add" />
            </div>
        </>
    );
}
