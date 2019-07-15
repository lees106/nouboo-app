import React from "react";
import styled from "styled-components";

const CoursesCard = props => (
  <Container style={{ elevation: 10 }}>
    <Cover>
      <Image source={props.image} />
      <Logo source={props.logo} />
    </Cover>
    <Title numberOfLines={1}>{props.title}</Title>
  </Container>
);

export default CoursesCard;

const Logo = styled.Image`
  width: 47px;
  height: 47px;
  top: 8px;
  left: 100px;
  border-radius: 22px;
  border: 0.5px solid black;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .25); 
`;

const Container = styled.View`
  background: transparent;
  width: 100%;
  height: 220px;
  border-radius: 14px;
  margin: 10px 15px 10px 13px;
  box-shadow: 10px 10px 14px rgba(0, 0, 0, 0.25); 
`;

const Cover = styled.View`
  width: 158px;
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  width: 100%;
  height: 30px;
  color: #ffffff;
  padding-top: 5px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, .15); 
`;
