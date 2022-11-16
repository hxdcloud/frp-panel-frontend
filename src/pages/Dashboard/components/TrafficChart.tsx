import {ProCard} from "@ant-design/pro-components";
import ReactECharts from "echarts-for-react";


const TrafficChart = ({option}: {
  option: any
}) => {
  return (
    <ProCard
      collapsible
      headerBordered
      title="今日流量">
      <ReactECharts option={option} />
    </ProCard>
  )
}
export default TrafficChart
