import { PureComponent } from 'react'
import Header from './components/Header'
import Section from './Section'
import PropTypes from "prop-types";

class QuestionTab extends PureComponent {



  render() {
      const {
        sections,
        onCreateSection,
        onEditSection,
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
              {sections.map(function (section, index) {
                const sectionProps ={
                  section: section,
                  sections:sections,
                  sectionNumber:index+1,
                  title:  "Section "+(index+1)+"/"+sections.length,
                  onCreateSection:onCreateSection,

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

  onCreateSection: PropTypes.func,
  onEditSection:PropTypes.func,
  onDeleteSection:PropTypes.func,

  onCreateQuestion: PropTypes.func,
  onEditQuestion:PropTypes.func,
  onDeleteQuestion:PropTypes.func,

  onCreateAnswer:PropTypes.func,
  onEditAnswer:PropTypes.func,
  onDeleteAnswer:PropTypes.func,
  surveyId:PropTypes.any
}
export default QuestionTab
