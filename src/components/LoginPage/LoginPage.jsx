import React from "react";
import { Navigate } from "react-router-dom";

import styles from "./LoginPage.module.css";

export default function LoginPage({ onLogin, user }) {
    if (user && user.color && user.username) {
        return <Navigate replace to="/" />;
    }
    if (user) {
        return <Navigate replace to="/users/settings" />;
    }

    return (
        <div className={styles.containerLogin}>
            <div className={styles.imageBox}>
                <img className={styles.logo} src="/img/logo.svg" alt="logo devs united" />
                <img className={styles.title} src="/img/title.svg" alt="title devs united" />
            </div>
            <div className={styles.loginBox}>
                <div className={styles.login}>
                    <img src="/img/lorem.svg" alt="lorem ipsum dolor title" />
                    <p className={styles.intro}>
                        Lorem ipsum dolor sit amet, consectetur adopiscing elit
                    </p>
                </div>
                <div onClick={onLogin} className={styles.buttonBox}>
                    <div className={styles.boxGoogle}></div>
                    <img src="/img/Google.svg" alt="google logo" />
                    <button>Sign in with Google</button>
                </div>
                <p className={styles.copyright}>
                    © 2020 Devs_United - <span>BETA</span>
                </p>
            </div>
        </div>
    );
}
