import React from 'react';
import './App.css';
import Button from './components/Button/Button';
import Table from './components/Table/Table';

function App() {
	const handleClick = () => console.log('teste')
	return (
		<div className='main-container'>
			<Button onClickHandle={handleClick}>
				<i className="fa-solid fa-plus"></i>
			</Button>
			<Table/>
		</div>
	);
}

export default App;
