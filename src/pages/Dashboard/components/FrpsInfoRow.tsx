import {Col, Row, Tooltip} from "antd";
import styles from '../index.less';
import {InfoCircleOutlined} from "@ant-design/icons";

const FrpsInfoRow = ({value, title, tooltip}: {
  value: any;
  title: string;
  tooltip?: string;
}) => {
  return (
    <Row className={styles.configRow}>
    <Col span={12}>
      <span className={styles.title}>{title}</span>
      {
        tooltip && (
          <Tooltip className={styles.configTooltip} title={tooltip}>
            <InfoCircleOutlined/>
          </Tooltip>
        )
      }
    </Col>
    <Col span={12}>
      <span className={styles.value}>{value}</span>
    </Col>
  </Row>
  )
}
export default FrpsInfoRow
