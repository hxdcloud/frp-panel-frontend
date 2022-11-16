import React, {useRef} from 'react';
import {TableListItem} from "@/pages/frps/proxies/Tcp/data";
import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {getFrpcOption} from "@/services/frp-panel/frpc";
import {getProxyNameValidate, getProxyPortTcpValidate, postProxyTcp} from "@/services/frp-panel/proxy";
import {ProFormInstance} from "@ant-design/pro-components";
import {message} from "antd";

type CreateFormProps = {
  createModalVisible: boolean;
  handleModalVisible: any;
  actionRef: any;
};

/**
 * 添加TCP代理规则
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {

    await postProxyTcp({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const {createModalVisible, handleModalVisible, actionRef} = props;
  const restFormRef = useRef<ProFormInstance>();
  /** 新建窗口的弹窗 */

  return (
    <ModalForm
      title="新建TCP代理规则"
      width="400px"
      formRef={restFormRef}
      visible={createModalVisible}
      onVisibleChange={handleModalVisible}
      submitter={{
        searchConfig: {
          resetText: '重置',
        },
        resetButtonProps: {
          onClick: () => {
            restFormRef.current?.resetFields();
            //   setModalVisible(false);
          },
        },
      }}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async (value) => {
        const success = await handleAdd(value as TableListItem);
        if (success) {
          handleModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormSelect
        label="客户端"
        rules={[
          {
            required: true,
            message: '客户端为必选项',
          },
        ]}
        width="md"
        name="run_id"
        request={getFrpcOption}
      />
      <ProFormText
        label="代理名称"
        rules={[
          ({getFieldValue}) => ({
            async validator(rule, value) {
              const runId = getFieldValue('run_id');
              const name = getFieldValue('name');
              if (!runId) {
                return Promise.reject(new Error('请先选择客户端'));
              } else if (!name) {
                return Promise.reject(new Error('代理名称为必填项'));
              } else {
                const res = await getProxyNameValidate({name: value, runId: runId});
                return res.data ? Promise.resolve('代理名称可用') : Promise.reject('代理名称已存在');
              }
            },
          }),
        ]}
        width="md"
        name="name"
      />
      <ProFormText
        label="本地服务IP"
        initialValue="127.0.0.1"
        placeholder="127.0.0.1"
        rules={[
          {
            required: true,
            message: '本地服务 IP 为必填项',
          },
        ]}
        width="md"
        name="local_ip"
      />
      <ProFormText
        label="本地服务端口"
        rules={[
          {
            required: true,
            message: '本地服务端口为必填项',
          },
        ]}
        width="md"
        name="local_port"
      />
      <ProFormText
        label="服务端绑定端口"
        placeholder="留空自动分配"
        rules={[
          ({getFieldValue}) => ({
            async validator(rule, value) {
              const port = getFieldValue('remote_port');
              if (!port) {
                return Promise.resolve('端口将自动分配');
              } else {
                const res = await getProxyPortTcpValidate({port: value});
                return res.data ? Promise.resolve('端口可用') : Promise.reject('端口不可用');
              }
            },
          }),
        ]}
        width="md"
        name="remote_port"
      />
    </ModalForm>
  );
};

export default CreateForm;
