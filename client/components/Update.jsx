import React from 'react';
import { Row, Col, Button, Checkbox, DatePicker, Dropdown, Menu} from 'antd';
import Header from './utility/header';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Redirect } from 'react-router';
import { MUSCLEPARTS } from './utility/CommonJS';
import { convertMonth } from './utility/dictionary';
import ShowImage from './ShowImage';

let querystring = require('querystring');

export default class Home extends React.Component {

    constructor(){
        super();
        
        this.state = {
            date : "", // ex) 7-22-2018
            day : "", // Mon, Tues, Wed...
            month : "",
            year : "",
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
                    Deadlift : false,
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

        this.submit = this.submit.bind(this);
        this.muscleOnChange = this.muscleOnChange.bind(this);
        this.updateMuscleItem = this.updateMuscleItem.bind(this);
        this.showSelectedItems = this.showSelectedItems.bind(this);
        this.updatePickerOnChange = this.updatePickerOnChange.bind(this);
    }

    showChestDetails(){
        if(this.state.chestDetail){
            return(
                <div>
                    <Col span={5} offset = {6}>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "BarbellBenchPress") } >{<ShowImage fileName = "BBP" muscle="chest"/>}</Checkbox>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "FlatBenchDumbbellPress") }>{<ShowImage fileName = "FBDP"muscle="chest"/>}</Checkbox>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "InclineDumbbellPress") }>{<ShowImage fileName = "IDP" muscle="chest"/>}</Checkbox>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "LowInclineBarbellBenchPress") }> {<ShowImage fileName = "LIBBP" muscle="chest"/>} </Checkbox>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "SeatedMachineChestPress") }>{<ShowImage fileName = "SMCP" muscle="chest"/>}  </Checkbox>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "Dips") }>{<ShowImage fileName = "DIPS" muscle="chest"/>}</Checkbox>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest", "InclineBenchCableFly") }>{<ShowImage fileName = "IBCF" muscle="chest"/>}  </Checkbox>                
                        <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "chest","pushUps") }> {<ShowImage fileName = "PUS" muscle="chest"/>} </Checkbox>
                    </Col>
                </div>
            )
        }
    }

    showBackDetails(){
        if(this.state.backDetail){
            return(
                <div>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "Deadlift") }> { <ShowImage fileName = "DL" muscle="back"/>} </Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "Pullups") }> { <ShowImage fileName = "PUS" muscle="back"/>} </Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "ChinUps") }>{ <ShowImage fileName = "CUP" muscle="back"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "WideGripRearPullUp") }>{ <ShowImage fileName = "WGRP" muscle="back"/> }</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "OneArmDumbellRow") }>{ <ShowImage fileName = "OADR" muscle="back"/> }</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "V_barPulldown") }>{ <ShowImage fileName = "VBP" muscle="back"/> }</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "back", "WideBarPulldown") }>{ <ShowImage fileName = "WBP" muscle="back"/> } </Checkbox>
                </div>
            )
        }
    }

    showShoulderDetails(){
        if(this.state.shoulderDetail){
            return(
                <div>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "shoulder", "StandingDumbellPress") } >{ <ShowImage fileName = "SDP" muscle="shoulder"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "shoulder", "StandingMilitaryPress") }>{ <ShowImage fileName = "SMP" muscle="shoulder"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "shoulder", "SeatedBarbellMilitaryPress") }>{ <ShowImage fileName = "SBMP" muscle="shoulder"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "shoulder", "OneArmSideLaterals") }>{ <ShowImage fileName = "OASL" muscle="shoulder"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "shoulder", "PowerPartials") }>{ <ShowImage fileName = "PP" muscle="shoulder"/>}</Checkbox>
                </div>
            )
        }
    }

    showBicepsDetails(){
        if(this.state.bicepsDetail){
            return(
                <div>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "biceps", "EZBarCurl") } > { <ShowImage fileName = "EZC" muscle="biceps"/>} </Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "biceps", "CloseGripEZBarCurl") }>{ <ShowImage fileName = "CDEZC" muscle="biceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "biceps", "ConcentrationCurls") }>{ <ShowImage fileName = "CC" muscle="biceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "biceps", "HammerCurls") }>{ <ShowImage fileName = "HC" muscle="biceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "biceps", "InclineDumbbellCurls") }>{ <ShowImage fileName = "IDC" muscle="biceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "biceps", "CableCurl") }>{ <ShowImage fileName = "CBC" muscle="biceps"/>}</Checkbox>
                </div>
            )
        }
    }

    showTricepsDetails(){
        if(this.state.tricepsDetail){
            return(
                <div>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "triceps", "TricepsPushdown") }> { <ShowImage fileName = "TP" muscle="triceps"/>} </Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "triceps", "BenchDip") }>{ <ShowImage fileName = "TBP" muscle="triceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "triceps", "EZBarTriceps") }>{ <ShowImage fileName = "EZT" muscle="triceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "triceps", "SeatedTricepsPress") }>{ <ShowImage fileName = "STP" muscle="triceps"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "triceps", "CloseGripBarbellBenchPress") }>{ <ShowImage fileName = "CGBBP" muscle="triceps"/>}</Checkbox>
                </div>
            )
        }
    }

    showLegsDetails(){
        if(this.state.legsDetail){
            return(
                <div>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "legs", "LegPress") }>{ <ShowImage fileName = "LP" muscle="legs"/>}</Checkbox>
                    <Checkbox className = "alignLeft" onChange = { (e) => this.updateMuscleItem(e, "legs", "Squat") }>{ <ShowImage fileName = "SQUAT" muscle="legs"/>}</Checkbox>
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

    checkLength(item){
        return item.length === 0 ? true : false
    }

    showSelectedItems(){
        if(this.checkLength(this.state.selectedItems)){
            return(<div className = "wordColor">No Items Selected</div>)
        }else{
            return this.state.selectedItems;
        }
    }

    submitButton(){
        if(this.checkLength(this.state.selectedItems)){
            return (<Button type="primary" disabled>Submit</Button>)
        }else{
            return (<Button type="primary" onClick = {this.submit}>Submit</Button>)
        }
    }

    updatePickerOnChange(e) {
        let dates = e._d.toString().split(" ");
        const dayOfWeek = dates[0];
        const month = convertMonth(dates[1]);
        const date = dates[2]
        const year = dates[3]
        const datePicked = year + "-" + month + "-" + date;

        this.setState({date: datePicked})
        this.setState({day : dayOfWeek})
        this.setState({month: month})
        this.setState({year: year})
    }

    datePicker(){
        if(this.checkLength(this.state.workoutDay)){
            return(                    
                <div className = "button-center">
                    <DatePicker disabled onChange={(e) => this.updatePickerOnChange(e)} />
                </div>
            )
        }else{
            return(
                <div className = "button-center">
                    <DatePicker onChange={(e) => this.updatePickerOnChange(e)} />
                </div>
            )   
        }
    }

    displayWorkOutDay(){
        if(this.checkLength(this.state.workoutDay)){
            return(
                <div className = "wordColor">No Workout day Selected</div>
            )
        }else{
            return(
                <div>{ this.state.workoutDay + " Day"}</div>
            )
        }
    }

    displayDate(){
        if(this.checkLength(this.state.date)){
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
        if(this.checkLength(this.state.date)){
            return(
                <div>
                    <Checkbox className = "alignLeft" disabled><b>Chest</b></Checkbox>
                    <Checkbox className = "alignLeft" disabled><b>Back</b></Checkbox>
                    <Checkbox className = "alignLeft" disabled><b>shoulder</b></Checkbox>
                    <Checkbox className = "alignLeft" disabled><b>biceps</b></Checkbox>
                    <Checkbox className = "alignLeft" disabled><b>triceps</b></Checkbox>
                    <Checkbox className = "alignLeft"disabled><b>Legs</b></Checkbox>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.muscleOnChange(e, "chest")}><b>Chest</b></Checkbox>
                        {this.showChestDetails()}
                    </div>
                    <div>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.muscleOnChange(e, "back")}><b>Back</b></Checkbox>
                        {this.showBackDetails()}
                    </div>
                    <div>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.muscleOnChange(e, "shoulder")}><b>shoulder</b></Checkbox>
                        {this.showShoulderDetails()}
                    </div>
                    <div>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.muscleOnChange(e, "biceps")}><b>biceps</b></Checkbox>
                        {this.showBicepsDetails()}
                    </div>
                    <div>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.muscleOnChange(e, "triceps")}><b>triceps</b></Checkbox>
                        {this.showTricepsDetails()}
                    </div>
                    <div>
                        <Checkbox className = "alignLeft" onChange = { (e) => this.muscleOnChange(e, "legs")}><b>Legs</b></Checkbox>
                        {this.showLegsDetails()}
                    </div>
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
                    <Button>Select Workout Day</Button>
                </Dropdown>
            </div>
        )
    }

    submit(){
        let muscleUsed = this.getMuscleUsed();
        axios.post('/updateWorkout',
            querystring.stringify({
                        date : this.state.date,
                        day : this.state.day,
                        month : this.state.month,
                        year : this.state.year,
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
                        Deadlift : this.state.muscleGroup.back.Deadlift,
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
                        <Col span={5} offset = {6}>
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