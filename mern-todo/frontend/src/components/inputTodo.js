import React, { Fragment, useState } from "react";
import API_URL from './config';

const InputTodo = () => {

    //description is the state
    //setDescription is the only way to change the state
    //useState("") is the default state
    const [description, setDescription] = useState("")
    //onChange event "e", set the state to be the input text using currentTarget

    //submit our form to send data out
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description }
            const response = await fetch(`${API_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            //once the response has been set it will refresh and show changes
            window.location = "/todolist";
        } catch (err) {
            console.error(err.message);
        }
    }
    return <Fragment>
        <h1 className="text-center mt-5">M.E.R.N. Todo List</h1>
        <h5 className="text-center">By: Cade Heinberg</h5>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" value={description} onChange={
                e => setDescription(e.currentTarget.value)
            } />
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>;
};

export default InputTodo;
