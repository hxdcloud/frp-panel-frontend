import FrpsConfigTitle from "@/pages/frps/Config/components/FrpsConfigTitle";
import {ProCard, ProFormDependency, ProFormSelect} from "@ant-design/pro-components";
import styles from "@/pages/frps/Config/style.less";
import {Col, Row} from "antd";
import {ProFormText} from "@ant-design/pro-form";

const FrpsConnectConfig = () => {


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
      title="权限验证"
    >
      <Row gutter={16}>
        <Col lg={6} md={12} sm={24}>
          <ProFormSelect
            label={getTitle('鉴权方式',)}
            name={['data', 'common', 'authenticationMethod']}
            // fieldProps={{ onSelect: (e: any) => console.log(e) }}
            options={[
              {
                label: 'token',
                value: 'token',
              },
              {
                label: 'oidc',
                value: 'oidc',
              },
            ]}
          />
        </Col>

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormSelect
            label={getTitle('开启心跳消息鉴权')}
            name={['data', 'common', 'authenticateHeartbeats']}
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

        <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <ProFormSelect
            label={getTitle('开启建立工作连接的鉴权')}
            name={['data', 'common', 'authenticateNewWorkConns']}
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

      <ProFormDependency name={['data', 'common', 'authenticationMethod']}>
        {value => {
          const authMethod = value.data.common.authenticationMethod;
          if (authMethod === 'token') {
            return (
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormText
                    label={getTitle('鉴权使用的 token 值', '客户端需要设置一样的值才能鉴权通过')}
                    name={['data', 'common', 'token']}
                  />
                </Col>
              </Row>
            )
          } else if (authMethod === 'oidc') {
            return (
              <>
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <ProFormText
                      label={getTitle('oidc_issuer')}
                      name={['data', 'common', 'oidcIssuer']}
                    />
                  </Col>

                  <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                    <ProFormText
                      label={getTitle('oidc_audience')}
                      name={['data', 'common', 'oidcAudience']}
                    />
                  </Col>

                  <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                    <ProFormSelect
                      label={getTitle('oidc_skip_expiry_check')}
                      name={['data', 'common', 'oidcSkipExpiryCheck']}
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

                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                    <ProFormSelect
                      label={getTitle('oidc_skip_issuer_check')}
                      name={['data', 'common', 'oidcSkipIssuerCheck']}
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
              </>
            )
          } else {
            return
          }
        }}
      </ProFormDependency>
    </ProCard>
  )
}

export default FrpsConnectConfig
