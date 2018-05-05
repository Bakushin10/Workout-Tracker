//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Header from './header';

const H1 = styled.h1`
    color: #FF1493;
`

export default class FourOhFour extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <H1>404</H1>
       </div> 
    );
  }
}