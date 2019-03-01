'use strict';
// const fs = require('fs');
// const path = require('path');
// const jwt = require('jsonwebtoken'); // 引入jsonwebtoken

module.exports = () => {
  return async function userInterceptor(ctx, next) {
    let authToken = ctx.header.authorization; // 获取header里的authorization
    if (authToken) {
      authToken = authToken.substring(7);
      const res = ctx.helper.verifyToken(authToken); // 解密获取的Token
      if (res.id && res.username) {
        // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
        // 此处使用redis进行保存
        const sql_user = await ctx.service.user.infoById(res.id); // 获取保存的token
        const sql_token = sql_user.login_token;
        if (authToken === sql_token) {
          ctx.locals.id = res.id;
          ctx.locals.username = res.username;
          await next();
        } else {
          ctx.body = { ret: 1003, msg: '您的账号已在其他地方登录' };
        }
      } else {
        ctx.body = { ret: 1004, msg: '登录状态已过期' };
      }
    } else {
      ctx.body = { ret: 1000, msg: '请登陆后再进行操作' };
    }
  };
};

