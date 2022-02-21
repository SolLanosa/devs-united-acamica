import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import styles from "./UserSettings.module.css";

export default function UserSettings({ user, updateUser }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("red");
    const handleInputChange = (e) => setName(e.target.value);
    const handleColorChange = (color) => setColor(color);

    if (!user) {
        return <Navigate replace to="/login" />;
    }
    if (user.color && user.username) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className={styles.containerSettings}>
            <div className={styles.imageBox}>
                <img className={styles.logo} src="/img/logo.svg" alt="logo devs united" />
                <img className={styles.title} src="/img/title.svg" alt="title devs united" />
            </div>
            <div className={styles.settingsBox}>
                <div className={styles.nameBox}>
                    <h2>
                        WELCOME <span>{name || "name"}!</span>
                    </h2>
                </div>
                <input
                    placeholder="Type your username"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                />
                <div className={styles.colorBox}>
                    <p>Select your favorite color</p>
                    <div className={styles.colorContainer}>
                        <div
                            className={color === "red" ? `red ${styles.selected}` : "red"}
                            onClick={() => handleColorChange("red")}
                        />
                        <div
                            className={color === "orange" ? `orange ${styles.selected}` : "orange"}
                            onClick={() => handleColorChange("orange")}
                        />
                        <div
                            className={color === "yellow" ? `yellow ${styles.selected}` : "yellow"}
                            onClick={() => handleColorChange("yellow")}
                        />
                        <div
                            className={color === "green" ? `green ${styles.selected}` : "green"}
                            onClick={() => handleColorChange("green")}
                        />
                        <div
                            className={color === "blue" ? `blue ${styles.selected}` : "blue"}
                            onClick={() => handleColorChange("blue")}
                        />
                        <div
                            className={color === "purple" ? `purple ${styles.selected}` : "purple"}
                            onClick={() => handleColorChange("purple")}
                        />
                    </div>
                </div>
                <button onClick={() => updateUser(color, name)} disabled={!name || !color}>
                    CONTINUE
                </button>
                <p className={styles.copyright}>
                    © 2020 Devs_United - <span>BETA</span>
                </p>
            </div>
        </div>
    );
}
