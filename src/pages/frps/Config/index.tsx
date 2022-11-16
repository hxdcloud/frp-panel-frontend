import {CloseCircleOutlined} from '@ant-design/icons';
import {Col, Popover, Row, message} from 'antd';

import type {FC} from 'react';
import {useState} from 'react';
import ProForm from '@ant-design/pro-form';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import {getFrpsConfig, postFrpsConfig} from '@/services/frp-panel/frps'
import styles from './style.less';
import FrpsBindConfig from "@/pages/frps/Config/components/FrpsBindConfig";
import FrpsLogConfig from "@/pages/frps/Config/components/FrpsLogConfig";
import FrpsConnectConfig from "@/pages/frps/Config/components/FrpsConnectConfig";
import FrpsTcpMuxConfig from "@/pages/frps/Config/components/FrpsTcpMuxConfig";
import FrpsAuthConfig from "@/pages/frps/Config/components/FrpsAuthConfig";
import FrpsManageConfig from "@/pages/frps/Config/components/FrpsManageConfig";

type InternalNamePath = (string | number)[];

const fieldLabels = {
  bindAddr: '服务端监听地址',
  bindPort: '服务端监听端口',
  bindUdpPort: '服务端监听 UDP 端口',
  kcpBindPort: '服务端监听 KCP 协议端口',
  proxyBindAddr: '代理监听地址',
  logFile: '日志文件地址',
  logLevel: '日志等级',
  logMaxDays: '日志文件保留天数',
  disableLogColor: '任务描述',
  detailedErrorsToClient: '服务端是否返回详细错误信息给客户端',
  tcpMuxKeepaliveInterval: 'tcp_mux 的心跳检查间隔时间',
  tcpKeepAlive: '和客户端底层 TCP 连接的 keepalive 间隔时间',
  heartbeatTimeout: '服务端和客户端心跳连接的超时时间',
  userConnTimeout: '用户建立连接后等待客户端响应的超时时间',
  udpPacketSize: '代理 UDP 服务时支持的最大包长度',
  // type2: '任务类型',
};


interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}


const Config: FC<Record<string, any>> = () => {
  const [error, setError] = useState<ErrorField[]>([]);

  const colResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    style: {marginBottom: 24},
  };

  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon}/>
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined/>
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await postFrpsConfig(values);
      message.success('提交成功');
    } catch {
      // console.log
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <ProForm
      layout="vertical"
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      request={getFrpsConfig}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="frps配置，修改后重启生效">

        <Row gutter={24}>
          <Col {...colResponsiveProps}>
            <FrpsBindConfig/>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...colResponsiveProps}>
            <FrpsConnectConfig/>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...colResponsiveProps}>
            <FrpsAuthConfig/>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...colResponsiveProps}>
            <FrpsManageConfig/>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...colResponsiveProps}>
            <FrpsTcpMuxConfig/>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...colResponsiveProps}>
            <FrpsLogConfig/>
          </Col>
        </Row>


      </PageContainer>
    </ProForm>
  );
};

export default Config;
