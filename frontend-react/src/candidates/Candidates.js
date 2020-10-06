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

    console.log(candidates);
    // console.log(errorMessage);

    const CandidateList = () =>(
        candidates.map(candidate => (<button>{candidate.id}</button>))
    );
    
    return (
        <div>
            <h1>Candidate List</h1>
            <CandidateList />
        </div>
    )
}

export default Candidates;
