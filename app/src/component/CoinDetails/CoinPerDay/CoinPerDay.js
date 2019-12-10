import React from 'react';
import { Grid } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import './CoinPerDay.css';
export default function CoinPerDay(props) {
	const children = [
		<ToggleButton key={1} value="1">
			<p>1 Day</p>
		</ToggleButton>,
		<ToggleButton key={2} value="6">
			<p>1 Week</p>
		</ToggleButton>,
		<ToggleButton key={3} value="30">
			<p>1 Months</p>
		</ToggleButton>,
		<ToggleButton key={4} value="200">
			<p>6 Months</p>
		</ToggleButton>,
		<ToggleButton key={5} value="360">
			<p>1 Year</p>
		</ToggleButton>,
		<ToggleButton key={6} value="max">
			<p>Max</p>
		</ToggleButton>
	];
	return (
		<Grid container spacing={2} direction="column" alignItems="center">
			<Grid item>
				<ToggleButtonGroup
					size="medium"
					value={props.alignment}
					exclusive
					onChange={props.handleChange}
				>
					{children}
				</ToggleButtonGroup>
			</Grid>
		</Grid>
	);
}
