import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import Divider from '@material-ui/core/Divider';
import styles from './cardStyle-jss';

class ProfileInfoCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      classes,
      nombre,
      isVerified,
    } = this.props;

    return (
      <Card className={classes.cardSocmed}>
        {/*<CardContent>*/}
          <Typography  className={classes.name} gutterBottom>
            {nombre}
          </Typography>
          
        
        <Divider />
        <Typography  className={classes.name} gutterBottom>
            {nombre}
        </Typography>
        {/*</CardContent>*/}
      </Card>
    );
  }
}

ProfileInfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  nombre: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};

ProfileInfoCard.defaultProps = {
  isVerified: false
};

export default withStyles(styles)(ProfileInfoCard);
