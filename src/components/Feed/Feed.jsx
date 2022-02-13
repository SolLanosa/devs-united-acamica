import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import Tweet from "../Tweet/Tweet";
import { firestore, logout } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import { Navigate, NavLink } from "react-router-dom";

export default function Feed({ user }) {
    const EMPTY_TWEET = {
        content: "",
        author: user?.displayName,
        uid: user?.uid,
        profilePic: user?.photoURL,
        likes: [],
    };
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState(EMPTY_TWEET);

    const handleTweetChange = (e) => {
        let nuevoTweet = {
            ...tweet,
            content: e.target.value,
        };
        setTweet(nuevoTweet);
    };

    const sendTweet = (e) => {
        if (tweet.content.length > 0) {
            firestore.collection(collections.TWEETS).add(tweet);
            setTweet(EMPTY_TWEET);
        }
    };

    useEffect(() => {
        const desuscribir = firestore.collection(collections.TWEETS).onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
                return {
                    content: doc.data().content,
                    id: doc.id,
                    likes: doc.data().likes,
                    uid: doc.data().uid,
                    author: doc.data().author,
                    profilePic: doc.data().profilePic,
                };
            });
            setTweets(tweets);
        });

        return () => desuscribir();
    }, []);

    if (!user) {
        return <Navigate replace to="/login" />;
    }

    return (
        <div className={styles.feedContainer}>
            <header className={styles.headerFeed}>
                <NavLink to="/users/me">
                    <img className={styles.profilepic} src={user.photoURL} alt="" />
                </NavLink>
                <img className={styles.logopic} src="./img/logo.svg" alt="logo devs united" />
                <img className={styles.titlepic} src="./img/title.svg" alt="title devs united" />
            </header>
            <div className={styles.formulario}>
                <div className={styles.formularioBox}>
                    <img className={styles.profilepic2} src={user.photoURL} alt="" />
                    <textarea
                        maxLength="200"
                        placeholder={`What's happening ${user.displayName}?`}
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={tweet.content}
                        onChange={handleTweetChange}
                    ></textarea>
                </div>
                <div className={styles.spanBox}>
                    <span className={styles.spanLenght}>{tweet.content.length}</span>
                    <span className={styles.spanMax}>200 max.</span>
                </div>
                <div onClick={sendTweet} className={styles.post}>
                    <img src="/img/POST.png" alt="post button" />
                </div>
            </div>
            <div className={styles.containerTweet}>
                {tweets.map((tweet, idx) => {
                    return <Tweet key={idx} user={user} tweet={tweet} />;
                })}
            </div>
        </div>
    );
}
