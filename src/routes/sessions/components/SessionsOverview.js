import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import moment from 'moment'
import '../css/SessionsOverview.css'
//import List from './NewsItemList';

class SessionsOverview extends Component {

    componentDidMount() {
        const {sessionsItems, getSessions} = this.props;

        if (!sessionsItems) {
            getSessions();
        }
    }



    renderSession=(eachsession)=>{

        console.log("eacchsesion", eachsession)
        return(
            <Card key={eachsession.id} className="each-session">
             <CardContent >
                 <Typography>
                     Name:{eachsession.child.name}
                     
                     </Typography>
                     <Typography>
                     <img className="child-image" src={eachsession.child.avatar}/>
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
                 </CardContent>
            </Card>

        )
    }

    render() {

        
        const {sessionItems} = this.props;
        console.log(sessionItems)
        return (
            <div>
                <h1 className="sessions-overview">Sessions Overview</h1>
                <TextField
                 id="date"
                 label="Choose a date"
                 type="date"
                 defaultValue= "2018-06-02"/>

                <Paper className="outer-paper">
                {sessionItems?sessionItems.map(eachsession=>this.renderSession(eachsession)): "Loading..."}

                <br/>
                <Button
              variant="raised"
              color="secondary"
              type="submit"
              
              className="previous-day">
              Previous Day
            </Button>

            <Button
              variant="raised"
              color="secondary"
              type="submit"
              
              className="next-day">
              Next Day
            </Button>

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