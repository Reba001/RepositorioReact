import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import dark from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  cardAnimation: {
    'animation': 'appear 500ms ease-out forwards'
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardMedia: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  lineHeight: {
    'line-height': '0px !important'
  },
});

export default styles;
