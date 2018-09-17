import React from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import Spinner from './utility/Spinner';
import Header from './utility/header';
import { MUSCLEPARTS } from './utility/CommonJS';
import ResultDetail from './ResultDetail';

var Post = (props) => {
    return <div onClick={()=>props.changeComponent('detail')}> POST </div>
}

export default class Result extends React.Component {

    constructor(){
        super();
        this.state = {
            workOutData : [], //store all 
            OneMonthWorkoutData : [],
            worktoutDay : "",
            workOutDetails : [],
            jumpToResultDetail : false
        }
        
        this.ShowEachDate = this.ShowEachDate.bind(this);
        this.CardOnClick = this.CardOnClick.bind(this);
        this.ShowWorkoutDetails = this.ShowWorkoutDetails.bind(this);
        this.ShowWorkOutDay = this.ShowWorkOutDay.bind(this);
        this.changeComponent = this.changeComponent.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get('/getWorkout').then(function(response) {
            self.setState({workOutData : response.data})
            console.log(response.data)
        })
    }

    CardOnClick(date){
        let self = this;

        axios.get('/getWorkout-detail', {
            params:{
                date : date 
              }
        }).then(function(response) {

            console.log(response)
            let detailToShow = []
            response.data[0].muscleUsed.map((mustle, index) => { 
                if(mustle){
                    const musclepart = MUSCLEPARTS[index]
                    const muscle = response.data[0].muscleGroup[0]
                    detailToShow.push(musclepart) //insert Muscle part like chest, back, shoulder...
                   
                    for(let j in muscle[musclepart][0]){
                        if(muscle[musclepart][0][j] === true){
                            detailToShow.push(j) //insert details mustle
                        }
                    }
                }
            })
            self.setState({worktoutDay : response.data[0].workoutDay})
            self.setState({workOutDetails : detailToShow})
        })
    }

    ShowWorkoutDetails(){
        if(this.state.workOutDetails.length === 0){
            return(
                <div> Click on an item for detail!</div>
            )
        }

        let workoutDetailArr = this.state.workOutDetails.map( item =>{
            if(MUSCLEPARTS.includes(item)){
                return(
                    <div><b>{ item }</b></div>
                )
            }else{
                return(
                    <div>{ item }</div>
                )
            }
        })

        return workoutDetailArr;
    }

    changeComponent(monthAndYear){
        const OneMonthWorkoutData = this.state.workOutData.filter((item) => item.monthAndYear === monthAndYear)
        this.setState({OneMonthWorkoutData : OneMonthWorkoutData})
        this.setState({jumpToResultDetail : true});
    }

    renderTab(){
        if(this.state.jumpToResultDetail){
           return <ResultDetail data = { this.state.OneMonthWorkoutData }/>
        }
    }

    ShowEachDate(){
        if(this.state.workOutData.length === 0){
            return <Spinner/>
        }else{
            let dateArr = this.state.workOutData.map( item => {
                return(
                    <Card
                        onClick={() => this.changeComponent(item.monthAndYear)}
                        value = {item.monthAndYear}
                        style={{ width: 150, height: 70 }}
                    >
                        {item.monthAndYear}
                    </Card>
                )
            })
            return dateArr
        }
    }

    ShowWorkOutDay(){
        return(
            <div>
                <b>{ this.state.worktoutDay + " Day"}</b>
                <br/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header/>
                <br/>
                <div>
                    <Row>
                        <Col span={5} offset = {6}>
                            {this.ShowEachDate()}
                        </Col>
                        <Col span = {2} className = "vl"></Col>
                        <Col span={8}>
                            { this.ShowWorkOutDay() }
                            { this.ShowWorkoutDetails() }
                        </Col>
                    </Row>
                </div>
                {this.renderTab()}
            </div>
        )
    }
}