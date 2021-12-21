import React, { PureComponent } from 'react'
import { Page } from 'components'
import { Tabs } from 'antd'
import QuestionTab from './components/tabs/question/QuestionTab'
import ResponseTab from './components/tabs/response/Response'
import SettingTab from './components/tabs/setting/Setting'
import PropTypes from "prop-types";
import {connect, history} from "umi";
import {stringify} from "qs";


const { TabPane } = Tabs;

@connect(({ surveyDetail }) => ({ surveyDetail }))
@connect(({ section }) => ({ section }))
@connect(({ question }) => ({ question }))
@connect(({ answer }) => ({ answer }))

class SurveyDetail extends PureComponent {

  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }


  get responseProps(){
    const {  surveyDetail } = this.props

    const { data } = surveyDetail
  return   { surveyId:data.id,
    sections: data.sections,}

  }
  get questionTabProps() {
    const { dispatch,surveyDetail } = this.props

    const { data } = surveyDetail

    return {
      surveyId:data.id,
      sections: data.sections,
      publish: data.publish,
      onEditSurvey: (data, id) => {

        dispatch({
          type: `surveyDetail/update`,
          payload: data,
          id:id
        }).then(() => {
          this.handleRefresh();
        })
      },


      onCreateSection: (data, id) => {

        dispatch({
          type: `section/create`,
          payload: data,
          id:id
        }).then((d) => {


          this.handleRefresh();

        })
      },

      onEditSection: (data, id) => {


        dispatch({
          type: `section/update`,
          payload: data,
          id:id
        }).then(() => {

        })
      },


      onDeleteSection:(id)=>{

        dispatch({
          type: 'section/delete',
          payload:id,
        }).then((d) => {
          this.handleRefresh();

          console.log("reload this page again");
        })
      },

      onEditQuestion: (data, id, refresh) => {
      console.log(refresh);
        dispatch({
          type: `question/update`,
          payload: data,
          id:id
        }).then(() => {
          if( refresh){
            this.handleRefresh();
          }
        })
      },

      onCreateQuestion: (data, id) => {

        dispatch({
          type: `question/create`,
          payload: data,
          id:id
        }).then((d) => {


          this.handleRefresh();

        })
      },
      onDeleteQuestion:(id)=> {

        dispatch({
          type: 'question/delete',
          payload:id,
        }).then((d) => {
          this.handleRefresh();

console.log("reload this page again");
        })
      },
      onEditAnswer: (data, id) => {
        dispatch({
          type: `answer/update`,
          payload: data,
          id:id
        }).then(() => {

        })
      },

      onCreateAnswer: (data, id) => {

        dispatch({
          type: `answer/create`,
          payload: data,
          id:id
        }).then((d) => {


          this.handleRefresh();

        })
      },
      onDeleteAnswer:(id)=> {

        dispatch({
          type: 'answer/delete',
          payload:id,
        }).then((d) => {
          this.handleRefresh();

          console.log("reload this page again");
        })
      },
    }
  }

  render() {

    return (

      <Page inner>
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Questions" key="1">
                <QuestionTab {...this.questionTabProps}/>
            </TabPane>
            <TabPane tab="Responses" key="2">
                <ResponseTab {...this.responseProps} />
            </TabPane>
            <TabPane tab="Settings" key="3">
                <SettingTab />
            </TabPane>
        </Tabs>

      </Page>
    )
  }
}

SurveyDetail.propTypes = {
  surveyDetail: PropTypes.object,

}

export default SurveyDetail
