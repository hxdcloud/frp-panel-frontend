import {Col, Progress, Row, Tooltip} from "antd";
import styles from '../index.less';
import {InfoCircleOutlined} from "@ant-design/icons";

const FrpsInfoProgress = ({value, title, tooltip}: {
  value: any;
  title: string;
  tooltip?: string;
}) => {
  return (
    <Row
      className={styles.configRow} >
      <Col>
        <span className={styles.title}>{title}</span>
        {
          tooltip && (
            <Tooltip className={styles.configTooltip} title={tooltip}>
              <InfoCircleOutlined/>
            </Tooltip>
          )
        }
      </Col>
        <Progress
          strokeColor={{
            '0%': '#40a9ff',
            '100%': '#ff4d4f',
          }}
          percent={value}
        />
    </Row>
  )
}

export default FrpsInfoProgress
