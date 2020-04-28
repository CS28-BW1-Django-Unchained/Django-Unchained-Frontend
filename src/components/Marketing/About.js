import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SportsEsports from '@material-ui/icons/SportsEsports';
import VideogameAsset from '@material-ui/icons/VideogameAsset'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Re:CURSE '}
      <Link color="inherit" href="https://material-ui.com/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    bar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardGriddle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 80
    },
    ocard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: 400
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    }
}));

const team = [
    {
        name: "Bryan Adams",
        link: "https://github.com/BryanKAdams",
        pic: "https://avatars1.githubusercontent.com/u/9333505?s=460&u=2b7d0c1822a26805eb510c638f9ce238bbbc8d12&v=4"
    }, 
    {
        name: "Lexie Jiang",
        link: "https://github.com/jiangeyre",
        pic: "https://ca.slack-edge.com/ESZCHB482-W0138D5M8U8-de5298dc0f0e-512"
    }, 
    {
        name: "David Tauraso",
        link: "https://github.com/dtauraso",
        pic: "https://avatars3.githubusercontent.com/u/1681509?s=460&u=2dd3c4c9b5cb237141aac626b14004b1e8f35bb9&v=4"
    }, 
    {
        name: "Jacob Washburn",
        link: "https://github.com/JacobWashburn",
        pic: "https://avatars3.githubusercontent.com/u/46264401?s=460&u=ca9c1e3c2acffc2d66eb93764081faa18a1f4312&v=4"
    }
];

export default function About() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.bar} position="relative">
        <Toolbar>
          <SportsEsports className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            About the Game and the Pixel Boys behind It
          </Typography>
          <VideogameAsset className={classes.icon} />
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Meet the Team!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Welcome to the game... the GAME OF LIFE!!!
            </Typography>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
            <div className={classes.cardGriddle}>
                <Card className={classes.ocard}>
                    <CardMedia
                    className={classes.cardMedia}
                    image="https://avatars3.githubusercontent.com/u/36084491?s=460&u=0958ff62b09de4054688659b761ef00c692bc5f4&v=4"
                    title="Zachary Arney Github Pic"
                    />
                    <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Overlord Zachary Arney
                    </Typography>
                    <Typography>
                        Zach is our fearless leader. He is the game manager for CS Build Week 1.
                    </Typography>
                    </CardContent>
                </Card>
            </div>
            <Grid container spacing={10}>
                {team.map((card) => (
                <Grid item key={card} xs={18} sm={9} md={6}>
                    <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.pic}
                        title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        Minion {card.name}
                        </Typography>
                        <Typography>
                            <a href={card.link}>Check out more work from {card.name}!</a>
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Re:CURSE
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Why did you scroll all the way to the bottom? Hoping to find some loot?
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}