import { PureComponent } from 'react'
import ResponseHeader from './components/responseHeader'
import PropTypes from "prop-types";


class ResponseTab extends PureComponent {
  componentDidMount() {
    console.log("Am called as soon as its mounted")
  }
  get responseProps(){
    const {  sections,survey } = this.props


    return   {
      sections: sections,
    survey:survey}

  }
    render() {
        return (
            <>
                <ResponseHeader {...this.responseProps}/>
            </>
        )
    }
}

ResponseTab.propTypes = {
  sections: PropTypes.array,
  survey:PropTypes.object
}
export default ResponseTab
