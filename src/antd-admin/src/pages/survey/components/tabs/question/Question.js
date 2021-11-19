import { PureComponent } from 'react'
import Header from './components/Header'
import Section from '../../Section'

class QuestionTab extends PureComponent {
    render() {
        return (
            <>
                <Header/>
                <Section title="Section #" />
            </>
        )
    }
}

export default QuestionTab