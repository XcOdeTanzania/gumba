import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input,  Radio, Modal } from 'antd'
import { Trans } from "@lingui/macro"

import { t } from "@lingui/macro"

const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class SiteModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }
        data.address = data.address.join(' ')
        onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item, address: item.address && item.address.split(' ') }} layout="horizontal">
          <FormItem name='name' rules={[{ required: true }]}
            label={t`Name`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='description' rules={[{ required: true }]}
            label={t`Description`} hasFeedback {...formItemLayout}>
            <TextArea rows={4} />
          </FormItem>
          <FormItem name='privacy' rules={[{ required: true }]}
            label={t`Privacy`} hasFeedback {...formItemLayout}>
            <Radio.Group>
              <Radio value>
                <Trans>Public</Trans>
              </Radio>
              <Radio value={false}>
                <Trans>Protected</Trans>
              </Radio>
              <Radio value={false}>
                <Trans>Private</Trans>
              </Radio>
            </Radio.Group>
          </FormItem>


          <FormItem name='address' rules={[{ required: true  }]}
            label={t`Address`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>


        </Form>
      </Modal>
    )
  }
}

SiteModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default SiteModal
