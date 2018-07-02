import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import ErrorComponent from './ErrorComponent'
import NoResultsComponent from './NoResultsComponent'
import TextField from 'material-ui/TextField'
import moment from 'moment'
import '../css/SessionsOverview.css'

class SessionsOverview extends Component {

    constructor(){
        super()
        this.state={selecteddate:"2018-06-02",
      selectedgroup:"All"}
        
    }

    componentDidMount() {
        const {sessionsItems, getSessions} = this.props;

        if (!sessionsItems) {
            
            getSessions(this.state.selecteddate);
        }

    }

   handleChange=(event)=>{
       
       this.setState({selecteddate:event.target.value})
       this.props.getSessions(event.target.value);
      
   }

   handlePresentStatus=(event,id)=>{
     console.log("idsf",id)

     let selectedindex=0
     let selectedsession=this.props.sessionItems.map((eachsession,index)=>{
         if(eachsession.id===id){
             selectedindex=index;}
            
     })
      console.log("fdf",event.currentTarget.value)
     this.props.updatePresence(selectedindex,event.currentTarget.value)
   }

   getPrevDay=()=>{

        let dateTime = new Date(this.state.selecteddate);
        dateTime = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        this.setState({selecteddate:dateTime})
        this.props.getSessions(dateTime);
        
   }

   getNextDay=()=>{

      let dateTime = new Date(this.state.selecteddate);
      dateTime = moment(dateTime).add(+1, 'days').format("YYYY-MM-DD");
      this.setState({selecteddate:dateTime})
      this.props.getSessions(dateTime);
   }
   
   handleGroupChange=(event)=>{
      this.setState({selectedgroup:event.target.value})
   }

    renderSession=(eachsession)=>{

        return(
            <Card key={eachsession.id} className="each-session">
             <CardContent className="session-content">
                 <Typography>
                     Name:{eachsession.child.name}
                     
                     </Typography>
                     <Typography>
                     <img className="child-image" alt="image not available" src={eachsession.child.avatar}/>
                     </Typography>
                 <Typography>
                    Start TIme: {eachsession.start_time}
                     </Typography>
                     <Typography>
                    End TIme: {eachsession.end_time}
                     </Typography>
                     <Typography>
                    Group Name: {eachsession.group.name}
                     </Typography>
                     <Typography>
                    Present Status: {eachsession.presence}
                     </Typography>
                     <Button
                     variant="raised"
                    color="secondary"
                    type="submit"
                    value={eachsession.presence}
                    onClick={(event)=>this.handlePresentStatus(event,eachsession.id)}
                    className="present-status">
              Update Present Status
            </Button>

                 </CardContent>
            </Card>

        )
    }

    render() {

        
        const {sessionItems} = this.props;
        console.log("se",sessionItems)

        let {filteredSessions}=this.props
        if((this.state.selectedgroup!=="All")&&(sessionItems))
            filteredSessions=sessionItems.filter(eachsession=>{return(eachsession.group.name===this.state.selectedgroup)})
        
        else if((this.state.selectedgroup==="All")&&(sessionItems))
         filteredSessions=sessionItems  

        
         
        {/*if((filteredSessions)&&(filteredSessions.length==0))
        {  
            alert('No sessions on this day')
        }*/}
        
        return (
            <div>
                <h1 className="sessions-overview">Sessions Overview</h1>
    
                <Button
                  variant="raised"
                  color="secondary"
                  type="submit"
                  onClick={this.getPrevDay}
                  className="previous-day">
                  Previous Day
                </Button>
    
                <TextField
                  id="date"
                  label="Choose a date"
                  type="date"
                  value={this.state.selecteddate}
                  onChange={this.handleChange}/>
    
                <Button
                  variant="raised"
                  color="secondary"
                  type="submit"
                  onClick={this.getNextDay}
                  className="next-day">
                  Next Day
                </Button>

                 <p className="filter-group">Select group:</p>
                 <select required
                          className="filter-group"  name="type" id="type"
                          onChange={ this.handleGroupChange }>
                          <option value="All">All</option>
                          <option value="Group 1">Group 1</option>
                          <option value="Group 2">Group 2</option>
                          <option value="Group 3">Group 3</option>
                          <option value="Group 4">Group 4</option>
                         
                </select>

                <Paper className="outer-paper">

                 {(filteredSessions)?((filteredSessions.length!==0)?filteredSessions.map(eachsession=>this.renderSession(eachsession)):<NoResultsComponent/>): <ErrorComponent/>}
                
                <br/>
            

                </Paper>

            </div>
        )
    }
}

SessionsOverview.propTypes = {
    sessionsItems: PropTypes.array,
    getSessions: PropTypes.func.isRequired
};

export default SessionsOverview;