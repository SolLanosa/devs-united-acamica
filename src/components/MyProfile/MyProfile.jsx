import React, { useState, useEffect } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import { firestore, logout } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import Loading from "../Loading/Loading";
import Tweet from "../Tweet/Tweet";
import styles from "./MyProfile.module.css";

export default function MyProfile({ user, isPost, onLogout }) {
    const [posts, setPosts] = useState([]);
    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasFetchedFavs, setHasFetchedFavs] = useState(false);
    const [hasFetchedPosts, setHasFetchedPosts] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, [isPost]);

    useEffect(() => {
        let unsubscribePosts;
        let unsubscribeFavs;
        if (user) {
            unsubscribePosts = firestore
                .collection(collections.TWEETS)
                .where("uid", "==", user.uid)
                .orderBy("createdAt", "desc")
                .onSnapshot((snapshot) => {
                    const posts = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    setPosts(posts);
                    setLoading(false);
                    setHasFetchedPosts(true);
                });
            unsubscribeFavs = firestore
                .collection(collections.TWEETS)
                .where("likes", "array-contains", user.uid)
                .orderBy("createdAt", "desc")
                .onSnapshot((snapshot) => {
                    const favs = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    setFavs(favs);
                    setLoading(false);
                    setHasFetchedFavs(true);
                });
            return () => {
                if (unsubscribeFavs) {
                    unsubscribeFavs();
                }
                if (unsubscribePosts) {
                    unsubscribePosts();
                }
            };
        }
    }, []);

    if (!user) {
        return <Navigate replace to="/login" />;
    }
    if (!user.color || !user.username) {
        return <Navigate replace to="/users/settings" />;
    }

    const tweets = isPost ? posts : favs;
    const isLoading = loading && ((isPost && !hasFetchedPosts) || (!isPost && !hasFetchedFavs));
    return (
        <div>
            <header className={styles.headerMyProfile}>
                <Link to="/">
                    <div className={styles.containerMyProfile}>
                        <img className={styles.backPic} src="/img/back.svg" alt="icon arrow" />
                        <div>{user.username}</div>
                    </div>
                </Link>

                <div className={styles.logoutBox} onClick={onLogout}>
                    <span>LOGOUT</span>
                    <img src="/img/logout-logo.svg" alt="logout icon" />
                </div>
            </header>
            <div className={styles.myProfileInfo}>
                <div className={styles.myProfileInfoContent}>
                    <img
                        className={styles.profilepic + " " + user.color}
                        src={user.profilePicture}
                        alt="profile picture"
                    />
                    <div className={styles.containerUser + " " + user.color}>{user.username}</div>
                </div>
                <div className={styles.containerPostsFavs}>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? styles.selected : styles.unselected
                        }
                        to="/users/me/posts"
                    >
                        <div>POSTS</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? styles.selected : styles.unselected
                        }
                        to="/users/me/favorites"
                    >
                        <div className={styles.favoritesName}>FAVORITES</div>
                        <div className={styles.favsName}>FAVS</div>
                    </NavLink>
                </div>
            </div>
            {!isLoading &&
                tweets.map((tweet, idx) => {
                    return <Tweet key={idx} user={user} tweet={tweet} />;
                })}
            {isLoading && <Loading />}
        </div>
    );
}
