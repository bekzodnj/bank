import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AddNewProject extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
			startDate: new Date().getTime(),
			deadline: new Date().getTime(),
			isUpdated: false,
			displayInfo: "",
			timeInfo: "",
		};

    // This binding is necessary to make `this` work in the callback
    //this.handleClick = this.handleClick.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

	handleType(event){
		this.setState({
			inputValue: event.target.value
		});
	}

	handleStartDate(event){
		this.setState({
			startDate: (new Date(event.target.value).getTime()),
		});
	}

	handleDeadline(event){
		this.setState({
			deadline: (new Date(event.target.value).getTime()),
		});
	}

	async handleSubmit(){
		
		const {startDate, deadline, inputValue} = this.state;
		const timeDiff = deadline - startDate;
		//Check for valid text
		if(inputValue.length ===0){
				this.setState({
					displayInfo: "Please enter valid text",
				});
		}else{
			this.setState({
					displayInfo: "",
				});
		}
		//check for valid date
		if(timeDiff<=0){
			this.setState({
				timeInfo: "Please enter valid date"
			});
		}else{
			this.setState({
				timeInfo: ""
			});
		}

		if(inputValue.length !==0 && timeDiff>0){
			// if everything okay
			const newProject = {
				deadline: this.state.deadline,
				projectName: this.state.inputValue,
				startingTime: this.state.startDate
			}
			const {data} = await axios.post(`http://192.168.14.185:8080/project/new`, newProject);
			
			this.setState({
				isUpdated: true,
				displayInfo: "",
				timeInfo: ""
			});
			//console.log("Success");
		}
		
		
	}

	render(){
		return( 
				<header className="App-header">
					<h1 >Xalq Banki Projects</h1>
					<div className="container">
						<div className="d-flex justify-content-center">
							<Link to={{pathname: `/`
							}}>
								<button className="btn btn-outline-info mr-2">&larr; Current Projects</button>
							</Link>
							
							<Link to={{pathname: `/addNewProject/`
							}}>
							<button className="btn btn-info">Add New Project + </button>
							</Link>
						</div>
						<div className={this.state.displayInfo !== "" ? "alert alert-warning" : ""}>
							{this.state.displayInfo !== "" ? this.state.displayInfo : ""}
						</div>
						<div className={this.state.timeInfo !== "" ? "alert alert-warning" : ""}>
							{this.state.timeInfo !== "" ? this.state.timeInfo : ""}
						</div>
						
						<Link to={{pathname: `/`
							}}>
							<div className={this.state.isUpdated ? "alert alert-info" : ""}>
							{this.state.isUpdated ? "New Project is saved" : ""}
						</div>
						</Link>

						
				
						<div className="form-group">
							<label htmlFor="projectName">Project Name:</label>
							<input type="text" 
							onChange={this.handleType}
							className="form-control"
							placeholder="Enter name for a project"
							/>

						</div>
						<div className="form-group w-50">
							<label htmlFor="startDate">Start Date</label>
							<input type="date"
							className="form-control"
							onChange={this.handleStartDate}
							/>
							
						</div>

						<div className="form-group w-50">
							<label htmlFor="deadline">Deadline</label>
							<input type="date" 
							className="form-control"
							onChange={this.handleDeadline}
							/>
						</div>
						<button className="btn btn-outline-primary "
						onClick={this.handleSubmit}>
						{this.state.isUpdated === true ? "Successfully Saved" : "Save"}
						</button>
					</div>
				</header>
			);
	}
}

export default AddNewProject;