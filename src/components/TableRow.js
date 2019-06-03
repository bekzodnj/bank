import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({table_info}) =>(
		{table_info.map(item => {
		return(
				<tr key={item.projectId}>
					<th scope="row">{item.projectId}</th>
					<td>{item.projectName}</td>
					<td>{item.startingTime}</td>
					<td>{item.deadline}</td>
				</tr>
			);
		})}
);

export default TableRow;