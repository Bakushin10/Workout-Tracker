// import React...
import React from 'react';
import ReactDOM from 'react-dom';
import { convertMonth } from './utility/dictionary';
 
// ... and fullcalendar-reactwrapper.
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
 
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Date : new Date(),
        defaultDate : "2018-10-20",
        events:[
                {
                    title: 'All Day Event',
                    start: '2017-05-01'
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
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2017-05-28'
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
    console.log(datePicked)
    this.setState({defaultDate : datePicked})
  }

  render() {
    return (
      <div id="example-component">
        <FullCalendar
            id = "your-custom-ID"
            header = {{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            }}
            defaultDate={this.state.defaultDate}
            navLinks= {true} // can click day/week names to navigate views
            editable= {true}
            eventLimit= {true} // allow "more" link when too many events
            events = {this.state.events}	
        />
      </div>
    );
  }
}