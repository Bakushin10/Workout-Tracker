import React from 'react';
import { MUSCLEPARTS, getWorkoutDetail } from './utility/CommonJS';
import { Card, Col, Row } from 'antd';

export default class ResultDetail extends React.Component {

    constructor(){
        super();
        this.state = {
            showDetail : false,

            //states for display the detail workout info
            date: String,
            day: String,
            exercise : []
        }
    }

    showDetailWorkout(){
        const detailToShow = this.getWorkOutDetail()

        const cards = detailToShow.map(data => {
            return(
                <Card 
                    onClick={() => this.changeComponent(data)}
                    style={{ width: 180, height: 70 }}
                >
                    {data.date + " " +data.day}
                </Card>
            )
        })
        return cards
    }

    changeComponent(workoutData){
        const exercise = getWorkoutDetail(workoutData.exercise)
        this.setState({date: workoutData.date})
        this.setState({day: workoutData.day})
        this.setState({exercise : exercise})
        this.setState({showDetail : true});
    }

    getWorkOutDetail(){
        const data = this.props.data[0].muscleGroup
        let detailToShow = []
        
        data.map((workoutDataSet) => {
            //object that holds each exercise data
            let workoutInfo = {
                date : workoutDataSet.date,
                day : workoutDataSet.day,
                exercise:[]
            }
            
            //array that holds which part of body is worked out
            let mustleUsed = workoutDataSet.muscleUsed.map((mustle,index)=>{
                if(mustle === "true"){
                    return MUSCLEPARTS[index]
                }
            })

            //create element of workoutInfo object here
            for(let i in mustleUsed){
                const eachMuscle = mustleUsed[i]
                if(eachMuscle !== undefined){
                    const workoutSet = workoutDataSet[eachMuscle][0]
                    workoutInfo.exercise.push(MUSCLEPARTS[i])//Part of muscle 
                    for(let exercise in workoutSet){
                        if(workoutSet[exercise] && exercise !== "_id")
                            workoutInfo.exercise.push(exercise)//exercise name
                    }
                }
            }
            detailToShow.push(workoutInfo)
        })

        return detailToShow
    }

    displayWorkout(){
        if(this.state.showDetail){
            return(
                <div>
                    <div>{ this.state.date }</div>
                    <div>{ this.state.day }</div>
                    <div>{ this.state.exercise }</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
               { this.showDetailWorkout() }
               { this.displayWorkout() }
            </div>
        )
    }
}