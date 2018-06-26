import React from 'react';
import { Row, Col, Button } from 'antd';
import Header from './utility/header';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Home extends React.Component {

    render() {
      return (
        <div>
            <Header>
            </Header>
            <Row>
                <span className = "welcomeText">
                    What did you workout?
                </span>
            </Row>
        </div>
      );
    }
  }