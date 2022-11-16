import {ProCard, ProFormDigit, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {Col, Row} from "antd";
import FrpsConfigTitle from "@/pages/frps/Config/components/FrpsConfigTitle";
import styles from "@/pages/frps/Config/style.less";


const FrpsLogConfig = () => {

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
      title="管理配置"
    >
      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormText
            label={getTitle('允许代理绑定的服务端端口','格式为 1000-2000,2001,3000-4000')}
            name={['data', 'common', 'allowPorts']}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('最大连接池大小')}
            name={['data', 'common', 'maxPoolCount']}
            placeholder="5"
            min={1}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('限制单个客户端最大同时存在的代理数','0 表示没有限制')}
            name={['data', 'common', 'maxPortsPerClient']}
            placeholder="0"
            min={0}
          />
        </Col>
      </Row>


      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormSelect
            label={getTitle('只接受启用了 TLS 的客户端连接')}
            name={['data', 'common', 'tlsOnly']}
            placeholder="否"
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

      </Row>
    </ProCard>
  )
}

export default FrpsLogConfig
