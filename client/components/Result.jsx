import React from 'react';
import axios from 'axios';
import { Card } from 'antd';
import Spinner from './utility/Spinner';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            dates : []
        }

        this.ShowEachDate = this.ShowEachDate.bind(this);
        this.CardOnClick = this.CardOnClick.bind(this);
    }

    componentDidMount() {
        let self = this;

        axios.get('/getWorkout-date').then(function(response) {
            self.setState({dates : response.data})
        })
    }

    CardOnClick(e){
        console.log(e)
    }

    ShowEachDate(){
        if(this.state.dates === []){
            return <Spinner/>
        }else{
            var dateArr = this.state.dates.map( item => {
                //console.log(item)
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