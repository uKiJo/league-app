import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

import './header.styles.scss';

const Header = ({currentUser}) => {
    return (
        <div className='header'>
            <Link className='option' to='/'>Logo</Link>

            {
                currentUser && <div className='option'>My leagues</div> 

            }

            {
                currentUser ?
                <div className='option' onClick={() => signOut(auth)} >Sign out</div> :
                <Link className='option' to='signin'>Sign in</Link>
            }
            
            <Link className='option' to='signup'>Sign up</Link>
        </div>
    )
}

export default Header;
