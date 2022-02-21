import React from "react";
import styles from "./ConfirmAlert.module.css";
import Modal from "../Modal/Modal";

export default function ConfirmAlert({
    open,
    onClose,
    message,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
}) {
    return (
        <Modal open={open} onClose={onClose}>
            <div className={styles.box}>
                <p>{message}</p>
                <div className={styles.buttonContainer}>
                    <button onClick={onCancel || onClose}>{cancelLabel}</button>
                    <button className={styles.confirm} onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
