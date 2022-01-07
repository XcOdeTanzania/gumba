import fetch from 'unfetch';
import {checkStatus} from "./client";


export const getAllSurveys = () =>
    fetch("api/v1/surveys")
        .then(checkStatus);

export const addNewSurvey = survey =>
    fetch("api/v1/surveys", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(survey)
    }).then(checkStatus);

export const addNewSurveyResponse = (surveyResponse, surveyId) =>
    fetch(`api/v1/responses/1/${surveyId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(surveyResponse)
    }).then(checkStatus);

export const addNewSurveyResponseForm = (surveyResponse, surveyId) =>
    fetch(`api/v1/forms/${surveyId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify( {"formAttributes":{"data":surveyResponse}})
    }).then(checkStatus);

export const deleteSurvey = surveyId =>
    fetch( `api/v1/surveys/${surveyId}` , {
        method: 'DELETE',

    }).then(checkStatus);

export const getSurvey = surveyId =>
    fetch(`api/v1/surveys/${surveyId}`)
        .then(checkStatus)