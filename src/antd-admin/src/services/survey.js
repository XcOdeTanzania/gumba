import  request from '../utils/request';

export default function  fetch({page=1}){
  return request(`/api/v1/surveys`);
}
