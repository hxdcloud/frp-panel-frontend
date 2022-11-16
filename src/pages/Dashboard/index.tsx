import type {RadioChangeEvent} from 'antd';
import {Col, Row} from 'antd';
import {GridContent} from "@ant-design/pro-components";
import {useRequest} from "@@/plugin-request/request";
import {getFrpsInfo} from '@/services/frp-panel/frps'
import FrpsConfig from "@/pages/Dashboard/components/FrpsConfig";
import FrpsStatRow from "@/pages/Dashboard/components/FrpsStatRow";
import SystemInfo from "@/pages/Dashboard/components/SystemInfo";
import TrafficChart from "@/pages/Dashboard/components/TrafficChart";
import {useState} from "react";
import {filesize} from "filesize";
import ProxyTypeChart from "@/pages/Dashboard/components/ProxyTypeChart";

type SystemInfoType = 'system' | 'hardware';
type EchartsValue = {
  value: number,
  name: string
}

export default () => {
  const [systemInfoType, setSystemInfoType] = useState<SystemInfoType>('system');
  const middleColResponsiveProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    style: {marginBottom: 24},
  };

  const {data: config} = useRequest(getFrpsInfo, {
    pollingInterval: 3000
  })
  const handleChangeSystemInfoType = (e: RadioChangeEvent) => {
    setSystemInfoType(e.target.value);
  };

  const trafficChartOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom',
      left: 'center'
    },
    series: [
      {
        name: '今日流量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: config?.total_traffic_in, name: '入口流量'},
          {value: config?.total_traffic_out, name: '出口流量'},
        ],
        tooltip: {
          valueFormatter: (value: number) => filesize(value, {base: 2, standard: "jedec"})
        }
      }
    ]
  }

  const getProxyTypeData = () => {
    const proxyTypes = config?.proxy_type_count;
    const datas = [];
    for (const key in proxyTypes) {
      const data = {
        value: proxyTypes[key],
        name: key
      }
      datas.push(data)
    }
    return datas
  }

  const proxyTypeOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom',
      left: 'center'
    },
    series: [
      {
        name: '代理类型',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: getProxyTypeData(),
      }
    ]
  }
  return (
    <GridContent>

      <FrpsStatRow
        config={config}
      />

      <Row gutter={24}>
        <Col {...middleColResponsiveProps}>
          <FrpsConfig
            config={config}
          />
        </Col>
        <Col {...middleColResponsiveProps}>
          <SystemInfo
            config={config}
            systemInfoType={systemInfoType}
            handleChangeSystemInfoType={handleChangeSystemInfoType}
          />
        </Col>
      </Row>

      <Row gutter={24}>
        <Col {...middleColResponsiveProps}>
          <TrafficChart
            option={trafficChartOption}
          />
        </Col>

        <Col {...middleColResponsiveProps}>
          <ProxyTypeChart
            option={proxyTypeOption}
          />
        </Col>
      </Row>
    </GridContent>
  );
};
