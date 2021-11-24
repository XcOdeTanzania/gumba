import React, { PureComponent } from 'react'
import { Page } from 'components'
import { Tabs } from 'antd'
import QuestionTab from '../components/tabs/question/Question'
import ResponseTab from '../components/tabs/response/Response'
import SettingTab from '../components/tabs/setting/Setting'

const { TabPane } = Tabs;

class SurveyDetail extends PureComponent {
  render() {
    return (
      <Page inner>
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Questions" key="1">
                <QuestionTab/>
            </TabPane>
            <TabPane tab="Responses" key="2">
                <ResponseTab />
            </TabPane>
            <TabPane tab="Settings" key="3">
                <SettingTab />
            </TabPane>
        </Tabs>

      </Page>
    )
  }
}

export default SurveyDetail
