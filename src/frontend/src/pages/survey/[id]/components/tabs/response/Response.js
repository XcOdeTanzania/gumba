import { PureComponent } from 'react'
import ResponseHeader from './components/responseHeader'
import PropTypes from "prop-types";


class ResponseTab extends PureComponent {
  get responseProps(){
    const {  sections } = this.props


    return   {
      sections: sections}

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
}
export default ResponseTab
