import styles from "@/pages/Dashboard/index.less";
import {Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const FrpsConfigTitle = ({title, tooltip}: {
  title: string,
  tooltip?: string,
}) => {
  return (
    <>
      <span className={styles.title}>{title}</span>
      {
        tooltip && (
          <Tooltip className={styles.configTooltip} title={tooltip}>
            <InfoCircleOutlined/>
          </Tooltip>
        )
      }</>
  )

}

export default FrpsConfigTitle
