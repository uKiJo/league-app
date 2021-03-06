import React from "react";

import { Link } from "react-router-dom";

import "./homepage.styles.scss";

import illu_1 from "./img/illustration.svg";

import Header from "../../components/header/header.component";

const HomePageButton = ({ children, route }) => {
  return (
    <Link className="button-link" to={`${route}`}>
      {children}
    </Link>
  );
};

const HomePage = ({currentUser}) => {
  return (
    <div className="homepage">
      
      <div className="container">
        
        <Header currentUser={currentUser} />
        <div className="intro__container">
          <section className="intro__section">
            <div className="intro__content">
              <h1>Create your own football league.</h1>
              <p>
                Create your own custom league easily only within few clicks.
              </p>

              <div className="intro__buttons">
                <HomePageButton
                  route="/custom"
                  children="Custom league"
                />
                <HomePageButton route={currentUser ? '/create' : '/signin'} children="Create Premier league" />
              </div>
            </div>

            

            <div className="intro__img">
              <img src={illu_1} alt="illustration" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
