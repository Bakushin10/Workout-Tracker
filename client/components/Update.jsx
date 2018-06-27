import React from 'react';
import { Row, Col, Button, Checkbox} from 'antd';
import Header from './utility/header';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            chestDetail : false,
            chest : {
                BarbellBenchPress : false,
                FlatBenchDumbbellPress : false,
                InclineDumbbellPress : false,
                LowInclineBarbellBenchPress : false,
                SeatedMachineChestPress : false,
                Dips : false,
                InclineBenchCableFly : false,
                pushUps : false
            }
        }
        this.ShowChestDetails = this.ShowChestDetails.bind(this);
        
        this.chestOnChange = this.chestOnChange.bind(this);
        this.BarbellBenchPressOnChange = this.BarbellBenchPressOnChange.bind(this);
    }

    chestOnChange(e) {
        if(this.state.chestDetail){
            this.setState({chestDetail : false})
            // make the all chest elements false
            this.setState({chest : {BarbellBenchPress : false}});
            console.log("this.setState.BarbellBenchPress")
            console.log(this.state.chest.BarbellBenchPress)
        }else{
            this.setState({chestDetail : true})
        }
    }

    BarbellBenchPressOnChange(e) {
        console.log("BarbellBenchPressOnChange")
        console.log(this.state.chest.BarbellBenchPress)
        if(this.state.chest.BarbellBenchPress){
            this.setState({chest : {BarbellBenchPress : false}})
        }else{
            this.setState({chest : {BarbellBenchPress : true}})
        }
    }

    ShowChestDetails(){
        if(this.state.chestDetail){
            return(
                <div>
                    <Checkbox onChange = {this.BarbellBenchPressOnChange} >Barbell Bench Press</Checkbox>
                    <br />
                    <Checkbox >Flat Bench Dumbbell Press</Checkbox>
                    <br />
                    <Checkbox >Incline Dumbbell Press</Checkbox>
                    <br />
                    <Checkbox >Low-Incline Barbell Bench Press (downward)</Checkbox>
                    <br />
                    <Checkbox >Seated Machine Chest Press  </Checkbox>
                    <br />
                    <Checkbox >Dips For Chest </Checkbox>
                    <br />
                    <Checkbox >Incline Bench Cable Fly  </Checkbox>
                    <br />
                    <Checkbox >push ups</Checkbox>
                </div>
            )
        }
    }

    render() {
      return (
        <div>
            <Header>
            </Header>
            <div className = "welcomeText">
                What did you workout?
            </div>
            
                <Col span={5} offset = {6}>
                    <Checkbox onChange={this.chestOnChange}>Chest</Checkbox>
                    {this.ShowChestDetails()}
                    <Checkbox >Back</Checkbox>
                    <Checkbox >Back</Checkbox>
                    <Checkbox >Back</Checkbox>
                    <Checkbox >Back</Checkbox>
                    <Checkbox >Back</Checkbox>
                </Col>
                <Col span = {2} className = "vl"></Col>
                <Col span={8}>
                    selected item goes here
                </Col>
            
        </div>
      );
    }
  }