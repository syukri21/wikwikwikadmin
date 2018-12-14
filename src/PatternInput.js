import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	header     : {
		backgroundColor : theme.palette.primary.light
	},
	textField  : {
		marginLeft  : theme.spacing.unit,
		marginRight : theme.spacing.unit
	},
	actionArea : {
		display        : 'flex',
		justifyContent : 'flex-end',
		alignItems     : 'center',
		padding        : 20
	},
	card       : {
		marginBottom : 20
	}
});

const hitungan = [ 'Pertama', 'Kedua', 'Ketiga', 'Keempat', 'Kelima' ];

class PatternInput extends React.Component {
	state = {
		pattern : [ '1111222', '112344', '2344411', '3444232', '2341123' ]
	};

	handleChangePattern = (i) => (event) => {
		let pattern = this.state.pattern;
		pattern[i] = event.target.value;
		return this.setState({
			pattern : pattern
		});
	};

	renderGrid = (classes) =>
		this.state.pattern.map((pat, key) => {
			return (
				<Grid container key={key} style={{ padding: '0 20px' }}>
					<Grid
						item
						xs={2}
						style={{
							display    : 'flex',
							alignItems : 'center'
						}}
					>
						<Typography>Pattern {hitungan[key]}</Typography>
					</Grid>
					<Grid item xs={10}>
						<TextField
							id='outlined-name'
							label='Pattern'
							className={classes.textField}
							value={pat}
							onChange={this.handleChangePattern(key)}
							margin='normal'
							fullWidth
						/>
					</Grid>
				</Grid>
			);
		});

	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.card}>
				<CardHeader
					title={
						<Typography variant='subheading' style={{ color: 'white' }}>
							Patterns
						</Typography>
					}
					className={classes.header}
				/>
				<CardContent>{this.renderGrid(classes)}</CardContent>
				<CardActions className={classes.actionArea}>
					<Button size='large' color='primary' variant='contained'>
						Submit
					</Button>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(PatternInput);
