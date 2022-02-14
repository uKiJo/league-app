import React from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import toast, { Toaster } from 'react-hot-toast';

import { fetchLeagues } from "../../firebase/firebase";
import { myLeaguesState } from "../../recoil/atoms/teams.atom";
import League from "../league/league.component";
import { SpinnerContainer } from "../loading-hoc/loading-hoc.styles";

import "./my-leagues.styles.scss";

const MyLeagues = ({ currentUser }) => {
  const myLeagues = useRecoilValue(myLeaguesState);
  const [Leagues, setLeagues] = useRecoilState(myLeaguesState);

  const errorAlert = () => toast.error('Something weng wrong, please try again.', {duration: 5000});

  const {data, isLoading, isError, error} = useQuery(["leagues", {currentUser}],  () => fetchLeagues(currentUser));

  //add is loading
  if(isLoading) return <div className="spinner-container"><SpinnerContainer width="50px" /></div> 
  if(isError) return <Toaster />
  
  setLeagues(data)
  

  return (
    <div className="myleagues-container">
      <div className="title">
        <h1>My Leagues</h1>
      </div>
      <div className="content">
        {myLeagues.map((league) => (
          <League name={league} />
        ))}
        
      </div>
    </div>
  );
};

export default MyLeagues;
