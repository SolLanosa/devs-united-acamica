import React from "react";
import styles from "./ProfileFollowers.module.css";
import Tweet from "../Tweet/Tweet";

export default function ProfileFollowers() {
    return (
        <div>
            <header className={styles.headerProfile}>
                <img className={styles.backPic} src="/img/back.svg" alt="" />
                <img src="/img/username-white.svg" alt="" />
            </header>
            <div className={styles.profileInfo}>
                <img className={styles.profilepic} src="/img/ornacia.png" alt="" />
                <div className={styles.containerUser}>
                    {" "}
                    <img className={styles.user} src="/img/username-black.svg" alt="" />
                </div>
            </div>
            <Tweet />
        </div>
    );
}
