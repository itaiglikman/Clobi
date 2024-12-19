import styled from "styled-components";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledMenu = styled(Menu)`
  flex: 1;
  border: 1px solid black;
`;

export const StyledHeader = styled(Header)`
  // Add your styles here
`;

export const StyledRouting = styled(Routing)`
  // Add your styles here
`;