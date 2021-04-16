import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 25px;
  border-bottom: 3px solid #3b4253;
  color: white;
`;
const RightHeader = styled.div`
  display: flex;
  align-items: center;
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;
// const Img = styled.img`
//   width: 100px;
//   height: 40px;
// `;

const Header = () => {
  return (
    <Nav>
      <LeftHeader>Web Notes</LeftHeader>
      <RightHeader>Built with React, Node & FireBase</RightHeader>
    </Nav>
  );
};

export default Header;
