import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { firestore, logout } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import Tweet from "../Tweet/Tweet";
import styles from "./MyProfile.module.css";

export default function MyProfile({ user }) {
    const [isPost, setIsPost] = useState(true);
    const [posts, setPosts] = useState([]);
    const [favs, setFavs] = useState([]);

    const handleSelectPost = () => setIsPost(true);

    const handleSelectFavorites = () => setIsPost(false);

    useEffect(() => {
        if (user) {
            firestore
                .collection(collections.TWEETS)
                .where("uid", "==", user.uid)
                .onSnapshot((snapshot) => {
                    const posts = snapshot.docs.map((doc) => {
                        return {
                            content: doc.data().content,
                            id: doc.id,
                            likes: doc.data().likes,
                            uid: doc.data().uid,
                            author: doc.data().author,
                            profilePic: doc.data().profilePic,
                        };
                    });
                    setPosts(posts);
                });
            firestore
                .collection(collections.TWEETS)
                .where("likes", "array-contains", user.uid)
                .onSnapshot((snapshot) => {
                    const favs = snapshot.docs.map((doc) => {
                        return {
                            content: doc.data().content,
                            id: doc.id,
                            likes: doc.data().likes,
                            uid: doc.data().uid,
                            author: doc.data().author,
                            profilePic: doc.data().profilePic,
                        };
                    });
                    setFavs(favs);
                });
        }
    }, []);

    if (!user) {
        return <Navigate replace to="/login" />;
    }

    const tweets = isPost ? posts : favs;

    return (
        <div>
            <header className={styles.headerMyProfile}>
                <Link to="/">
                    <div className={styles.containerMyProfile}>
                        <img className={styles.backPic} src="/img/back.svg" alt="" />
                        <img src="/img/username-white.svg" alt="" />
                    </div>
                </Link>

                <div className={styles.logoutBox} onClick={logout}>
                    <img src="/img/logout.svg" alt="" />
                    <img src="/img/logout-logo.svg" alt="" />
                </div>
            </header>
            <div className={styles.myProfileInfo}>
                <div className={styles.myProfileInfoContent}>
                    <img className={styles.profilepic} src={user.photoURL} alt="" />
                    <div className={styles.containerUser}>{user.displayName}</div>
                </div>
                <div className={styles.containerPostsFavs}>
                    <div
                        onClick={handleSelectPost}
                        className={isPost ? styles.selected : styles.unselected}
                    >
                        POST
                    </div>
                    <div
                        onClick={handleSelectFavorites}
                        className={!isPost ? styles.selected : styles.unselected}
                    >
                        FAVORITE
                    </div>
                </div>
            </div>
            {tweets.map((tweet, idx) => {
                return <Tweet key={idx} user={user} tweet={tweet} />;
            })}
        </div>
    );
}
