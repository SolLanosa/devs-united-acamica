import React from "react";
import styles from "./WithPadding.module.css";

export default function WithPadding({ children }) {
    return <div className={styles.withPadding}>{children}</div>;
}
