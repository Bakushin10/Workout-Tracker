import React from 'react';

export default class ResultDetail extends React.Component {

    constructor(){
        super();
    }

    render() {
        console.log(this.props.data[0].muscleGroup)
        return (
            <div>
               { this.props.data[0].muscleGroup.length }
                ResultDetail
            </div>
        )
    }
}