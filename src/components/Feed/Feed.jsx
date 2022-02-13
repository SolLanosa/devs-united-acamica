import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import Tweet from "../Tweet/Tweet";
import { firestore, logout } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import { Navigate } from "react-router-dom";

export default function Feed({ user }) {
    const [tweets, setTweets] = useState([]);
    const [tweet, setTweet] = useState({
        content: "",
        autor: "",
        uid: "",
        profilePic: "",
    });

    const handleTweetChange = (e) => {
        let nuevoTweet = {
            content: e.target.value,
            likes: 0,
            uid: user.uid,
            autor: user.displayName,
            profilePic: user.photoURL,
        };
        setTweet(nuevoTweet);
    };

    const sendTweet = (e) => {
        if (tweet.content.length > 0) {
            firestore.collection(collections.TWEETS).add(tweet);
            setTweet({
                content: "",
            });
        }
    };

    const handleDelete = async (id) => {
        await firestore.doc(`${collections.TWEETS}/${id}`).delete();
        const nuevosTweets = tweets.filter((tweet) => tweet.id !== id);
        setTweets(nuevosTweets);
    };

    useEffect(() => {
        const desuscribir = firestore.collection(collections.TWEETS).onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
                return {
                    content: doc.data().content,
                    id: doc.id,
                    likes: doc.data().likes,
                    uid: doc.data().uid,
                    autor: doc.data().autor,
                    profilePic: doc.data().profilePic,
                };
            });
            setTweets(tweets);
        });

        return () => desuscribir();
    }, []);

    const handleLike = (id, likes) => {
        if (!likes) likes = 0;
        firestore.doc(`${collections.TWEETS}/${id}`).update({ likes: likes + 1 });
    };

    if (!user) {
        return <Navigate replace to="/login" />;
    }

    return (
        <div className={styles.feedContainer}>
            <header className={styles.headerFeed}>
                <img className={styles.profilepic} src={user.photoURL} alt="" />
                <img className={styles.logopic} src="./img/logo.svg" alt="logo devs united" />
                <img className={styles.titlepic} src="./img/title.svg" alt="title devs united" />
                <span onClick={logout}>logout</span>
            </header>
            <div className={styles.formulario}>
                <div className={styles.formularioBox}>
                    <img className={styles.profilepic2} src={user.photoURL} alt="" />
                    <textarea
                        maxlength="200"
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
                    <img src="./img/POST.png" alt="post button" />
                </div>
            </div>
            <div className={styles.containerTweet}>
                {tweets.map((tweet, idx) => {
                    return (
                        <Tweet
                            key={idx}
                            user={user}
                            tweet={tweet}
                            onDelete={handleDelete}
                            handleLike={handleLike}
                        />
                    );
                })}
            </div>
        </div>
    );
}
