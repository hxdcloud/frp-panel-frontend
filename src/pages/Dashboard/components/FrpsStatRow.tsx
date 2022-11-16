import {Card, Col, Row} from "antd";
import styles from '../index.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {marginBottom: 24},
};
const FrpsStatRow = ({config}: { config: any }) => {

  const renderBindPort = (port: number) => {
    return port === 0 ? "未监听" : port
  }

  const renderProxyCount = (count: object) => {
    let c = 0;
    for (const key in count) {
      c += count[key]
    }
    return c
  }

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <Card title="服务端监听端口" bordered={false}>
          <span className={styles.cardValue}>{renderBindPort(config?.bind_port)}</span>
        </Card>
      </Col>

      <Col {...topColResponsiveProps}>
        <Card title="客户端总数" bordered={false}>
          <span className={styles.cardValue}>{config?.client_counts}</span>
        </Card>
      </Col>


      <Col {...topColResponsiveProps}>
        <Card title="代理规则总数" bordered={false}>
          <span className={styles.cardValue}>{renderProxyCount(config?.proxy_type_count)}</span>
        </Card>
      </Col>

      <Col {...topColResponsiveProps}>
        <Card title="当前连接数" bordered={false}>
          <span className={styles.cardValue}>{config?.cur_conns}</span>
        </Card>
      </Col>
    </Row>
  )
}

export default FrpsStatRow
