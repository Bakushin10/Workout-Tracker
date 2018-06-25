import React from 'react';
import { Row, Col } from 'antd';
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
                <Col xs="6" sm="4">
                How Was Your Workout Today?
                    <div className = "welcomeText">
                        How Was Your Workout Today?
                    </div>
                </Col>
            </Row>
        </div>
      );
    }
  }