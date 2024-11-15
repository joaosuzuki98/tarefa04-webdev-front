import React from 'react';
import './App.css';
import Button from './components/Button/Button';
import Table from './components/Table/Table';
import Input from './components/Input/Input';
import NotificationsIcon from './components/NotificationsIcon/NotificationsIcon'
import Icon from './components/Icon/Icon';

function App() {
	const handleClick = () => console.log('teste')
	return (
		<div className='main-container'>
			<header className='w-full flex justify-between mb-10'>
				<Icon/>
				<NotificationsIcon/>
			</header>

			<main className='flex flex-col justify-between h-[80vh]'>
				<div>
					<div className='w-full flex justify-center'>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-plus"></i>
						</Button>
					</div>

					<div className='my-5'>
						<Input/>
					</div>

					<div className='flex justify-evenly'>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-magnifying-glass"></i>
						</Button>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-pencil"></i>
						</Button>
						<Button onClickHandle={handleClick}>
							<i className="fa-solid fa-trash-can"></i>
						</Button>
					</div>
				</div>
				<Table/>
			</main>
		</div>
	);
}

export default App;
