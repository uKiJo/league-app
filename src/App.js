import React, { useState, useEffect } from "react";

import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import PremierLeague from "./pages/premier-league/premier-league.component";
import Fixture from "./components/fixture/fixture.component";

import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useRecoilState } from "recoil";

import { userState } from "./recoil/atoms/userState.atom";

import { Routes, Route, useNavigate } from "react-router-dom";





function App() {

  

  const [currentUser, setCurrentUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {


    const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if(user) {
        
        console.log(user.uid);
        navigate('/')
      }
    });

    return () => {
      unsubscribeFromAuth();
    }
  }, [currentUser])

  return (
    <Routes>
      <Route path="/" element={<HomePage currentUser={currentUser} />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="pl" element={<PremierLeague />} />
      <Route path="custom" element={<Fixture />} />
    </Routes>
  );
}

export default App;
