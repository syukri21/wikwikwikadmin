import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios';
import { Grid } from '@material-ui/core';

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
	}
});

class ImageInput extends React.Component {
	state = {
		selectedFile : [],
		loaded       : [ 0, 0, 0, 0, 0 ],
		index        : [ 'Background', 'Gambar 1', 'Gambar 2', 'Gambar 3', 'Gambar 4' ]
	};

	handleselectedFile = (i) => (event) => {
		let selectedFile = this.state.selectedFile;
		selectedFile[i] = event.target.files[0];
		this.setState({
			selectedFile : selectedFile,
			loaded       : [ 0, 0, 0, 0, 0 ]
		});
	};

	handleUpload = (i) => {
		let _this = this;
		return (x) => {
			const data = new FormData();
			data.append('file', this.state.selectedFile[i], this.state.selectedFile[i].name);
			axios
				.post('http://127.0.0.1:3333/admin', data, {
					onUploadProgress : (ProgressEvent) => {
						let loaded = _this.state.loaded;
						loaded[i] = ProgressEvent.loaded / ProgressEvent.total * 100;
						_this.setState({
							loaded : loaded
						});
					}
				})
				.then((res) => {
					console.log(res.statusText);
				});
		};
	};

	render() {
		const { classes } = this.props;
		return (
			<Card>
				<CardHeader
					className={classes.header}
					title={
						<Typography variant='subheading' style={{ color: 'white' }}>
							Upload Image
						</Typography>
					}
				/>
				<CardContent>
					{this.state.index.map((item, i) => {
						return (
							<Grid container spacing={40} key={i}>
								<Grid item xs={3}>
									<Typography variant='headline'>Upload {item}</Typography>
								</Grid>
								<Grid item xs={9}>
									<div className='App'>
										<input
											type='file'
											name=''
											id=''
											onChange={this.handleselectedFile(i)}
										/>
										<button onClick={this.handleUpload(i)}>Upload</button>
										<div> {Math.round(this.state.loaded[i], 2)} %</div>
									</div>
								</Grid>
							</Grid>
						);
					})}
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(ImageInput);
