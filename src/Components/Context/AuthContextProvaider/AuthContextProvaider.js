import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../Firbase/Firbase.config";
export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthContextProvaider = ({ children }) => {
  const url = "https://interview-schedule-server.vercel.app/";

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  // console.log(user);
  const [editTaskDataLoad, setEditTaskDataLoad] = useState(null);
  const [themValue, setThemValue] = useState(false);
  const them = document.documentElement;

  // email & password user create
  const handelUserCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  // handle google sing Up
  const handelGoogleSingUpUser = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // handel user sing Out
  const handelSingOutUser = () => {
    return signOut(auth);
  };

  // login user email and password
  const handelLoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user tack
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current user");
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    url,
    userRole,
    setUserRole,
    themValue,
    setThemValue,
    loading,
    setLoading,
    user,
    handelUserCreate,
    updateUser,
    handelGoogleSingUpUser,
    handelSingOutUser,
    handelLoginUser,
    editTaskDataLoad,
    setEditTaskDataLoad,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvaider;
