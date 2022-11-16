import FrpsInfoRow from "@/pages/Dashboard/components/FrpsInfoRow";
import {ProCard} from "@ant-design/pro-components";
import {Link} from "umi";

const renderLimit = (limit: number) => {
  return limit === 0 ? "无限制" : limit
}

const renderPort = (port: number) => {
  return port === 0 ? "不启用" : port
}


const renderSecond = (second: number) => {
  return `${second} 秒`
}

const FrpsConfig = ({config}: {config: any}) => (
  <ProCard
    collapsible
    headerBordered
    extra={<Link to="/frps/config">修改</Link>}
    title="配置信息">

    <FrpsInfoRow
      title="UDP 端口"
      value={renderPort(config?.bind_udp_port)}
      tooltip="用于辅助创建 P2P 连接"
    />
    <FrpsInfoRow
      title="HTTP 端口"
      value={renderPort(config?.vhost_http_port)}
      tooltip="启用后才支持 HTTP 类型的代理，默认不启用"
    />
    <FrpsInfoRow
      title="HTTPS 端口"
      value={renderPort(config?.vhost_https_port)}
      tooltip="启用后才支持 HTTPS 类型的代理，默认不启用"
    />
    <FrpsInfoRow
      title="TCPMUX 端口"
      value={renderPort(config?.tcpmux_httpconnect_port)}
      tooltip="启用后才支持 TCPMUX 类型的代理，默认不启用"
    />
    <FrpsInfoRow
      title="二级域名后缀"
      value={config?.subdomain_host}
    />
    <FrpsInfoRow
      title="最大连接池大小"
      value={config?.max_pool_count}
    />
    <FrpsInfoRow
      title="限制单个客户端最大同时存在的代理数"
      value={renderLimit(config?.max_ports_per_client)}
    />
    <FrpsInfoRow
      title="服务端和客户端心跳连接的超时时间"
      value={renderSecond(config?.heart_beat_timeout)}
    />
    <FrpsInfoRow
      title="服务端版本"
      value={config?.version}
    />
  </ProCard>
)

export default FrpsConfig
