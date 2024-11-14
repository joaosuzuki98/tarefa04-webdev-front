import React from 'react';
import './App.css';
import Button from './components/Button/Button';
import Table from './components/Table/Table';
import Input from './components/Input/Input';
import NotificationsIcon from './components/NotificationsIcon/NotificationsIcon'

function App() {
	const handleClick = () => console.log('teste')
	return (
		<div className='main-container'>
			<NotificationsIcon/>
			<Button onClickHandle={handleClick}>
				<i className="fa-solid fa-plus"></i>
			</Button>
			<Input/>
			<Table/>
		</div>
	);
}

export default App;
