import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Table, Modal, Avatar, Tag} from 'antd';
import { DropOption } from 'components';
import { Ellipsis } from 'components';
import { t } from "@lingui/macro";
import { Trans } from "@lingui/macro";
import { Link } from 'umi';

import styles from './List.less';
import {Color} from "../../../utils";

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onViewItem } = this.props

    if (e.key === '1') {
      onViewItem(record)
    }
    else if (e.key === '2') {
      onEditItem(record)
    } else if (e.key === '3') {
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
        title: t`Title`,
        dataIndex: 'title',
        render: (text, record) => <Ellipsis><Link to={`survey/${record.id}`}>{text}</Link></Ellipsis>,
      },
      {
        title: t`Accessibility`,
        dataIndex: 'accessibility',
        render: text => <Tag color={text=== "PUBLIC"? Color.green: (text=== "PROTECTED"? Color.blue: Color.red) }>{text}</Tag>,

      },
      {
        title: <Trans>MetaTitle</Trans>,
        dataIndex: 'metaTitle',
        key: 'metaTitle',
      },


      {
        title: <Trans>Slug</Trans>,
        dataIndex: 'slug',
        key: 'slug',
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
                { key: '1', name: t`View` },
                { key: '2', name: t`Update` },
                { key: '3', name: t`Delete` },
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
