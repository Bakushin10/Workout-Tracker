import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            dates : []
        }

        this.ShowEachDate = this.ShowEachDate.bind(this);
    }

    componentDidMount() {
        let self = this;

        axios.get('/getWorkout-date').then(function(response) {
            self.setState({dates : response.data})
        })
    }

    ShowEachDate(){
        if(this.state.dates === []){
            /*
                add spinner here
            */
            console.log("spinner")
        }else{
            let datesArr = []
            for(var i = 0; i < this.state.dates.length; i++){
                console.log(this.state.dates[i])
                datesArr.push(<div>{this.state.dates[i].date}</div>)
            }
            return datesArr
        }
    }

    render() {
        console.log(this.state.dates)
        return (
            <div>
                <div>Result Page</div>
                <div>
                    {this.ShowEachDate()}
                </div>
            </div>
        )
    }
}