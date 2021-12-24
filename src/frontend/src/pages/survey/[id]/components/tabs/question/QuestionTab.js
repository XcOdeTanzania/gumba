import React, { PureComponent } from 'react'
import Header from './components/Header'
import Section from './Section'
import PropTypes from "prop-types";
import {Button, Switch} from "antd";


class QuestionTab extends PureComponent {

  handlePublishSurvey= () =>{
    console.log(React.version);
    const {surveyId,   onEditSurvey,publish } = this.props

        const data = {
          "publish": !publish

        }

        onEditSurvey(data,surveyId)

  }

  render() {
      const {
        sections,
        onCreateSection,
        onEditSection,
        onDeleteSection,
        onEditQuestion,
        onCreateQuestion,
        onDeleteQuestion,
        onEditAnswer,
        onCreateAnswer,
        onDeleteAnswer,
        surveyId,
        publish,
      onAddSkipAnswer} = this.props

        return (
            <>
                <Header />

              <Switch checkedChildren="Un-publish Survey" unCheckedChildren="Publish Survey"  onChange={this.handlePublishSurvey}  defaultChecked={publish}/>
              <br/>
              <br/>
              {sections.map(function (section, index) {
                const sectionProps ={
                  section: section,
                  sections:sections,
                  sectionNumber:index+1,
                  title:  "Section "+(index+1)+"/"+sections.length,
                  onCreateSection:onCreateSection,
                  onDeleteSection:onDeleteSection,
                  onEditSection:onEditSection,
                  onEditQuestion:onEditQuestion,
                  onCreateQuestion:onCreateQuestion,
                  onDeleteQuestion:onDeleteQuestion,
                  onEditAnswer:onEditAnswer,
                  onCreateAnswer:onCreateAnswer,
                  onDeleteAnswer:onDeleteAnswer,
                  showAddSectionButton:index === sections.length -1,
                  surveyId:surveyId,
                  publish:publish,
                  onAddSkipAnswer:onAddSkipAnswer



                }
                return <Section {...sectionProps} />;
              })}

            </>
        )
    }
}

QuestionTab.propTypes = {
  sections: PropTypes.array,

  onEditSurvey:PropTypes.func,

  onCreateSection: PropTypes.func,
  onEditSection:PropTypes.func,
  onDeleteSection:PropTypes.func,

  onCreateQuestion: PropTypes.func,
  onEditQuestion:PropTypes.func,
  onDeleteQuestion:PropTypes.func,

  onCreateAnswer:PropTypes.func,
  onEditAnswer:PropTypes.func,
  onDeleteAnswer:PropTypes.func,
  surveyId:PropTypes.any,
  publish:PropTypes.bool,

  onAddSkipAnswer:PropTypes.func
 }
export default QuestionTab
