'use strict';
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken
const cert = 'miyao';
module.exports = {
  // 生成token
  loginToken(data, expires = 7200) {
    const exp = expires;
    const token = jwt.sign({ data }, cert, { expiresIn: exp });
    return token;
  },
  // 解密，验证
  verifyToken(token) {
    // const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')); // 公钥，看后面生成方法
    let res = '';
    try {
      const result = jwt.verify(token, cert) || {};
      const { exp } = result,
        current = Math.floor(Date.now() / 1000);
      if (current <= exp) res = result.data || {};
    } catch (e) {
      console.log(e);
    }
    return res;
  },
};
