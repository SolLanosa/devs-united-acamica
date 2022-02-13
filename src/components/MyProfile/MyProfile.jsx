import React from 'react';
import Tweet from '../Tweet/Tweet';
import styles from './MyProfile.module.css'

export default function MyProfile() {
    return (
        <div>
            <header className={styles.headerMyProfile}>
                <div className={styles.containerMyProfile}> 
                    <img className={styles.backPic} src="./img/back.svg" alt="" />   
                    <img src="./img/username-white.svg" alt="" />
                </div>
                <div className={styles.logoutBox}>
                    <img src="./img/logout.svg" alt="" />
                    <img src="./img/logout-logo.svg" alt="" />
                </div>
            </header>
            <div className={styles.myProfileInfo}>
                <img className={styles.profilepic} src="./img/ornacia.png" alt="" />
                <div className={styles.containerUser}> <img className={styles.user} src="./img/username-black.svg" alt="" /></div>
                <div className={styles.containerPostsFavs}>
                    <div className={styles.post}><img src="./img/posts.svg" alt="" /></div>
                    <div className={styles.favs}><img src="./img/favorite.svg" alt="" /></div>
                </div>
            </div>
            <Tweet/>
        </div>
    )
}