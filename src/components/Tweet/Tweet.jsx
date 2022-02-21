import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import { collections } from "../../firebase/firebaseConfig";
import { getAbbreviatedDate } from "../../helpers/date";
import styles from "./Tweet.module.css";
import Modal from "../Modal/Modal";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";

export default function Tweet({ tweet, user }) {
    const isLiked = tweet.likes.includes(user?.uid);
    const isAuthor = tweet.uid === user?.uid;
    const [open, setOpen] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            firestore
                .doc(`${collections.TWEETS}/${tweet.id}`)
                .update({ likes: tweet.likes.filter((uid) => uid !== user?.uid) });
        } else {
            firestore
                .doc(`${collections.TWEETS}/${tweet.id}`)
                .update({ likes: [...tweet.likes, user?.uid] });
        }
    };

    const onDelete = () => firestore.doc(`${collections.TWEETS}/${tweet.id}`).delete();

    const onCloseModal = () => setOpen(false);

    return (
        <div className={styles.tweet}>
            <ConfirmAlert
                open={open}
                onClose={onCloseModal}
                message="Are you sure you want to delete this post?"
                confirmLabel="Yes"
                cancelLabel="Cancel"
                onConfirm={onDelete}
            />
            <Link to={`/users/${isAuthor ? "me" : tweet.uid}`}>
                <div>
                    <img className={styles.profilepic} src={tweet.profilePic} alt="profile pic" />
                </div>
            </Link>
            <div className={styles.tweetBox}>
                <div className={styles.containerInfo}>
                    <div className={styles.usernameBox}>
                        <span className={tweet.userColor}>{tweet.author}</span> -{" "}
                        {getAbbreviatedDate(tweet.createdAt)}
                    </div>
                    {isAuthor && (
                        <img
                            onClick={() => setOpen(true)}
                            className={styles.trash}
                            src="/img/trash.svg"
                            alt="trash logo"
                        />
                    )}
                </div>
                <p>{tweet.content}</p>
                <div className={styles.like} onClick={handleLike}>
                    {isLiked ? (
                        <img src="/img/like.svg" alt="like heart" />
                    ) : (
                        <img src="/img/like-vacio.svg" alt="like heart" />
                    )}

                    <span className={isLiked ? styles.spanliked : styles.spanNot}>
                        {tweet.likes.length}
                    </span>
                </div>
            </div>
        </div>
    );
}
