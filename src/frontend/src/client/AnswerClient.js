import fetch from 'unfetch';
import {checkStatus} from "./client";


export const getAllAnswers = () =>
    fetch("api/v1/answers")
        .then(checkStatus);

export const addNewAnswer = (answer, questionId) =>
    fetch( `api/v1/answers/${questionId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(answer)
    }).then(checkStatus);

export const deleteAnswer = answerId =>
    fetch( `api/v1/answers/${answerId}` , {
        method: 'DELETE',

    }).then(checkStatus);

export const updateAnswer = (answer,answerId) =>
    fetch( `api/v1/answers/${answerId}?title=${answer.title}` , {

        method: 'PUT',


    }).then(checkStatus);