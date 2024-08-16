import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([])

    //deleteTodoFunction
    const deleteTodo = async (todo_id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5001/todos/${todo_id}`, {
                method: "DELETE"
            });

            console.log(deleteTodo);
            //filter the todos state by only keeping the todos != to the deleted one
            setTodos(todos.filter(todo => todo.todo_id !== todo_id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5001/todos");
            const jsonData = await response.json();

            console.log(jsonData);
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    //when this react component renders (the list) do the following
    //the [] makes it so it only renders once and not over and over 
    useEffect(() => {
        getTodos();
    }, []);

    return <Fragment>
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.length === 0 ? (
                    <tr>
                        <td colSpan="3">No todos stored, add a new one!</td>
                    </tr>
                ) : (
                    todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </Fragment>;
};

export default ListTodos;