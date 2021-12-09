import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Form, Input,   Radio, Modal, Cascader, DatePicker} from 'antd'
import { Trans } from "@lingui/macro"
import city from 'utils/city'
import { t } from "@lingui/macro"


const { RangePicker } = DatePicker;
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class UserModal extends PureComponent {
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
          <FormItem name='nickname' rules={[{ required: true }]}
            label={t`NickName`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='gender' rules={[{ required: true }]}
            label={t`Gender`} hasFeedback {...formItemLayout}>
            <Radio.Group>
              <Radio value="MALE">
                <Trans>Male</Trans>
              </Radio>
              <Radio value="FEMALE">
                <Trans>Female</Trans>
              </Radio>
            </Radio.Group>
          </FormItem>

          <FormItem name='dob' label={t`Date of birth`} hasFeedback {...formItemLayout} rules={[{ required: true }]} >

            <Input/>
          </FormItem>

          <FormItem name='phone' rules={[{ required: true, pattern: /^([+]?[012345789]\d{11})+$/, message: t`The input is not valid phone!`, }]}
            label={t`Phone`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='email' rules={[{ required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: t`The input is not valid E-mail!`, }]}
            label={t`Email`} hasFeedback {...formItemLayout}>
            <Input />
          </FormItem>
          <FormItem name='address' rules={[{ required: true, }]}
            label={t`Address`} hasFeedback {...formItemLayout}>
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={t`Pick an address`}
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
