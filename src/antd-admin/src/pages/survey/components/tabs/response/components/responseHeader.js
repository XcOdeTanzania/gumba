import { PureComponent } from 'react'
import { Card, Tabs } from 'antd' 

const { TabPane } = Tabs

class ResponseHeader extends PureComponent {
    render() { 
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

export default ResponseHeader