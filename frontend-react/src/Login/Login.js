import React, {useEffect, useState} from 'react';

import useAuths from './useAuths';

function Login() {
    const [cit, setCit] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    
    const {
        addAuthToken,
        user,
        error: errorMessage,
    } = useAuths();

    // useEffect(()=>{
    //     getCandidates()
    // }, [getCandidates]);

    // console.log(candidates);
    // console.log(errorMessage);

    const handleClick = event => {
        event.preventDefault();
        const data = new FormData()
        data.append('face_image', file)
        data.append('citizenship_number', cit)
        data.append('password', password)
        addAuthToken(data)
    }
    
    return (
        <div>
            <input type="text" value={cit} onChange={e => setCit(e.target.value)}
                placeholder="Citizenship Number" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" />
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            
            <button onClick={(event) => handleClick(event)}>
                Login
            </button>
        </div>
    )
}

export default Login;
