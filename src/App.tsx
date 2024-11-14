import React from 'react';
import './App.css';
import Button from './components/Button/Button';
import Table from './components/Table/Table';
import Input from './components/Input/Input';

function App() {
	const handleClick = () => console.log('teste')
	return (
		<div className='main-container'>
			<Button onClickHandle={handleClick}>
				<i className="fa-solid fa-plus"></i>
			</Button>
			<Input/>
			<Table/>
		</div>
	);
}

export default App;
