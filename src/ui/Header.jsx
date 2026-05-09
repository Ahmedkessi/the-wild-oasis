import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    border-bottom: 1px solid var(--color-grey-100);
    padding: 1.4rem 4.8rem;
    grid-column: 2/-1;

    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: flex-end;
`;


const Header = () => {
  return (
    <StyledHeader>
        <UserAvatar />
        <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
