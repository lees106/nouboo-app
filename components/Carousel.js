import React from "react";
import styled from "styled-components";

const Carousel = props => (
  <MainContainer>
    <Container style={{ elevation: 10 }}>
      <Cover>
        <Image source={props.image} />
        <Title>{props.title}</Title>
      </Cover>
    </Container>
  </MainContainer>
);

export default Carousel;

const MainContainer = styled.View`
  background: #03dac6;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 30px 0px 0px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background: black;
  width: 54px;
  height: 54px;
  border-radius: 26px;
  justify-content: center;
  align-items: center;
`;

const Cover = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
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
  color: white;
  font-size: 10px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
  width: 170px;
`;
