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

class SurveyModal extends PureComponent {
  formRef = React.createRef()

  handleOk = () => {
    const { item = {}, onOk } = this.props

    this.formRef.current.validateFields()
      .then(values => {
        const data = {
          ...values,
          key: item.key,
        }
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
        <Form ref={this.formRef} name="control-ref" initialValues={{ ...item }} layout="horizontal">
          <FormItem name='title' rules={[{ required: true }]}
            label={t`Title`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='description' rules={[{ required: true }]}
            label={t`Description`} hasFeedback {...formItemLayout}>
            <TextArea rows={4} />
          </FormItem>
          <FormItem name='summary' rules={[{ required: true }]}
                    label={t`Summary`} hasFeedback {...formItemLayout}>
            <TextArea rows={4} />
          </FormItem>
          <FormItem name='accessibility' rules={[{ required: true }]}
            label={t`Accessibility`} hasFeedback {...formItemLayout}>
            <Radio.Group>
              <Radio value="PUBLIC">
                <Trans>Public</Trans>
              </Radio>
              <Radio value="PROTECTED">
                <Trans>Protected</Trans>
              </Radio>
              <Radio value="PRIVATE">
                <Trans>Private</Trans>
              </Radio>
            </Radio.Group>
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

SurveyModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default SurveyModal
