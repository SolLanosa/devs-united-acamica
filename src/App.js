import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Feed from "./components/Feed/Feed";
import ProfileFollowers from "./components/Profile Followers/ProfileFollowers";
import MyProfile from "./components/MyProfile/MyProfile";
import WithPadding from "./components/WithPadding/WithPadding";
import { auth, loginConGoogle } from "./firebase";
import { Route, Routes } from "react-router-dom";

function App() {
    const [user, setUser] = useState(null);

    const onLogin = async () => {
        const res = await loginConGoogle();
        console.log(user);
        setUser(res.user);
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    console.log("rendering");
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
                <Route path="/login" element={<LoginPage onLogin={onLogin} user={user} />} />
            </Routes>
        </div>
    );
}

export default App;
