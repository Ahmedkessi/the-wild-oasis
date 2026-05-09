import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledAppLayout = styled.main`
    background-color: lightblue;
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100dvh;
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 2rem;
    overflow: scroll;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`

const AppLayout = () => {
  return (
    <StyledAppLayout>
        <Header />
        <SideBar />
        <Main>
            <Container>
                <Outlet />
            </Container>
        </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;