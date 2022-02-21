import React, { useEffect, useState } from "react";
import styles from "./ProfileFollowers.module.css";
import Tweet from "../Tweet/Tweet";
import { firestore } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import { Link, Navigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ProfileFollowers({ user }) {
    const { uid } = useParams();
    const [userProfile, setUserProfile] = useState();
    const [redirect, setRedirect] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        firestore
            .collection(collections.USERS)
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setUserProfile(doc.data());
                } else {
                    setRedirect(true);
                }
                setLoadingUser(false);
            })
            .catch((error) => setRedirect(true));
        const unsuscribe = firestore
            .collection(collections.TWEETS)
            .where("uid", "==", uid)
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                setPosts(posts);
                setLoadingPosts(false);
            });
        return () => unsuscribe();
    }, []);

    if (redirect) {
        return <Navigate replace to="/" />;
    }
    if (!user) {
        return <Navigate replace to="/login" />;
    }
    if (!user.color || !user.username) {
        return <Navigate replace to="/users/settings" />;
    }
    if (loadingUser) {
        return (
            <div className="loading-container">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <header className={styles.headerProfile}>
                <Link to="/">
                    <img className={styles.backPic} src="/img/back.svg" alt="arrow icon" />
                    <span>{userProfile?.username}</span>
                </Link>
            </header>
            <div className={styles.profileInfo}>
                <img
                    className={styles.profilepic + " " + userProfile?.color}
                    src={userProfile?.profilePicture}
                    alt="profile picture"
                />
                <div className={styles.containerUser + " " + userProfile?.color}>
                    {userProfile?.username}
                </div>
            </div>
            {!loadingPosts &&
                posts.map((tweet, idx) => {
                    return <Tweet key={idx} user={user} tweet={tweet} />;
                })}
            {loadingPosts && <Loading />}
        </div>
    );
}
