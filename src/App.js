import React, { useContext, useState } from 'react';
import { GridDataContext, GridDataContextProvider } from './components/context/GridDataContext';
import Grid from './components/Grid'
import Cell from './components/Cell';
import './App.css';

const App = () => {

	const grid = useContext(GridDataContext);
	return (
	<div className="App">
		<div className='banner'>Path-Trek - A⭐ Pathfinding</div>
		<GridDataContextProvider>
			<Grid></Grid>
		</GridDataContextProvider>
		<div className='copyRight'>
			<span>@AumBhatt @KaushikDeka @AdeebWaiz [2022-23]</span>
		</div>
	</div>
	);
}

export default App;
