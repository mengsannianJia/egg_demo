/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1681388477483_8507';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'huiyi1230.',
      // database
      database: 'egg_mysql',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  // 配置的允许所有访问接口访问
  // config.security = {
  //   // egg 安全机制
  //       csrf: {
  //         enable: false
  //       },
  //       domainWhiteList: [ '*' ]
  // };
  // config.cors = {
  //   // 设置那些域名端口可访问，以及那些请求类型
  //   origin: '*',
  //   credentials:true, //允许Cookis跨域（session为Cookis的一种）
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  // };
  // 只允许指定访问接口
  config.security = {
    　　　　csrf: {enable: false},
    　　　　domainWhiteList: [ '*' ]
    　　};
  config.cors = {
    origin: '*',//'http://localhost:3000', //只允许这个域进行访问接口
    credentials: true,   // 开启认证
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  return {
    ...config,
    ...userConfig,
  };
};
