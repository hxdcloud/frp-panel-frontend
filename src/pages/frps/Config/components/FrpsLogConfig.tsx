import {ProCard, ProFormDigit, ProFormSelect} from "@ant-design/pro-components";
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
      title="日志配置"
    >
      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormSelect
            label={getTitle('日志等级')}
            name={['data', 'common', 'logLevel']}
            options={[
              {
                label: 'trace',
                value: 'trace',
              },
              {
                label: 'debug',
                value: 'debug',
              },
              {
                label: 'info',
                value: 'info',
              },
              {
                label: 'warn',
                value: 'warn',
              },
              {
                label: 'error',
                value: 'error',
              },
            ]}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormDigit
            label={getTitle('日志文件保留天数')}
            name={['data', 'common', 'logMaxDays']}
            placeholder="3"
            min={1}
            max={365}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormSelect
            label={getTitle('服务端返回详细错误信息给客户端')}
            name={['data', 'common', 'detailedErrorsToClient']}
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
