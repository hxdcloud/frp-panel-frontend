import {ProCard, ProFormDigit, ProFormSelect} from "@ant-design/pro-components";
import {Col, Row} from "antd";
import FrpsConfigTitle from "@/pages/frps/Config/components/FrpsConfigTitle";
import styles from "@/pages/frps/Config/style.less";


const FrpsTcpMuxConfig = () => {

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
      title="TCPMUX配置"
    >
      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormDigit
            label={getTitle('为 TCPMUX 类型代理监听的端口','启用后才支持 TCPMUX 类型的代理')}
            name={['data', 'common', 'tcpmuxHttpConnectPort']}
            placeholder="0"
            min={0}
            max={65535}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormSelect
            label={getTitle('是否透传 CONNECT 请求','通常在本地服务是 HTTP Proxy 时使用')}
            name={['data', 'common', 'tcpmuxPassthrough']}
            options={[
              {
                label: '是',
                value: 'true',
              },
              {
                label: '否',
                value: 'false',
              },
            ]}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('tcp_mux 的心跳检查间隔时间')}
            name={['data', 'common', 'tcpMuxKeepaliveInterval']}
            placeholder="60"
            fieldProps={{
              style: {width: '100%'},
              addonAfter: '秒'
            }}
          />
        </Col>
      </Row>
    </ProCard>
  )
}

export default FrpsTcpMuxConfig
