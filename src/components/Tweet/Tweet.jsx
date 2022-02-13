import React from "react";
import styles from "./Tweet.module.css";

export default function Tweet({ tweet, user, onDelete, handleLike }) {
    return (
        <div className={styles.tweet}>
            <div>
                <img className={styles.profilepic3} src={tweet.profilePic} alt="profile pic" />
            </div>
            <div className={styles.tweetBox}>
                <div className={styles.containerInfo}>
                    <div className={styles.usernameBox}>
                        <span>{tweet.autor}</span> - 5 jun
                    </div>
                    {tweet.uid === user.uid && (
                        <img
                            onClick={() => onDelete(tweet.id)}
                            className={styles.trash}
                            src="./img/trash.svg"
                            alt="trash logo"
                        />
                    )}
                </div>
                <p>{tweet.content}</p>
                <div className={styles.like}>
                    {tweet.likes > 0 ? (
                        <img
                            src="./img/like.svg"
                            alt="like heart"
                            onClick={() => handleLike(tweet.id, tweet.likes)}
                        />
                    ) : (
                        <img
                            src="./img/like-vacio.svg"
                            alt="like heart"
                            onClick={() => handleLike(tweet.id, tweet.likes)}
                        />
                    )}
                    <span>{tweet.likes ? tweet.likes : 0}</span>
                </div>
            </div>
        </div>
    );
}
