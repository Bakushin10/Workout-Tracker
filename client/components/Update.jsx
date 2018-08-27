import React from 'react';
import { Row, Col, Button, Checkbox, DatePicker, Dropdown, Menu} from 'antd';
import Header from './utility/header';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { MUSCLEPARTS } from './utility/CommonJS';
let querystring = require('querystring');

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            date : "", // ex) 7-22-2018
            day : "", // Mon, Tues, Wed...
            workoutDay : "",
            submitted : false,
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
        this.updatePickerOnChange = this.updatePickerOnChange.bind(this);
        this.submit = this.submit.bind(this);
        this.datePicker = this.datePicker.bind(this);
        this.displayDate = this.displayDate.bind(this);
        this.workoutPicker = this.workoutPicker.bind(this);
        this.getMuscleUsed = this.getMuscleUsed.bind(this);
        this.pickWorkOutDay = this.pickWorkOutDay.bind(this);
        this.pickWorkOutDayOnClick = this.pickWorkOutDayOnClick.bind(this);
        this.displayWorkOutDay = this.displayWorkOutDay.bind(this);
        this.hasWorkoutSelectedItem = this.hasWorkoutSelectedItem.bind(this);
        this.hasWorkoutDay = this.hasWorkoutDay.bind(this);
        this.hasDate = this.hasDate.bind(this);
    }

    showChestDetails(){
        if(this.state.chestDetail){
            return(
                <div>
                    <Col span={5} offset = {6}>
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
                    </Col>
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
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "legs", "LegPress") }>Leg Press</Checkbox>
                    <br />
                    <Checkbox onChange = { (e) => this.updateMuscleItem(e, "legs", "Squat") }>Squat</Checkbox>
                </div>
            )
        }
    }

    muscleOnChange(e, muscle) {
        let muscleDetail = muscle + "Detail";
        if(this.state[muscleDetail]){
            this.state[muscleDetail] = false;
            for(let item in this.state.muscleGroup[muscle]){
                this.state.muscleGroup[muscle][item] = false;
            }
        }else{
            this.setState({ [muscleDetail] : true})
        }
        this.updateSelectedItem()
    }

    updateMuscleItem(e, muscle ,itemToUpdate){
        let muscleGroup = Object.assign({}, this.state.muscleGroup);
        muscleGroup[muscle][itemToUpdate] ^= true; //flip the condition everytime
        this.setState({muscleGroup})
        this.updateSelectedItem();
    }
    
    updateSelectedItem(){
        let updatedSelectedItem = [];
        
        for(let muscle in this.state.muscleGroup){
            let muscleDetail = muscle + "Detail";
            if(this.state[muscleDetail]){
                updatedSelectedItem.push(<div><b>{muscle}</b></div>)
                for(let item in this.state.muscleGroup[muscle]){
                    if(this.state.muscleGroup[muscle][item]){
                        updatedSelectedItem.push(<div>{item}</div>)
                    }
                }
            }
        }

        this.setState({selectedItems : updatedSelectedItem })
    }

    hasWorkoutSelectedItem(){
        return this.state.selectedItems.length === 0 ? true : false;
    }

    hasWorkoutDay(){
        return this.state.workoutDay !== "" ? true : false
    }

    hasDate(){
        return this.state.date === "" ? true : false
    }

    showSelectedItems(){
        if(this.hasWorkoutSelectedItem()){
            return(<div className = "wordColor">No Items Selected</div>)
        }else{
            return this.state.selectedItems;
        }
    }

    submitButton(){
        if(this.hasWorkoutSelectedItem()){
            return (<Button type="primary" disabled>Submit</Button>)
        }else{
            return (<Button type="primary" onClick = {this.submit}>Submit</Button>)
        }
    }

    updatePickerOnChange(e) {
        let date = e._d.toString().split(" ");
        const day = date[0];
        const datePicked = date[1] + "-" + date[2] + "-" + date[3];

        this.setState({date: datePicked})
        this.setState({day : day})
    }

    datePicker(){
        if(this.hasWorkoutDay()){
            return(
                <div className = "button-center">
                    <DatePicker onChange={(e) => this.updatePickerOnChange(e)} />
                </div>
            )
        }else{
            return(                    
                <div className = "button-center">
                    <DatePicker disabled onChange={(e) => this.updatePickerOnChange(e)} />
                </div>
            )   
        }
    }

    displayWorkOutDay(){
        if(this.hasWorkoutDay()){
            return(
                <div>{ this.state.workoutDay + " Day"}</div>
            )
        }else{
            return(
                <div className = "wordColor">No Workout day Selected</div>
            )
        }
    }

    displayDate(){
        if(this.hasDate()){
            return(
                <div className = "wordColor">No workout Date Selected</div>
            )
        }else{
            return(
                <div>{ this.state.day + " " + this.state.date }</div>
            )
        }
    }

    workoutPicker(){
        if(this.hasDate()){
            return(
                <div align="left" >
                    <Checkbox disabled><b>Chest</b></Checkbox>
                    <Checkbox disabled><b>Back</b></Checkbox>
                    <Checkbox disabled><b>shoulder</b></Checkbox>
                    <Checkbox disabled><b>biceps</b></Checkbox>
                    <Checkbox disabled><b>triceps</b></Checkbox>
                    <Checkbox disabled><b>Legs</b></Checkbox>
                </div>
            )
        }else{
            return(
                <div>
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
                </div>
            )
        }
    }

    getMuscleUsed(){
        let muscleUsed = MUSCLEPARTS.map( item =>{
            let detail = item + "Detail"
            if(this.state[detail]){
                return this.state[detail]
            }
        })

        return muscleUsed
    }

    pickWorkOutDayOnClick(e, muscle){
        const self = this
        self.setState({workoutDay : muscle})
        console.log(this.state.workoutDay)
    }

    pickWorkOutDay(){
        const menu = (
            <Menu>
                <Menu.Item>
                    <div type="primary" onClick = { (e) => this.pickWorkOutDayOnClick(e, "Chest")}>Chest</div>
                </Menu.Item>
                <Menu.Item>
                    <div type="primary" onClick = { (e) => this.pickWorkOutDayOnClick(e, "Back")}>Back</div>
                </Menu.Item>
                <Menu.Item>
                    <div type="primary" onClick = { (e) => this.pickWorkOutDayOnClick(e, "Shoulder")}>Shoulder</div>
                </Menu.Item>
                <Menu.Item>
                    <div type="primary" onClick = { (e) => this.pickWorkOutDayOnClick(e, "Arms")}>Arms</div>
                </Menu.Item>
                <Menu.Item>
                    <div type="primary" onClick = { (e) => this.pickWorkOutDayOnClick(e, "Legs")}>Legs</div>
                </Menu.Item>
            </Menu>
            );

        return(
            <div>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button>bottomLeft</Button>
                </Dropdown>
            </div>
        )
    }

    submit(){
        let muscleUsed = this.getMuscleUsed()
        axios.post('/updateWorkout',
            querystring.stringify({
                        date : this.state.date,
                        day : this.state.day,
                        muscleUsed : muscleUsed,
                        workoutDay : this.state.workoutDay,
                        // chest
                        BarbellBenchPress : this.state.muscleGroup.chest.BarbellBenchPress,
                        FlatBenchDumbbellPress : this.state.muscleGroup.chest.FlatBenchDumbbellPress,
                        InclineDumbbellPress : this.state.muscleGroup.chest.InclineDumbbellPress,
                        LowInclineBarbellBenchPress : this.state.muscleGroup.chest.LowInclineBarbellBenchPress,
                        SeatedMachineChestPress : this.state.muscleGroup.chest.SeatedMachineChestPress,
                        Dips : this.state.muscleGroup.chest.Dips,
                        InclineBenchCableFly : this.state.muscleGroup.chest.InclineBenchCableFly,
                        pushUps : this.state.muscleGroup.chest.pushUps,

                        // back
                        Deadlist : this.state.muscleGroup.back.Deadlist,
                        Pullups : this.state.muscleGroup.back.Pullups,
                        ChinUps : this.state.muscleGroup.back.ChinUps,
                        WideGripRearPullUp : this.state.muscleGroup.back.WideGripRearPullUp,
                        OneArmDumbellRow : this.state.muscleGroup.back.OneArmDumbellRow,
                        V_barPulldown : this.state.muscleGroup.back.V_barPulldown,
                        WideBarPulldown : this.state.muscleGroup.back.WideBarPulldown,

                        // shoulder
                        StandingDumbellPress : this.state.muscleGroup.shoulder.StandingDumbellPress,
                        StandingMilitaryPress : this.state.muscleGroup.shoulder.StandingMilitaryPress,
                        SeatedBarbellMilitaryPress : this.state.muscleGroup.shoulder.SeatedBarbellMilitaryPress,
                        OneArmSideLaterals : this.state.muscleGroup.shoulder.OneArmSideLaterals,
                        PowerPartials : this.state.muscleGroup.shoulder.PowerPartials,

                        // biceps
                        EZBarCurl : this.state.muscleGroup.biceps.EZBarCurl,
                        CloseGripEZBarCurl : this.state.muscleGroup.biceps.CloseGripEZBarCurl,
                        ConcentrationCurls : this.state.muscleGroup.biceps.ConcentrationCurls,
                        HammerCurls : this.state.muscleGroup.biceps.HammerCurls,
                        InclineDumbbellCurls : this.state.muscleGroup.biceps.InclineDumbbellCurls,
                        CableCurl : this.state.muscleGroup.biceps.CableCurl,
                        
                        // triceps
                        TricepsPushdown : this.state.muscleGroup.triceps.TricepsPushdown,
                        BenchDip : this.state.muscleGroup.triceps.BenchDip,
                        EZBarTriceps : this.state.muscleGroup.triceps.EZBarTriceps,
                        SeatedTricepsPress : this.state.muscleGroup.triceps.SeatedTricepsPress,
                        CloseGripBarbellBenchPress : this.state.muscleGroup.triceps.CloseGripBarbellBenchPress,

                        // legs
                        LegPress : this.state.muscleGroup.legs.LegPress,
                        Squat : this.state.muscleGroup.legs.Squat
                    }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      this.setState({submitted : true})
    }

    render() {
        if(this.state.submitted){
            return (<Redirect to ={`/Result`}/>);
        }
        return (
            <div>
                <Header/>
                <div className = "welcomeText">
                    What did you workout?
                </div>
                    <Row>
                        <Col span={5} offset = {6}>
                            { this.pickWorkOutDay() }
                        </Col>
                        <Col span={5}>
                            { this.displayWorkOutDay() }
                        </Col>
                    </Row>
                    <Row className = "space">
                        <Col span={5} offset = {5}>
                            {this.datePicker()}
                        </Col>

                        <Col span={3} offset = {1}>
                            { this.displayDate()}
                        </Col>
                    </Row>
                    <Row className = "space">
                        <Col span={5} offset = {5}>
                            {this.workoutPicker()}
                        </Col>
                        <Col span={2} offset = {1}>
                        { this.showSelectedItems() }
                        </Col>
                    </Row>
                    <Row className = "space">
                        <Col span={8} offset = {6}>
                            
                            <div>
                                { this.submitButton()}
                            </div>
                        </Col>
                    </Row>
            </div>
        );
    }
  }