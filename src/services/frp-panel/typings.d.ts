declare namespace API {
  type Common = {
    KcpBindPort?: number;
    OidcIssuer?: string;
    /** manage config */
    allowPorts?: string;
    authenticateHeartbeats?: boolean;
    authenticateNewWorkConns?: boolean;
    /** auth config */
    authenticationMethod?: string;
    /** bind config */
    bindAddr?: string;
    bindPort: number;
    bindUdpPort?: number;
    custom404Page?: string;
    detailedErrorsToClient?: boolean;
    disableLogColor?: boolean;
    heartbeatTimeout?: number;
    /** log config */
    logFile?: string;
    logLevel?: string;
    logMaxDays?: number;
    maxPoolCount?: number;
    maxPortsPerClient?: number;
    oidcAudience?: string;
    oidcSkipExpiryCheck?: boolean;
    oidcSkipIssuerCheck?: boolean;
    proxyBindAddr?: string;
    subdomainHost?: string;
    /** connect config */
    tcpKeepalive?: number;
    /** tcpmux config */
    tcpmuxHttpConnectPort?: number;
    tcpmuxPassthrough?: boolean;
    tlsOnly?: boolean;
    token?: string;
    udpPacketSize?: number;
    userConnTimeout?: number;
    vhostHttpPort?: number;
    /** http & https config */
    vhostHttpTimeout?: number;
    vhostHttpsPort?: number;
  };

  type DeleteProxy = {
    /** ProxyName is the name of this */
    name?: string;
    /** RunId client unique id */
    run_id?: string;
  };

  type FrpsConfig = {
    common?: Common;
  };

  type getProxyNameValidateParams = {
    /** proxy name */
    name: string;
    /** frpc runId */
    runId: string;
  };

  type getProxyPortTcpValidateParams = {
    /** tcp port */
    port: number;
  };

  type getProxyTcpParams = {
    /** current page */
    current: number;
    /** page size */
    pageSize: number;
    /** proxy name */
    name?: number;
    /** proxy status */
    status?: string;
  };

  type Host = {
    arch?: string;
    boot_time?: number;
    cpu?: string[];
    mem_total?: number;
    platform?: string;
    platform_version?: string;
    swap_total?: number;
    virtualization?: string;
  };

  type HostState = {
    cpu?: number;
    load_1?: number;
    load_15?: number;
    load_5?: number;
    mem_percent?: number;
    mem_used?: number;
    net_in_speed?: number;
    net_in_transfer?: number;
    net_out_speed?: number;
    net_out_transfer?: number;
    process_count?: number;
    swap_percent?: number;
    swap_used?: number;
    tcp_conn_count?: number;
    udp_conn_count?: number;
    uptime?: number;
  };

  type LoginParams = {
    autoLogin: boolean;
    password: string;
    type: string;
    username: string;
  };

  type NewProxyIni = {
    /** BandwidthLimit limit the bandwidth
0 means no limit */
    bandwidth_limit?: string;
    custom_domains?: string;
    /** Group specifies which group the is a part of. The server will use
this information to load balance proxies in the same group. If the value
is "", this will not be in a group. By default, this value is "". */
    group?: string;
    /** GroupKey specifies a group key, which should be the same among proxies
of the same group. By default, this value is "". */
    group_key?: string;
    headers?: string;
    /** HealthCheckAddr specifies the address to connect to if the health check
type is "tcp". */
    healthCheckAddr?: string;
    /** HealthCheckIntervalS specifies the time in seconds between health
checks. By default, this value is 10. */
    health_check_interval_s?: string;
    /** HealthCheckMaxFailed specifies the number of allowed failures before the
is stopped. By default, this value is 1. */
    health_check_max_failed?: string;
    /** HealthCheckTimeoutS specifies the number of seconds to wait for a health
check attempt to connect. If the timeout is reached, this counts as a
health check failure. By default, this value is 3. */
    health_check_timeout_s?: string;
    /** HealthCheckType specifies what protocol to use for health checking.
Valid values include "tcp", "http", and "". If this value is "", health
checking will not be performed. By default, this value is "".

If the type is "tcp", a connection will be attempted to the target
server. If a connection cannot be established, the health check fails.

If the type is "http", a GET request will be made to the endpoint
specified by HealthCheckURL. If the response is not a 200, the health
check fails. */
    health_check_type?: string;
    /** HealthCheckURL specifies the address to send health checks to if the
health check type is "http". */
    health_check_url?: string;
    host_header_rewrite?: string;
    http_pwd?: string;
    http_user?: string;
    /** LocalIP specifies the IP address or host name to to. */
    local_ip?: string;
    /** LocalPort specifies the port to to. */
    local_port?: string;
    locations?: string;
    /** meta info for each proxy */
    metas?: string;
    multiplexer?: string;
    /** ProxyName is the name of this */
    name?: string;
    /** Plugin specifies what plugin should be used for ng. If this value
is set, the LocalIp and LocalPort values will be ignored. By default,
this value is "". */
    plugin?: string;
    /** PluginParams specify parameters to be passed to the plugin, if one is
being used. By default, this value is an empty map. */
    pluginParams?: string;
    /** ProxyProtocolVersion specifies which protocol version to use. Valid
values include "v1", "v2", and "". If the value is "", a protocol
version will be automatically selected. By default, this value is "". */
    proxy_protocol_version?: string;
    remote_port?: string;
    role?: string;
    route_by_http_user?: string;
    /** RunId client unique id */
    run_id?: string;
    sk?: string;
    subdomain?: string;
    /** ProxyType specifies the type of this  Valid values include "tcp",
"udp", "http", "https", "stcp", and "xtcp". By default, this value is
"tcp". */
    type?: string;
    /** UseCompression controls whether or not communication with the server
will be compressed. By default, this value is false. */
    use_compression?: string;
    /** UseEncryption controls whether or not communication with the server will
be encrypted. Encryption is done using the tokens supplied in the server
and client configuration. By default, this value is false. */
    use_encryption?: string;
  };

  type serverInfoResp = {
    bind_port?: number;
    bind_udp_port?: number;
    client_counts?: number;
    cur_conns?: number;
    heart_beat_timeout?: number;
    host?: Host;
    host_state?: HostState;
    kcp_bind_port?: number;
    max_pool_count?: number;
    max_ports_per_client?: number;
    proxy_type_count?: Record<string, any>;
    subdomain_host?: string;
    tcpmux_httpconnect_port?: number;
    total_traffic_in?: number;
    total_traffic_out?: number;
    version?: string;
    vhost_http_port?: number;
    vhost_https_port?: number;
  };
}
