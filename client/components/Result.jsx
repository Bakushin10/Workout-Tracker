import React from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import Spinner from './utility/Spinner';
import Header from './utility/header';
import { MUSCLEPARTS } from './utility/CommonJS';
import ResultDetail from './ResultDetail';
import { Button } from 'antd/lib/radio';

export default class Result extends React.Component {

    constructor(){
        super();
        this.state = {
            workOutData : [], //store all 
            OneMonthWorkoutData : [],
            worktoutDay : "",
            workOutDetails : [],
            showDetail : false
        }

        this.changeComponent = this.changeComponent.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get('/getWorkout').then(function(response) {
            self.setState({workOutData : response.data})
        })
    }

    changeComponent(date){
        const OneMonthWorkoutData = this.state.workOutData.filter(
            (item) => item.year === date.year && item.month === date.month
        )
        this.setState({OneMonthWorkoutData : OneMonthWorkoutData})
        this.setState({showDetail : true});
    }

    getEachWorkoutInAMonth(){
        if(this.state.showDetail){
           return <ResultDetail data = { this.state.OneMonthWorkoutData }/>
        }
    }

    goBack(){
        this.setState({showDetail : false})
    }

    showDetailsOfEachWorkout(){
        if(this.state.showDetail){
            const eachWorkout = this.getEachWorkoutInAMonth()
            return(
                <div>
                    <Button onClick={() => this.goBack()}>
                        go back
                    </Button>
                    { eachWorkout }
                </div>
            )
        }
    }

    showEachMonth(){
        if(this.state.showDetail){
            return(<span></span>)
        }
        else if(this.state.workOutData.length === 0){
            return <Spinner/>
        }else{
            let dateArr = this.state.workOutData.map( item => {
                const date = {
                    year : item.year,
                    month : item.month
                }
                const monthAndYear = item.month + "-" + item.year;
                return(
                    <Card
                        onClick={() => this.changeComponent(date)}
                        value = { monthAndYear }
                        style={{ width: 150, height: 70 }}
                    >
                        { monthAndYear }
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
                            {this.showEachMonth()}
                            {this.showDetailsOfEachWorkout()}
                        </Col>
                        <Col span = {2} className = "vl"></Col>
                        <Col span={8}>
                            { this.ShowWorkOutDay() }
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}