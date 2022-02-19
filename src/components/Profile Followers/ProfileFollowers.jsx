import React, { useEffect, useState } from "react";
import styles from "./ProfileFollowers.module.css";
import Tweet from "../Tweet/Tweet";
import { firestore } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import { Link, Navigate, useParams } from "react-router-dom";

export default function ProfileFollowers({ user }) {
    const { uid } = useParams();
    const [userProfile, setUserProfile] = useState();
    const [redirect, setRedirect] = useState(false);
    const [posts, setPosts] = useState([]);

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
            });
        const unsuscribe = firestore
            .collection(collections.TWEETS)
            .where("uid", "==", uid)
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                    };
                });
                setPosts(posts);
            });
        return () => unsuscribe();
    }, []);
    if (redirect) {
        return <Navigate replace to="/" />;
    }
    return (
        <div>
            <header className={styles.headerProfile}>
                <Link to="/">
                    <img className={styles.backPic} src="/img/back.svg" alt="" />
                    <span>{userProfile?.username}</span>
                </Link>
            </header>
            <div className={styles.profileInfo}>
                <img
                    className={styles.profilepic + " " + userProfile?.color}
                    src={userProfile?.profilePicture}
                    alt=""
                />
                <div className={styles.containerUser + " " + userProfile?.color}>
                    {userProfile?.username}
                </div>
            </div>
            {posts.map((tweet, idx) => {
                return <Tweet key={idx} user={user} tweet={tweet} />;
            })}
        </div>
    );
}
