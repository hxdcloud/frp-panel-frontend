import {PlusOutlined} from '@ant-design/icons';
import {Button, Drawer, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import {removeRule} from './service';
import type {TableListItem} from './data';
import {filesize} from "filesize";
// @ts-ignore
import {getProxyTcp, deleteProxyTcp} from "@/services/frp-panel/proxy";


/**
 * 更新节点
 *
 * @param fields
 */

// const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
//   const hide = message.loading('正在配置');
//
//   try {
//     await updateRule({
//       ...currentRow,
//       ...fields,
//     });
//     hide();
//     message.success('配置成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('配置失败请重试！');
//     return false;
//   }
// };
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      tip: '代理名称需全局唯一',
    },
    {
      title: '客户端名称',
      dataIndex: ["user_info", "metas", "name"],
      search: false
    },
    {
      title: '端口',
      dataIndex: ["conf", "remote_port"],
      search: false
    },
    {
      title: '本地ip',
      dataIndex: ["conf", "local_ip"],
      search: false
    },
    {
      title: '本地端口',
      dataIndex: ["conf", "local_port"],
      search: false
    },
    {
      title: '当前连接数',
      dataIndex: 'cur_conns',
      search: false
    },
    {
      title: '今日入口流量',
      dataIndex: 'today_traffic_in',
      search: false,
      renderText: (val: string) => filesize(val, {base: 2, standard: "jedec"}),
    },
    {
      title: '今日出口流量',
      dataIndex: 'today_traffic_out',
      search: false,
      renderText: (val: string) => filesize(val, {base: 2, standard: "jedec"}),
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        online: {
          text: '运行中',
          status: 'Processing',
        },
        offline: {
          text: '关闭',
          status: 'Default',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="config"
          onClick={() => {
            Modal.confirm({
              title: '删除代理',
              content: '确定删除代理吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: () => deleteProxyTcp({run_id: record.user_info.run_id, name: record.name}),
            });
          }}
        >
          删除
        </a>,
        // <a key="subscribeAlert" href="https://procomponents.ant.design/">
        //   订阅警报
        // </a>,
      ],
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="TCP代理"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={getProxyTcp}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm
        createModalVisible={createModalVisible}
        handleModalVisible={handleModalVisible}
        actionRef={actionRef}
      />
      <UpdateForm
        updateModalVisible={updateModalVisible}
        handleModalVisible={handleUpdateModalVisible}
        actionRef={actionRef}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
