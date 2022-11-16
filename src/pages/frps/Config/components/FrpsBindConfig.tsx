import {ProCard} from "@ant-design/pro-components";
import {Col, Row} from "antd";
import {ProFormDigit, ProFormText} from "@ant-design/pro-form";
import FrpsConfigTitle from "@/pages/frps/Config/components/FrpsConfigTitle";
import styles from "@/pages/frps/Config/style.less";


const FrpsBindConfig = () => {

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
      title="监听配置"
    >
      <Row gutter={16}>

        <Col lg={6} md={12} sm={24} >
          <ProFormDigit
            label={getTitle('服务端监听地址')}
            name={['data', 'common', 'bindAddr']}
            placeholder="0.0.0.0"
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormText
            label={getTitle('代理监听地址', '可以使代理监听在不同的网卡地址')}
            name={['data', 'common', 'proxyBindAddr']}
            placeholder="0.0.0.0"
          />
        </Col>
      </Row>

      <Row gutter={16}>

        <Col lg={6} md={12} sm={24}>
          <ProFormDigit
            label={getTitle('服务端监听端口', '接收 frpc 的连接')}
            name={['data', 'common', 'bindPort']}
            rules={[{required: true, message: '请输入服务端监听端口'}]}
            placeholder="0"
            min={0}
            max={65535}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('服务端监听 UDP 端口', '用于辅助创建 P2P 连接')}
            name={['data', 'common', 'bindUdpPort']}
            placeholder="0"
            min={0}
            max={65535}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('服务端监听 KCP 协议端口', '用于接收采用 KCP 连接的 frpc')}
            name={['data', 'common', 'kcpBindPort']}
            placeholder="0"
            min={0}
            max={65535}
          />
        </Col>

      </Row>

      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormDigit
            label={getTitle('HTTP 代理监听端口', '启用后才支持 HTTP 类型的代理')}
            name={['data', 'common', 'vhostHttpPort']}
            placeholder="0"
            min={0}
            max={65535}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('HTTPS 代理监听端口', '启用后才支持 HTTPS 类型的代理')}
            name={['data', 'common', 'vhostHttpsPort']}
            placeholder="0"
            min={0}
            max={65535}
          />
        </Col>

      </Row>

    </ProCard>
  )
}

export default FrpsBindConfig
