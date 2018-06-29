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
            },
            back : {
                Deadlist : false,
                Pullups : false,
                ChinUps : false,
                WideGripRearPullUp : false,
                OneArmDumbellRow : false,
                V_barPulldown : false,
                WideBarPulldown : false,
            },
            shoulder :{
                StandingDumbellPress : false,
                StandingMilitaryPress : false,
                SeatedBarbellMilitaryPress : false,
                OneArmSideLaterals : false,
                PowerPartials : false,
            },
            Biceps : {
                EZBarCurl : false,
                CloseGripEZBarCurl : false,
                ConcentrationCurls : false,
                HammerCurls : false,
                InclineDumbbellCurls : false,
                CableCurl : false
            },
            Triceps : {
                TricepsPushdown : false,
                BenchDip : false,
                EZBarTriceps : false,
                SeatedTricepsPress : false,
                CloseGripBarbellBenchPress : false
            },
            Legs :{
                Deadlist : false,
                LegPress : false,
                Squat : false
            }
        }
        this.ShowChestDetails = this.ShowChestDetails.bind(this);
        
        this.chestOnChange = this.chestOnChange.bind(this);
        this.ChestSelectedItem = this.ChestSelectedItem.bind(this);
        this.chestItemUpdate = this.chestItemUpdate.bind(this);
    }

    ShowChestDetails(){
        if(this.state.chestDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "BarbellBenchPress") } >Barbell Bench Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "FlatBenchDumbbellPress") }>Flat Bench Dumbbell Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "InclineDumbbellPress") }>Incline Dumbbell Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "LowInclineBarbellBenchPress") }>Low-Incline Barbell Bench Press (downward)</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "SeatedMachineChestPress") }>Seated Machine Chest Press  </Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "Dips") }>Dips</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "InclineBenchCableFly") }>Incline Bench Cable Fly  </Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.chestItemUpdate(e, "pushUps") }>push ups</Checkbox>
                </div>
            )
        }
    }

    /** ---------------------- chest ------------------------------ ***/
    chestOnChange(e) {
        if(this.state.chestDetail){
            this.setState({chestDetail : false})

            for(var item in this.state.chest){ // make the all chest elements false
                this.state.chest[item] = false;
            }
        }else{
            this.setState({chestDetail : true})
        }
    }

    chestItemUpdate(e, itemToUpdate){
        let chest = Object.assign({}, this.state.chest);
        chest[itemToUpdate] ^= true; //flip the condition everytime 
        this.setState({chest})
        console.log(this.state.chest)
    }

    ChestSelectedItem(){
        var chestSelectedItem = []

        for(var item in this.state.chest){
            if(this.state.chest[item]){
                chestSelectedItem.push(<div>{item}</div>)
            }
        }

        // adding the mustle groupe name at the beginning of the array
        if(chestSelectedItem.length >= 1){
            chestSelectedItem.unshift(<div><b>Chest</b></div>)
        }
        return chestSelectedItem;
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
                </Col>
                <Col span = {2} className = "vl"></Col>
                <Col span={8}>
                    selected item goes here
                    {this.ChestSelectedItem()}
                </Col>
        </div>
      );
    }
  }