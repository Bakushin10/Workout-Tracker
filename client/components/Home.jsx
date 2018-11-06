import React from 'react';
import { Row, Col, Button } from 'antd';
import Header from './utility/header';

export default class Home extends React.Component {

    render() {
      return (
        <div>
            <Header>
            </Header>
            <Row>
                <Col xs="6" sm="4">
                    <div className = "welcomeText">
                        How Was Your Workout Today?
                    </div>
                </Col>
            </Row>
            <div className="gutter-example">
                <Row type="flex" justify="center">
                    <Col span={4} className="gutter-row" span={4}>
                        <Button type="primary" className = "fontSongMyung">
                        <a href="/#/Update">
                            update
                            </a>
                        </Button>
                    </Col>
                    
                    <Col span={4} className="gutter-row" span={4}>
                        <Button type="primary" className = "fontSongMyung">
                            <a href="/#/Calendar" className="items">
                                See Calendar
                            </a>
                        </Button>
                    </Col>
                
                    <Col span={4} className="gutter-row" span={4}>
                        <Button type="primary" className = "fontSongMyung">
                            <a href="/#/Result" className="items">
                                Check Your Progress
                            </a>
                        </Button>
                    </Col>
                   
                </Row>
            </div>
        </div>
      );
    }
  }