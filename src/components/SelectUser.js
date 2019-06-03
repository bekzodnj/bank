import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import SendButton from './SendButton';


class SelectUser extends React.Component{
	state = {
		selectedOption: [],
		users: [],
		resetOption: "Hello",
	};

	async componentDidMount(){
		await axios.get(`http://192.168.14.185:8080/user/all`).then(res=>{
			if(res.data.length){
				this.setState({users: res.data});
			}
		});
	}
	
	//for passing selected to SendButton
	handleChange = (selectedOption) =>{
		this.setState({selectedOption});
		//console.log('Selected... State' + this.state.selectedOption);
	}

	

  render(){
	 
	if( this.state.users === undefined) {
      		return <div>Loading...</div>
  	}else{
  			//console.log(this.state.infos);
  	}
	 //Getting names arrat of all users
	 const { selectedOption } = this.state;
	 //console.log(selectedOption.label, selectedOption.value);
	
	 const userObjects = this.state.users.map(function(elem){
		return{
			label: elem.fname + " " + elem.lname,
			value: elem.userId,
		}
	 });
	 //console.log(userObjects);

	return( 
		<div>
			<Select
			    //defaultValue={[colourOptions[2], colourOptions[3]]}
			    //isMulti
			    options={userObjects}
			    className="basic-multi-select"
			    classNamePrefix="select"
			    onChange = {this.handleChange}
	  		/>
	  		<SendButton addedUser={this.state.selectedOption.value} urlParam={this.props.urlParam}
	  		handler={this.props.action}/>
  		</div>
  	);
  }
}

export default SelectUser;