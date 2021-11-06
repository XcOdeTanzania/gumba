import fetch from 'unfetch';
import {checkStatus} from "./client";


export const getAllUsers = () =>
    fetch("api/v1/users")
        .then(checkStatus);

export const addNewUser = user =>
    fetch("api/v1/users", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    }).then(checkStatus);

export const deleteUser = userId =>
    fetch( `api/v1/users/${userId}` , {
        method: 'DELETE',

    }).then(checkStatus);