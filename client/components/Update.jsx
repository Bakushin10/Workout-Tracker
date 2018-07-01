import React from 'react';
import { Row, Col, Button, Checkbox} from 'antd';
import Header from './utility/header';
import ReactDOM from 'react-dom';
import axios from 'axios';
const MUSCLEGROUP = ['chest', 'back', 'shoulder', 'biceps', 'triceps']

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedItems : [],
            chestDetail : false,
            backDetail : false,
            shoulderDetail : false,
            bicepsDetail : false,
            tricepsDetail : false,
            legsDetail : false,
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
        this.showChestDetails = this.showChestDetails.bind(this);
        this.showBackDetails = this.showBackDetails.bind(this);
        this.showShoulderDetails = this.showShoulderDetails.bind(this);
        this.showBicepsDetails = this.showBicepsDetails.bind(this);
        this.showTricepsDetails = this.showTricepsDetails.bind(this);
        this.showLegsDetails = this.showLegsDetails.bind(this);

        this.muscleOnChange = this.muscleOnChange.bind(this);
        this.updateSelectedItem = this.updateSelectedItem.bind(this);
        this.updateMuscleItem = this.updateMuscleItem.bind(this);
        this.showSelectedItems = this.showSelectedItems.bind(this);
        this.submitButton =  this.submitButton.bind(this);
        this.submit = this.submit.bind(this);
    }

    showChestDetails(){
        if(this.state.chestDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "BarbellBenchPress") } >Barbell Bench Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "FlatBenchDumbbellPress") }>Flat Bench Dumbbell Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "InclineDumbbellPress") }>Incline Dumbbell Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "LowInclineBarbellBenchPress") }>Low-Incline Barbell Bench Press (downward)</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "SeatedMachineChestPress") }>Seated Machine Chest Press  </Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "Dips") }>Dips</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest", "InclineBenchCableFly") }>Incline Bench Cable Fly  </Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "chest","pushUps") }>push ups</Checkbox>
                </div>
            )
        }
    }

    showBackDetails(){
        if(this.state.backDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "Deadlist") } >Deadlist</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "Pullups") }>Pullups</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "ChinUps") }>ChinUps</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "WideGripRearPullUp") }>Wide-Grip Rear PullUp</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "OneArmDumbellRow") }>One Arm Dumbell Row</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "V_barPulldown") }>V-bar Pulldown</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "back", "WideBarPulldown") }>Wide Bar Pulldown </Checkbox>
                </div>
            )
        }
    }

    showShoulderDetails(){
        if(this.state.shoulderDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "shoulder", "StandingDumbellPress") } >Standing Dumbell Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "shoulder", "StandingMilitaryPress") }>Standing Military Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "shoulder", "SeatedBarbellMilitaryPress") }>Seated Barbell Military Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "shoulder", "OneArmSideLaterals") }>One Arm Side Laterals</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "shoulder", "OneArmDumbellRow") }>One Arm Dumbell Row</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "shoulder", "PowerPartials") }>Power Partials</Checkbox>
                </div>
            )
        }
    }

    showBicepsDetails(){
        if(this.state.bicepsDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "biceps", "EZBarCurl") } >EZ-BarCurl</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "biceps", "CloseGripEZBarCurl") }>Close Grip EZ-BarCurl</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "biceps", "ConcentrationCurls") }>Concentration Curls</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "biceps", "HammerCurls") }>Hammer Curls</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "biceps", "InclineDumbbellCurls") }>Incline Dumbbell Curls</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "biceps", "CableCurl") }>Cable Curl</Checkbox>
                </div>
            )
        }
    }

    showTricepsDetails(){
        if(this.state.tricepsDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "triceps", "TricepsPushdown") } >Triceps Pushdown</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "triceps", "BenchDip") }>Bench Dip</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "triceps", "EZBarTriceps") }>EZ-Bar Triceps</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "triceps", "SeatedTricepsPress") }>Seated Triceps Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "triceps", "CloseGripBarbellBenchPress") }>Close Grip Barbell Bench Press</Checkbox>
                </div>
            )
        }
    }

    showLegsDetails(){
        if(this.state.legsDetail){
            return(
                <div>
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "legs", "Deadlist") } >Deadlist</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "legs", "LegPress") }>Leg Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "legs", "Squat") }>Squat</Checkbox>
                </div>
            )
        }
    }

    muscleOnChange(e, muscle) {
        var muscleDetail = muscle + "Detail";
        if(this.state[muscleDetail]){
            this.setState({ [muscleDetail] : false})
            for(var item in this.state.muscleGroup[muscle]){
                this.state.muscleGroup[muscle][item] = false;
            }
        }else{
            this.setState({ [muscleDetail] : true})
        }
        console.log(muscle)
        console.log(this.state[muscleDetail])
        this.updateSelectedItem()
    }

    updateMuscleItem(e, muscle ,itemToUpdate){
        let muscleGroup = Object.assign({}, this.state.muscleGroup);
        muscleGroup[muscle][itemToUpdate] ^= true; //flip the condition everytime
        this.setState({muscleGroup})
        this.updateSelectedItem();
    }
    
    updateSelectedItem(){
        var updatedSelectedItem = [];
        
        for(var muscle in this.state.muscleGroup){
            var muscleDetail = muscle + "Detail";
            if(this.state[muscleDetail]){
                updatedSelectedItem.push(<div><b>{muscle}</b></div>)
                for(var item in this.state.muscleGroup[muscle]){
                    if(this.state.muscleGroup[muscle][item]){
                        updatedSelectedItem.push(<div>{item}</div>)
                    }
                }
            }
        }

        this.setState({selectedItems : updatedSelectedItem })
    }

    showSelectedItems(){
       return this.state.selectedItems;
    }

    submitButton(){
        if(this.state.selectedItems.length === 0){
            return (<Button type="primary" disabled>Submit</Button>)
        }else{
            return (<Button type="primary" onClick = {this.submit}>Submit</Button>)
        }
    }

    submit(){
        console.log("submit")
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
                    <Checkbox onChange = { (e) => this.muscleOnChange(e, "chest")}><b>Chest</b></Checkbox>
                    {this.showChestDetails()}
                    <Checkbox onChange = { (e) => this.muscleOnChange(e, "back")}><b>Back</b></Checkbox>
                    {this.showBackDetails()}
                    <Checkbox onChange = { (e) => this.muscleOnChange(e, "shoulder")}><b>shoulder</b></Checkbox>
                    {this.showShoulderDetails()}
                    <Checkbox onChange = { (e) => this.muscleOnChange(e, "biceps")}><b>biceps</b></Checkbox>
                    {this.showBicepsDetails()}
                    <Checkbox onChange = { (e) => this.muscleOnChange(e, "triceps")}><b>triceps</b></Checkbox>
                    {this.showTricepsDetails()}
                    <Checkbox onChange = { (e) => this.muscleOnChange(e, "legs")}><b>Legs</b></Checkbox>
                    {this.showLegsDetails()}
                </Col>
                <Col span = {2} className = "vl"></Col>
                <Col span={8}>
                    selected item goes here
                    { this.showSelectedItems() }
                    <div>
                        { this.submitButton()}
                    </div>
                </Col>
        </div>
      );
    }
  }