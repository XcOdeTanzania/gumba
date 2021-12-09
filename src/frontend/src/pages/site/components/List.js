import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd';
import { DropOption } from 'components';
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"

import styles from './List.less'
import {Link} from "umi";

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: t`Image`,
        dataIndex: 'image',
        width: '7%',
        render: text => <Avatar shape="square" src={text} />,
      },

      {
        title: t`Name`,
        dataIndex: 'name',

        render: (text, record) => <Link to={`site/${record.id}`}>{text}</Link>,

      },
      {
        title: <Trans>Description</Trans>,
        dataIndex: 'description',
        key: 'description',
      },


      {
        title: <Trans>Address</Trans>,
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: t`Privacy`,
        dataIndex: 'privacy',
        width: '7%',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width: '8%',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: t`Update` },
                { key: '2', name: t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
