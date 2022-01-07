import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'

import { Page  } from 'components'
import {
  NumberCard,

  Sales,

  Completed,

} from './components'
import styles from './index.less'
import {Color} from "../../utils";


const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  render() {


    const { dashboard  } = this.props
    const {
      sales,
      numbers,
      completed,

    } = dashboard



    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>

       {/*//users*/}
          <Col lg={8} md={12}>
            <NumberCard {... {
              icon: 'team',
              color: Color.green,
              title: 'Users',
              number: 2781,
            }} />
          </Col>
       {/*//sites*/}
          <Col   lg={8} md={12}>
            <NumberCard {...{
              icon: 'edit',
              color: Color.purple,
              title: 'Sites',
              number: 253,
            } } />
          </Col>

          {/*//surveys*/}
          <Col  lg={8} md={12}>
            <NumberCard {...{
              icon: 'code-o',
              color: Color.red,
              title: 'Surveys',
              number: 5,
            }} />
          </Col>

          {/*//Yearly surveys*/}
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Sales data={sales} />
            </Card>
          </Col>

         {/*//completed surveys*/}
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>


        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
