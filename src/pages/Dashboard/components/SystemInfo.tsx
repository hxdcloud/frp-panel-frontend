import type { RadioChangeEvent} from "antd";
import { Radio} from "antd";
import styles from "../index.less"
import FrpsInfoProgress from "@/pages/Dashboard/components/FrpsInfoProgress";
import FrpsInfoRow from "@/pages/Dashboard/components/FrpsInfoRow";
import moment from "moment";
import {filesize} from "filesize";
import {ProCard} from "@ant-design/pro-components";

const SystemInfo = ({config, systemInfoType, handleChangeSystemInfoType}: {
  config: any,
  systemInfoType: string,
  handleChangeSystemInfoType: (e: RadioChangeEvent) => void;
}) => {

  const renderFileSize = (size: number) => {
    return filesize(size, {base: 2, standard: "jedec"});
  }

  const renderUpTime = (time: any) => {
    const m1 = moment();
    const m2 = moment(time * 1000)
    if (m1.diff(m2,'day') >= 1) {
      return `${m1.diff(m2,'day')} 天`
    } else {
      return moment(m1.diff(m2)).format('HH:mm:ss')
    }

  }

  const info = () => {
    if (systemInfoType === 'system') {
      return (
        <>
          <FrpsInfoProgress
            value={config?.host_state?.cpu}
            title="cpu"
          />
          <FrpsInfoProgress
            value={config?.host_state?.mem_percent}
            title="内存"
          />
          <FrpsInfoProgress
            value={config?.host_state?.swap_percent}
            title="swap"
          />
          <FrpsInfoRow
            value={`${config?.host_state?.load_1} ${config?.host_state?.load_5} ${config?.host_state?.load_15}`}
            title="负载"
          />
          <FrpsInfoRow
            value={config?.host_state?.tcp_conn_count}
            title="TCP 连接数"
          />
          <FrpsInfoRow
            value={config?.host_state?.udp_conn_count}
            title="UDP 连接数"
          />
          <FrpsInfoRow
            value={config?.host_state?.process_count}
            title="进程数"
          />
          <FrpsInfoRow
            value={renderUpTime(config?.host?.boot_time)}
            title="在线时间"
          />
        </>
      )
    } else{
      return (
        <>
          <FrpsInfoRow
            value={config?.host?.arch}
            title="cpu架构"
          />
          <FrpsInfoRow
            value={config?.host?.cpu[0]}
            title="cpu型号"
          />
          <FrpsInfoRow
            value={renderFileSize(config?.host?.mem_total)}
            title="内存"
          />
          <FrpsInfoRow
            value={renderFileSize(config?.host?.swap_total)}
            title="交换"
          />
          <FrpsInfoRow
            value={config?.host?.platform}
            title="系统"
          />
          <FrpsInfoRow
            value={config?.host?.platform_version}
            title="系统版本"
          />
        </>
      )
    }
  }

  return (
    <ProCard
      collapsible
      headerBordered
      title="服务器信息"
      extra={
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={systemInfoType} onChange={handleChangeSystemInfoType}>
            <Radio.Button value="system">系统</Radio.Button>
            <Radio.Button value="hardware">硬件</Radio.Button>
          </Radio.Group>
        </div>}
    >
      {info()}
    </ProCard>
  )
}

export default SystemInfo
