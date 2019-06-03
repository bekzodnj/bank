import React from 'react';
import axios from 'axios';


class SendButton extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    	userToSend: false,
    	infos: [],
    	isSent: "Send",
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

	// async componentDidMount(){
	// 	await axios.get(`http://192.168.14.185:8080/user/all`).then(res=>{
	// 		if(res.data.length){
	// 			this.setState({users: res.data});
	// 		}
	// 	});
	// }

	async handleClick (){
		const {urlParam} = this.props;
		const {addedUser} = this.props;
		
		// console.log("From handler" + addedUser);
		// console.log("Url param" + urlParam);

		await axios.post(`http://192.168.14.185:8080/user/addDevelopersForProject/${urlParam}/${addedUser}`).then(res=>{
			console.log(res);
			axios.get(`http://192.168.14.185:8080/user/byProject/${urlParam}`)
			.then(resp=>{
				const infos = resp.data;
				this.setState({infos});
				console.log(this.state.infos);
				this.setState({isSent: "Saved"});
				// const handler = this.props.handler;
				// this.handler();
			})
		});
		
		//updating UI table from parent
		this.props.handler();
	
	}

  render(){
  	//Checking, if empty do nothing
	if(this.props.addedUser== undefined || this.props.addedUser == null){
		return (
			<button className="btn btn-outline-primary w-25 mt-2">Select</button>
		);
	}

	const {addedUser} = this.props;
	console.log(addedUser);

	return( 
		<button className="btn btn-outline-primary w-25 mt-2" onClick={this.handleClick}>{this.state.isSent}</button>
  	);
  }
}

export default SendButton;