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
                <Col xs="6" sm="4">
                How Was Your Workout Today?
                    <div className = "welcomeText">
                        How Was Your Workout Today?
                    </div>
                </Col>
            </Row>
            <div className="gutter-example">
                <Row gutter={16}>
                    <a href="/#/Update">
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" className = "fontSongMyung">
                                update
                            </Button>
                        </Col>
                    </a>
                    <a href="/#/Home">
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" className = "fontSongMyung">
                                Check Your Progress
                            </Button>
                        </Col>
                    </a>
                </Row>
            </div>
        </div>
      );
    }
  }