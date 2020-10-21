import React from 'react';

function Candidates({candidates}) {
    console.log(candidates)

    const CandidateList = () =>(
        candidates.map((candidate) => (<button key={candidate.id}>{candidate.id}</button>))
    );
    
    return (
        <div>
            <h1>Candidate List</h1>
            <CandidateList />
        </div>
    )
}

export default Candidates;
