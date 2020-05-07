import React from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 350;
const useStyles = makeStyles(theme => ({

	root: {
		display: 'flex'
	},

	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	
	drawerPaper: {
		width: drawerWidth,
		background: '#414B61'
	},

	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			background: '#fff',
			color: theme.palette.text.primary
		}
	},

	toolbar: theme.mixins.toolbar,

	title: {
		color: theme.palette.primary.contrastText,
		lineHeight: '64px',
		padding: '0 24px'
	}

}));

function App() {
	const classes = useStyles();

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<Typography variant="h6" className={classes.title}>
					Bilfinger Wartungscenter
				</Typography>
			</div>
			<Divider />
		</div>
	);

  return (
    <div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" noWrap>
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}>
				<Hidden smUp implementation="css">
					<Drawer variant="temporary">
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{ paper: classes.drawerPaper }}
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
    </div>
  );
}

export default App;
