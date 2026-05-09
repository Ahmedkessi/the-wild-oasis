import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProtectedRout = ({children}) => {
    const {isAuthenticated, isLoading} = useUser()
    const navigate = useNavigate();

    useEffect(()=> {
        if(!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate]);


    if(isLoading) return <FullPage><Spinner /></FullPage>
    if(isAuthenticated && !isLoading) return children;
};

export default ProtectedRout;