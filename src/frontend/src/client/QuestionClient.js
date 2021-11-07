import fetch from 'unfetch';
import {checkStatus} from "./client";


export const getAllQuestions = () =>
    fetch("api/v1/questions")
        .then(checkStatus);

export const addNewQuestion = question =>
    fetch("api/v1/questions", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(question)
    }).then(checkStatus);

export const deleteQuestion = questionId =>
    fetch( `api/v1/questions/${questionId}` , {
        method: 'DELETE',

    }).then(checkStatus);

export const updateQuestion = (question,questionId) =>
    fetch( `api/v1/questions/${questionId}?title=${question.title}&type=${question.type}&isRequired=${question.isRequired}` , {

        method: 'PUT',


    }).then(checkStatus);