import React from 'react'
import CustomButton from '../../components/custom-button/custom-button.component';

import './premier-league.styles.scss';

const PremierLeague = () => {
    return (
        <div className='generate-button'>
            <CustomButton children='generate' />
        </div>
    )
}

export default PremierLeague;
