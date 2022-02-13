import React from "react";
import { firestore } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import styles from "./Tweet.module.css";

export default function Tweet({ tweet, user }) {
    const handleLike = (id, likes) => {
        if (likes.includes(user.uid)) {
            console.log("corrio");
            firestore
                .doc(`${collections.TWEETS}/${id}`)
                .update({ likes: likes.filter((uid) => uid !== user.uid) });
        } else {
            firestore.doc(`${collections.TWEETS}/${id}`).update({ likes: [...likes, user.uid] });
        }
    };

    const onDelete = async (id) => {
        await firestore.doc(`${collections.TWEETS}/${id}`).delete();
    };
    return (
        <div className={styles.tweet}>
            <div>
                <img className={styles.profilepic3} src={tweet.profilePic} alt="profile pic" />
            </div>
            <div className={styles.tweetBox}>
                <div className={styles.containerInfo}>
                    <div className={styles.usernameBox}>
                        <span>{tweet.author}</span> - 5 jun
                    </div>
                    {tweet.uid === user.uid && (
                        <img
                            onClick={() => onDelete(tweet.id)}
                            className={styles.trash}
                            src="/img/trash.svg"
                            alt="trash logo"
                        />
                    )}
                </div>
                <p>{tweet.content}</p>
                <div className={styles.like}>
                    {tweet.likes.includes(user.uid) ? (
                        <img
                            src="/img/like.svg"
                            alt="like heart"
                            onClick={() => handleLike(tweet.id, tweet.likes)}
                        />
                    ) : (
                        <img
                            src="/img/like-vacio.svg"
                            alt="like heart"
                            onClick={() => handleLike(tweet.id, tweet.likes)}
                        />
                    )}
                    <span>{tweet.likes.length}</span>
                </div>
            </div>
        </div>
    );
}
