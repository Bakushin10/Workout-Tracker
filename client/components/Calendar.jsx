// import React...
import React from 'react';
import ReactDOM from 'react-dom';
import { convertMonth } from './utility/dictionary';
import { Row, Col } from 'antd';
import axios from 'axios';
import Header from './utility/header';

// ... and fullcalendar-reactwrapper.
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import Axios from 'axios';

///TODO
/*
 *  create server side request for event state
 */

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Date : new Date(),
        defaultDate : "2018-10-20",
        events:[
                {
                    title: 'All Day Event',
                    start: '2018-11-01'
                },
                {
                    title: 'Long Event',
                    start: '2017-05-07',
                    end: '2017-05-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2017-05-11',
                    end: '2017-05-13'
                },
                {
                    title: 'Meeting',
                    start: '2017-05-12T10:30:00',
                    end: '2017-05-12T12:30:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2017-05-13T07:00:00'
                }
        ],		
    }
  }
 
  componentDidMount(){
    const dates = this.state.Date.toString().split(" ");
    const month = convertMonth(dates[1]);
    const date = dates[2]
    const year = dates[3]
    const datePicked = year + "-" + month + "-" + date;
    let self = this;
    this.setState({defaultDate : datePicked})

    axios.get('getWorkoutForCalender').then(function(response){
        console.log(response.data)
        self.setState({events : response.data})
    })
  }
  
  render() {
    const options = {
        header: { 
            left: 'month,basicWeek,basicDay,listMonth',
            center: 'title', 
            right: 'prev next customPrevButton,customNextButton today' 
        },
        next:{
            customPrevButton:{ 
                text: 'prev', 
                click: function () { console.log('prev') } 
            } 
        }, 
            customButtons: { 
                customPrevButton:{ 
                    text: 'prev', 
                    click: function () { console.log('prev') } 
                }, 
                customNextButton: { 
                    text: 'next!', 
                    click: function () { console.log('next') } 
                  } 
        },
        // header: {
        //     left: '',
        //     center: 'title',
        //     right: 'today prev,next'
        // },
        defaultView: 'month',
        // navLinks = true,
        // editable = true,
        // eventLimit = true,
        defaultDate : this.state.defaultDate,
        events: this.state.events
    }

    
    return (
      <div id="example-component">
        <Header/>
        <br/>
        <Row gutter={8}>
            <Col span={12} offset={6}>
                <FullCalendar
                    {...options}
                    // ref={calendar => {
                    //     this.fullCalendar = calendar
                    //     if(this.fullCalendar !== null){
                    //         let moment = this.fullCalendar.instance.fullCalendar('viewRender');
                    //         console.log(moment)
                    //     }//viewRender: (view, element)=> { console.log(view,element) }
                    // }}
                />
            </Col>
        </Row>
      </div>
    );
  }
}

// id = "your-custom-ID"
// header = {{
//     left: 'prev,next today myCustomButton',
//     center: 'title',
//     right: 'month,basicWeek,basicDay'
// }}
// defaultDate={this.state.defaultDate}
// navLinks= {true} // can click day/week names to navigate views
// editable= {true}
// eventLimit= {true} // allow "more" link when too many events
// events = {this.state.events}


// header: { 
//     left: 'month,basicWeek,basicDay,listMonth',
//     center: 'title', 
//     right: 'customPrevButton,customNextButton today' }, 
//     customButtons: { 
//         customPrevButton:{ 
//             text: 'prev', 
//             click: function () { console.log('prev') } 
//         }, 
//         customNextButton: { 
//             text: 'next!', 
//             click: function () { console.log('next') } 
//           } 
//   }