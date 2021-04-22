import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import lightGreen from '@material-ui/core/colors/lightGreen';
import dark from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  divider: {
    margin: `${theme.spacing(3)}px 0`
  },
  card: {
    minWidth: 275,
  },
  liked: {
    color: pink[500]
  },
  shared: {
    color: lightGreen[500]
  },
  num: {
    fontSize: 14,
    marginLeft: 5
  },
  rightIcon: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginRight: theme.spacing()
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardPlayer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(),
    paddingBottom: theme.spacing(),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cardSocmed: {
    minWidth: 275,
  },
  cardProduct: {
    position: 'relative'
  },
  mediaProduct: {
    height: 0,
    paddingTop: '60.25%', // 16:9
  },
  rightAction: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  floatingButtonWrap: {
    position: 'relative',
    paddingTop: 50
  },
  buttonAdd: {
    position: 'absolute',
    right: 20,
    top: -20,
  },
  buttonAddList: {
    display: 'none',
    marginLeft: 10
  },
  title: {
    fontSize: 20,
    height: 30,
  },
  ratting: {
    margin: '10px 0',
    '& button': {
      width: 24,
      height: 24
    }
  },
  status: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    '& > *': {
      margin: 5
    }
  },
  desc: {
    height: 45,
    overflow: 'hidden'
  },
  chipDiscount: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
  chipSold: {
    background: dark[500],
    color: theme.palette.getContrastText(dark[500]),
  },
  contentProfle: {
    flex: '1 0 auto',
    textAlign: 'center'
  },
  mediaProfile: {
    height: 0,
    paddingTop: '36.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatarBig: {
    width: 80,
    height: 80,
    margin: '-56px auto 10px',
    background: theme.palette.secondary.dark
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonProfile: {
    margin: 20
  },
  bottomLink: {
    width: '100%',
  },
  price: {
    paddingBottom: 20
  },
  contentProfile: {
    textAlign: 'center'
  },
  verified: {
    fontSize: 16,
    color: theme.palette.primary.main
  },
  cardList: {
    display: 'flex',
    justifyContent: 'space-between',
    '& $buttonAddList': {
      display: 'inline-block'
    },
    '& $floatingButtonWrap': {
      flex: 1,
    },
    '& $buttonAdd': {
      display: 'none'
    },
    '& $status': {
      right: 'auto',
      left: 0,
    },
    '& $mediaProduct': {
      width: 300,
      paddingTop: '21.25%'
    },
    '& $price': {
      flexDirection: 'column',
      justifyContent: 'center',
      '& button': {
        marginTop: 20
      }
    }
  },
  star: {
    top: 5,
    position: 'relative',
    color: orange[500]
  },
  MyAvatarCard: {
    'width': '80px',
    'height': '80px',
    'margin': '-56px auto 10px',
    'background':'#00796B',
    'box-shadow': '0px 4px 5px -2px rgb(80 80 80 / 20%), 0px 7px 10px 1px rgb(80 80 80 / 14%), 0px 2px 16px 1px rgb(80 80 80 / 12%)'
  },
  MyCoverCard: {
    'top': '-70px',
    'left': '-10%',
    'width': '120%',
    'height': '0',
    'position': 'relative',
    'padding-top': '66.25%',
    'border-radius': '50%'
  },
  MyCurrentEndCard: {
    'flex': '1 0 auto',
    'margin-top': '-70px',
    'text-align': 'center'
  }
});

export default styles;
