import React, { Fragment, useState } from "react";
import API_URL from './config';

//todo is a prop coming from ListTodos in the table
//essentially a parameter to get the description of the todo
const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    //edit description
    const updateDescription = async e => {
        // prevent refreshing, so we run our code below
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`${API_URL}${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            console.log(response)
            window.location = "/todolist";
        } catch (err) {
            console.error(err.message);
        }
    }
    //console.log(todo);
    return <Fragment>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
            Edit
        </button>
        <div
            className="modal"
            id={`id${todo.todo_id}`}
            onClick={() => setDescription(todo.description)}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-warning"
                            data-dismiss="modal"
                            onClick={e => updateDescription(e)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
}

export default EditTodo;