import styled from "styled-components/macro";

export const Container = styled.div`
  overflow: hidden;
  box-shadow: 0px 2px 8px 0px #b0bec5;
  background-color: white;
  text-align: center;
  border-radius: 1rem;
  position: relative;
  width: 280px;
  margin-bottom: 1rem;
  margin-left: 1rem;
`;

export const Banner = styled.div`
  position: absolute;
  background-image: url(${({ src }) => src});
  height: 10rem;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Image = styled.img`
  width: 8rem;
  clip-path: circle(60px at center);
  margin-top: 4.5rem;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const SubTitle = styled.h2`
  color: #373a40;
  margin-top: 5px;
  font-size: 0.8rem;
`;

export const Description = styled.p`
  margin: 1rem 2rem;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  padding: 1rem;
  background-color: #651fff;
  cursor: pointer;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
