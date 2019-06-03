import React, {Component} from 'react';
import './Button.css';

const Button = ({name}) =>{
	return(
		<button className="btn btn-outline-primary">{name}</button>
	);
}

export default Button;
