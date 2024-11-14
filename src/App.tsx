import React from 'react';
import './App.css';
import Button from './components/Button/Button';

function App() {
	const handleClick = () => console.log('teste')
	return (
		<div className='main-container'>
			<Button onClickHandle={handleClick}>
				<i className="fa-solid fa-plus"></i>
			</Button>
		</div>
	);
}

export default App;
