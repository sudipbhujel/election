import React, {useEffect, useState} from 'react';

import useCandidates from './useCandidates';

function Candidates() {
    const {
        getCandidates,
        candidates,
        error: errorMessage,
    } = useCandidates();

    useEffect(()=>{
        getCandidates()
    }, [getCandidates]);

    // console.log(candidates);
    // console.log(errorMessage);
    
    return (
        <div>Hello</div>
    )
}

export default Candidates;
