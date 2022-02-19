import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function Modal({ open, onClose, children }) {
    if (open) {
        return (
            <div onClick={onClose} className={styles.container}>
                {children}
            </div>
        );
    }
    return null;
}
