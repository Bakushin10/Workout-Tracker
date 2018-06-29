import React from 'react';
import { Row, Col, Button, Checkbox} from 'antd';
import Header from './utility/header';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedItems : [],
            chestDetail : false,
            backDetail : false,
            muscleGroup :{
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
                biceps : {
                    EZBarCurl : false,
                    CloseGripEZBarCurl : false,
                    ConcentrationCurls : false,
                    HammerCurls : false,
                    InclineDumbbellCurls : false,
                    CableCurl : false
                },
                triceps : {
                    TricepsPushdown : false,
                    BenchDip : false,
                    EZBarTriceps : false,
                    SeatedTricepsPress : false,
                    CloseGripBarbellBenchPress : false
                },
                legs :{
                    Deadlist : false,
                    LegPress : false,
                    Squat : false
                }
            }
        }
        this.ShowChestDetails = this.ShowChestDetails.bind(this);
        this.ShowBackDetails = this.ShowBackDetails.bind(this);

        this.chestOnChange = this.chestOnChange.bind(this);
        this.backOnChange = this.backOnChange.bind(this);
        this.UpdateSelectedItem = this.UpdateSelectedItem.bind(this);
        this.chestItemUpdate = this.chestItemUpdate.bind(this);
        this.ShowSelectedItems = this.ShowSelectedItems.bind(this);
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

    ShowBackDetails(){
        if(this.state.backDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "Deadlist") } >Deadlist</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "Pullups") }>Pullups</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "ChinUps") }>ChinUps</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "WideGripRearPullUp") }>Wide-Grip Rear PullUp</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "OneArmDumbellRow") }>One Arm Dumbell Row</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "V_barPulldown") }>V-bar Pulldown</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.backItemUpdate(e, "WideBarPulldown") }>Wide Bar Pulldown </Checkbox>
                </div>
            )
        }
    }

    /*
     * 
     * ---------------------- chest -----------------------------
     *
     */
    chestOnChange(e) {
        if(this.state.chestDetail){
            this.setState({chestDetail : false})

            for(var item in this.state.muscleGroup.chest){ // make the all chest elements false
                this.state.muscleGroup.chest[item] = false;
            }
            this.UpdateSelectedItem("chest")
        }else{
            this.setState({chestDetail : true})
        }
        console.log(this.state.muscleGroup.chest)
    }

    chestItemUpdate(e, itemToUpdate){
        let muscleGroup = Object.assign({}, this.state.muscleGroup);
        muscleGroup["chest"][itemToUpdate] ^= true; //flip the condition everytime
        this.setState({muscleGroup})
        this.UpdateSelectedItem("chest");
    }

    /*
     * 
     * ---------------------- back -----------------------------
     *
     */
    backOnChange(e) {
        if(this.state.backDetail){
            this.setState({backDetail : false})

            for(var item in this.state.muscleGroup.back){ // make the all chest elements false
                this.state.muscleGroup.back[item] = false;
            }
        }else{
            this.setState({backDetail : true})
        }
    }

    backItemUpdate(e, itemToUpdate){
        let muscleGroup = Object.assign({}, this.state.muscleGroup);
        muscleGroup["back"][itemToUpdate] ^= true; //flip the condition everytime
        this.setState({muscleGroup})
        this.UpdateSelectedItem("back");
    }

    /**
     *  update UpdateSelectedItem() so that it keeps that items in selectedItems and add new items to the selectedItems
     * 
     */
    UpdateSelectedItem(muscleGroup){
        var updatedSelectedItem = [];
        for(var item in this.state.muscleGroup[muscleGroup]){
            if(this.state.muscleGroup[muscleGroup][item]){
                updatedSelectedItem.push(<div>{item}</div>)
            }
        }

        // adding the mustle groupe name at the beginning of the array
        if(updatedSelectedItem.length >= 1){
            updatedSelectedItem.unshift(<div><b>{muscleGroup}</b></div>)
        }

        this.setState({selectedItems : updatedSelectedItem })
    }

    ShowSelectedItems(){
        return this.state.selectedItems;
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
                    <Checkbox onChange={this.backOnChange}>Back</Checkbox>
                    {this.ShowBackDetails()}
                </Col>
                <Col span = {2} className = "vl"></Col>
                <Col span={8}>
                    selected item goes here
                    { this.ShowSelectedItems() }
                </Col>
        </div>
      );
    }
  }