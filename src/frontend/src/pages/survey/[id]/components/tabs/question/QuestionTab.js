import React, { PureComponent } from 'react'
import Header from './components/Header'
import Section from './Section'
import PropTypes from "prop-types";
import {Button} from "antd";


class QuestionTab extends PureComponent {

  handlePublishSurvey= () =>{
    console.log(React.version);
    const {surveyId,   onEditSurvey } = this.props

        const data = {
          "publish":true

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
        surveyId} = this.props

        return (
            <>
                <Header />
              <Button  onClick={this.handlePublishSurvey} >
                Publish Survey
              </Button>
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
                  surveyId:surveyId



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
 }
export default QuestionTab
