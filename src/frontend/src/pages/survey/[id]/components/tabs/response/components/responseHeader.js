import { PureComponent } from 'react'
import {Card, Col, Row, Tabs} from 'antd'
import PropTypes from "prop-types";


const { TabPane } = Tabs

class ResponseHeader extends PureComponent {

    render() {
      const {sections}= this.props;
        return (
            <>
                <Card>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>0 responses</h2>
                        <div>
                            <label>Accepting responses {' '}
                                <input type="checkbox" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Summary" key="1">
                              {sections.map(function (section, index){
                                return  <Card>
                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {section.title}
                                  </div>

                                </Card>
                              })}

                            </TabPane>
                            <TabPane tab="Questions" key="2">
                            </TabPane>
                            <TabPane tab="Individual" key="3">
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </>
        )
    }
}

ResponseHeader.propTypes = {
  sections: PropTypes.array,
}
export default ResponseHeader
