import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Feed from "./components/Feed/Feed";
import ProfileFollowers from "./components/Profile Followers/ProfileFollowers";
import MyProfile from "./components/MyProfile/MyProfile";
import WithPadding from "./components/WithPadding/WithPadding";
import { auth, firestore, loginConGoogle, logout } from "./firebase";
import { Route, Routes, Navigate } from "react-router-dom";
import UserSettings from "./components/UserSettings/UserSettings";
import { collections } from "./firebase/firebaseConfig";

function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const onLogout = async () => {
        console.log("hola");
        await logout();
        setUser(null);
    };
    const getUserAndUpsert = async (oneUser) => {
        const doc = await firestore.collection(collections.USERS).doc(oneUser.uid).get();
        if (doc.exists) {
            setUser(doc.data());
        } else {
            const newUser = {
                username: "",
                color: "",
                uid: oneUser.uid,
                profilePicture: oneUser.photoURL,
            };
            firestore.collection(collections.USERS).doc(oneUser.uid).set(newUser);

            setUser(newUser);
        }
    };
    const onLogin = async () => {
        const res = await loginConGoogle();
        setLoading(true);
        await getUserAndUpsert(res.user);
        setLoading(false);
    };

    const updateUser = async (color, username) => {
        const updatedUser = { ...user, color, username };
        await firestore.collection(collections.USERS).doc(user.uid).set(updatedUser);
        setUser(updatedUser);
    };

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            if (user) {
                getUserAndUpsert(user)
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <WithPadding>
                            <Feed user={user} />
                        </WithPadding>
                    }
                />
                <Route
                    path="/login"
                    element={<LoginPage onLogin={onLogin} user={user} loading={loading} />}
                />
                <Route
                    path="/users/settings"
                    element={<UserSettings user={user} updateUser={updateUser} />}
                />
                <Route
                    path="/users/me/favorites"
                    element={
                        <WithPadding>
                            <MyProfile user={user} onLogout={onLogout} />
                        </WithPadding>
                    }
                />
                <Route
                    path="/users/me/posts"
                    element={
                        <WithPadding>
                            <MyProfile user={user} isPost onLogout={onLogout} />
                        </WithPadding>
                    }
                />
                <Route
                    path="/users/:uid"
                    element={
                        <WithPadding>
                            <ProfileFollowers user={user} />
                        </WithPadding>
                    }
                />
                <Route path="/users/me/*" element={<Navigate replace to="/users/me/posts" />} />
                <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
