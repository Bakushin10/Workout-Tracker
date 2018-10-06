import React from 'react';

export const MUSCLEPARTS = ['chest', 'back', 'shoulder', 'biceps', 'triceps', 'legs']

export const getWorkoutDetail = (workOutDetails) =>{
    const workoutDetailArr = workOutDetails.map( item =>{
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


export const MUSCLE = {
    CHEST: 'chest',
    BACK: 'back',
    BICEP: 'biceps',
    TRICEP: 'tricpes',
    SHOULDER: 'shoulder',
    LEGS: 'legs'
  };