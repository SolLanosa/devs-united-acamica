import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import Tweet from "../Tweet/Tweet";
import { firestore } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import { Navigate, NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Feed({ user }) {
    const EMPTY_TWEET = {
        content: "",
        author: user?.username,
        uid: user?.uid,
        profilePic: user?.profilePicture,
        likes: [],
        userColor: user?.color,
    };

    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState(EMPTY_TWEET);
    const [loading, setLoading] = useState(true);

    const handleTweetChange = (e) => {
        let nuevoTweet = {
            ...tweet,
            content: e.target.value,
        };
        setTweet(nuevoTweet);
    };

    const sendTweet = (e) => {
        if (tweet.content.length > 0) {
            firestore
                .collection(collections.TWEETS)
                .add({ ...tweet, createdAt: new Date().getTime() });
            setTweet(EMPTY_TWEET);
        }
    };

    useEffect(() => {
        const desuscribir = firestore
            .collection(collections.TWEETS)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                setTweets(tweets);
                setLoading(false);
            });

        return () => desuscribir();
    }, []);

    if (!user) {
        return <Navigate replace to="/login" />;
    }
    if (!user.color || !user.username) {
        return <Navigate replace to="/users/settings" />;
    }

    return (
        <div className={styles.feedContainer}>
            <header className={styles.headerFeed}>
                <NavLink to="/users/me">
                    <img
                        className={styles.profilepic + " " + user.color}
                        src={user.profilePicture}
                        alt="profile picture"
                    />
                </NavLink>
                <img className={styles.logopic} src="./img/logo.svg" alt="logo devs united" />
                <img className={styles.titlepic} src="./img/title.svg" alt="title devs united" />
            </header>
            <div className={styles.formularioContainer}>
                <div className={styles.formulario}>
                    <NavLink to="/users/me">
                        <img
                            className={styles.profilepic2}
                            src={user.profilePicture}
                            alt="profile picture"
                        />
                    </NavLink>
                    <textarea
                        maxLength="300"
                        placeholder={`What's happening ${user.username}?`}
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
                    <span className={styles.spanMax}>300 max.</span>
                </div>
                <div onClick={sendTweet} className={styles.post}>
                    POST
                </div>
            </div>
            <div className={styles.tweetContainer}>
                {!loading &&
                    tweets.map((tweet, idx) => {
                        return <Tweet key={idx} user={user} tweet={tweet} />;
                    })}
                {loading && <Loading />}
            </div>
        </div>
    );
}
