import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import PatternInput from './PatternInput';
import ImageInput from './ImageInput';

const styles = (theme) => {
	console.log(theme);
	return {
		header : {
			backgroundColor : theme.palette.primary.dark
		}
	};
};

class Index extends React.Component {
	render() {
		console.log(this.props);
		const { classes } = this.props;
		return (
			<Card>
				<CardHeader
					title={
						<Typography variant='headline' style={{ color: 'white' }}>
							Admin Panel wikwikwikapp
						</Typography>
					}
					className={classes.header}
				/>
				<CardContent>
					<PatternInput />
					<ImageInput />
				</CardContent>
			</Card>
		);
	}
}

const IndexWithStyles = withStyles(styles)(Index);

ReactDOM.render(<IndexWithStyles />, document.getElementById('root'));
