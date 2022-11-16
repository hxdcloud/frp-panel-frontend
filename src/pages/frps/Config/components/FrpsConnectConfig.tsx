import FrpsConfigTitle from "@/pages/frps/Config/components/FrpsConfigTitle";
import {ProCard, ProFormDigit} from "@ant-design/pro-components";
import styles from "@/pages/frps/Config/style.less";
import {Col, Row} from "antd";


const FrpsConnectConfig = () => {
  const getTitle = (title: string, tooltip?: string) => {
    return (
      <FrpsConfigTitle
        title={title}
        tooltip={tooltip}
      />
    )
  }

  return (
    <ProCard
      className={styles.card}
      collapsible
      headerBordered
      title="连接配置"
    >
      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormDigit
            label={getTitle('和客户端底层 TCP 连接的 keepalive 间隔时间','负数不启用')}
            name={['data', 'common', 'tcpKeepalive']}
            placeholder="7200"
            fieldProps={{
              style: {width: '100%'},
              addonAfter: '秒'
            }}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('服务端和客户端心跳连接的超时时间')}
            name={['data', 'common', 'heartbeatTimeout']}
            placeholder="90"
            fieldProps={{
              style: {width: '100%'},
              addonAfter: '秒'
            }}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('用户建立连接后等待客户端响应的超时时间')}
            name={['data', 'common', 'userConnTimeout']}
            placeholder="10"
            fieldProps={{
              style: {width: '100%'},
              addonAfter: '秒'
            }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormDigit
            label={getTitle('代理 UDP 服务时支持的最大包长度','服务端和客户端的值需要一致')}
            name={['data', 'common', 'udpPacketSize']}
            placeholder="1500"
            fieldProps={{
              style: {width: '100%'},
              addonAfter: '字节（Byte）'
            }}
          />
        </Col>
      </Row>
    </ProCard>
  )
}

export default FrpsConnectConfig
