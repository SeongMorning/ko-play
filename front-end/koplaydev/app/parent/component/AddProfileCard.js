"use client";

import { useState } from "react";
import styles from "./AddProfileCard.module.scss";
import InputChildInfo from "./InputChildInfo";

export default function AddProfileCard({ onAdd }) {
    const [openModal, setOpenModal] = useState(false);

    const clickEmptyCard = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div className={styles.addProfileCardBg} onClick={clickEmptyCard}>
                <img className={styles.plusIcon} src="plus.png" alt="Add" />
            </div>
            {openModal && (<InputChildInfo onClose={closeModal} onAdd={onAdd} />)}
        </>
    );
}
