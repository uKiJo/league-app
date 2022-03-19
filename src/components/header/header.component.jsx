import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

import './header.styles.scss';

const Header = ({currentUser}) => {

    const navigate = useNavigate();

    return (
        <div className='header'>
            <Link className='option' to='/'>Logo</Link>
            

            {
                currentUser && <Link className='option' to='/myleagues'>My Leagues</Link>

            }

            {
                currentUser ?
                <div className='option' onClick={() => {signOut(auth); navigate('/')} } >Sign out</div> :
                <Link className='option' to='/signin'>Sign in</Link>
            }
            
            <Link className='option' to='signup'>Sign up</Link>
        </div>
    )
}

export default Header;
