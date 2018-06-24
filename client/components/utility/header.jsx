import React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const { Header } = Layout;

export default class Head extends React.Component {
  render() {
    return (
      <Layout>
        {/* <div className="web-head"> */}
        <Header>
          <Menu 
            theme="dark"
            mode="horizontal"
          >
            <Menu.Item key="1">
                <a className="special-text" href="/#">
                    Home
                </a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/#/Professor">
                Tracker
              </a>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="/#/Class" className="items">
                Update your Track
              </a>
            </Menu.Item>
          </Menu>
          </Header>
        {/* </div> 
        */}
      </Layout>
    );
  }
}