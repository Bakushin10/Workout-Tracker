import React from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import Spinner from './utility/Spinner';
import Header from './utility/header';
import { MUSCLEPARTS } from './utility/CommonJS';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            dates : [], //store all dates
            workOutDetails : []
        }
        
        this.ShowEachDate = this.ShowEachDate.bind(this);
        this.CardOnClick = this.CardOnClick.bind(this);
        this.ShowWorkoutDetails = this.ShowWorkoutDetails.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get('/getWorkout-date').then(function(response) {
            self.setState({dates : response.data})
        })
    }

    CardOnClick(date){
        let self = this;

        axios.get('/getWorkout-detail', {
            params:{
                date : date 
              }
        }).then(function(response) {

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
            self.setState({workOutDetails : detailToShow})
        })
    }

    ShowWorkoutDetails(){
        //console.log(this.state.workOutDetails)
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

        if(workoutDetailArr.length === 0){
            return(
                <div> Click on an item for detail!</div>
            )
        }

        return workoutDetailArr;
    }

    ShowEachDate(){
        if(this.state.dates.length === 0){
            return <Spinner/>
        }else{
            let dateArr = this.state.dates.map( item => {
                return(
                    <Card
                        onClick={() => this.CardOnClick(item.date)}
                        value = {item.date}
                        style={{ width: 150, height: 70 }}
                    >
                        {item.date}
                    </Card>
                )
            })
            return dateArr
        }
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
                            {this.ShowWorkoutDetails()}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}