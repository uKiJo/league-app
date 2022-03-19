import React, { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import HomePage from "./pages/homepage/homepage.component";
import PremierLeague from "./pages/premier-league/premier-league.component";
import Fixture from "./components/fixture/fixture.component";
import Table from "./components/table/table.component";
import Header from "./components/header/header.component";
import MyLeagues from "./components/my-leagues/my-leagues.component";
import League from "./components/league/league.component";
import CreateLeague from "./components/create-league/create-league.component";
import { SpinnerContainer } from "./components/loading-hoc/loading-hoc.styles";

import { auth, fetchPremierLeagueData, fetchLeagues } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { addPropToTable } from "./utility/utils";

import {
  teamsState,
  tableState,
  myLeaguesState,
} from "./recoil/atoms/teams.atom";

import { Routes, Route, useNavigate } from "react-router-dom";
import { isCreatedState } from "./recoil/atoms/userState.atom";



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [teams, setTeams] = useRecoilState(teamsState);
  const [table, setTable] = useRecoilState(tableState);
  const [myLeagues, setMyLeagues] = useRecoilState(myLeaguesState);
  const [isCreated, setIsCreated] = useRecoilState(isCreatedState);
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        console.log(user);
        // setIsCreated(false)
        // setUserAuth(user);
        navigate("/");
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [currentUser]);

  const { data, isLoading, isError } = useQuery("data", fetchPremierLeagueData);
 
  if (isLoading) return <div>Loading...</div>;
  if (isError) return alert("something went wrong");
  if (!table.length) {
    const tableData = data.teams;
    const teamsNumber = tableData.length;

    const standing = tableData.map(el => addPropToTable(el, teamsNumber));
    console.log(standing)
    setTable(standing);
  }
  
  // if (leagues.status === 'success') setMyLeagues(leagues.data)

  setTeams(data.teams);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* <Route
          path="pl"
          element={<PremierLeague currentUser={currentUser} />}
        /> */}
        <Route path="custom" element={<Fixture />} />
        <Route path="table" element={<Table />} />
        <Route path="myleagues" element={<MyLeagues currentUser={currentUser} />}/>
        <Route path="myleagues/:leagueId" element={ <PremierLeague currentUser={currentUser} /> } />
          
        
        <Route path='create' element={<CreateLeague currentUser={currentUser} />} />
      </Routes>
    </>
  );
}

export default App;
