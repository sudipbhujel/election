import React, { useEffect, useState } from 'react';

import useProfile from './useProfile';

function Profile() {
    const {
        getProfile,
        profile,
        error: errorMessage,
    } = useProfile();

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    // console.log(profile);
    // console.log(errorMessage);

    return (
        <div>
            <h1>{ profile.first_name } { profile.last_name }</h1>
            <h1>{ profile.id }</h1>
            <img src={ profile.image } alt="Avatar"/>
        </div>
    );
}

export default Profile;
