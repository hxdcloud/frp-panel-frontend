import {ProCard} from "@ant-design/pro-components";
import ReactECharts from "echarts-for-react";


const ProxyTypeChart = ({option}: {
  option: any
}) => {
  return (
    <ProCard
      collapsible
      headerBordered
      title="代理类型">
      <ReactECharts option={option} />
    </ProCard>
  )
}

export default ProxyTypeChart
