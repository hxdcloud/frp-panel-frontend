import React, {useRef} from 'react';
import {message} from 'antd';
import {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import type {TableListItem} from '../data';
import {getProxyPortTcpValidate, postProxyTcp} from "@/services/frp-panel/proxy";
import {ProFormInstance} from "@ant-design/pro-components";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  updateModalVisible: boolean;
  handleModalVisible: any;
  values: Partial<TableListItem>;
  actionRef: any;
};



const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {updateModalVisible, handleModalVisible, values, actionRef} = props;
  const restFormRef = useRef<ProFormInstance>();

  const handleUpdate = async (fields: TableListItem) => {
    const hide = message.loading('正在更新');

    try {
      await postProxyTcp({...fields, run_id: values?.user_info?.run_id, local_port: fields.local_port+''});
      hide();
      message.success('更新成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
      return false;
    }
  };

  return (
    <ModalForm
      title="编辑TCP代理规则"
      width="400px"
      formRef={restFormRef}
      visible={updateModalVisible}
      onVisibleChange={handleModalVisible}
      initialValues={values}
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
        const success = await handleUpdate(value as TableListItem);
        if (success) {
          handleModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
      <ProFormText
        label="客户端"
        width="md"
        name="run_id"
        initialValue={values?.user_info?.metas?.name}
        disabled={true}
      />
      <ProFormText
        label="代理名称"
        disabled={true}
        width="md"
        name="name"
      />
      <ProFormText
        label="本地服务IP"
        placeholder="127.0.0.1"
        rules={[
          {
            required: true,
            message: '本地服务 IP 为必填项',
          },
        ]}
        width="md"
        initialValue={values?.conf?.local_ip+""}
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
        initialValue={values?.conf?.local_port}
        name="local_port"
      />
      <ProFormText
        label="服务端绑定端口"
        placeholder="留空自动分配"
        rules={[
          ({getFieldValue}) => ({
            async validator(rule, value) {
              const port = getFieldValue(["remote_port"]);
              if (!port) {
                return Promise.resolve('端口将自动分配');
              } else if (port === values?.conf?.remote_port) {
                return Promise.resolve('端口未改变');
              } else {
                const res = await getProxyPortTcpValidate({port: value});
                return res.data ? Promise.resolve('端口可用') : Promise.reject('端口不可用');
              }
            },
          }),
        ]}
        width="md"
        initialValue={values?.conf?.remote_port}
        name="remote_port"
      />
    </ModalForm>
  );
};

export default UpdateForm;
