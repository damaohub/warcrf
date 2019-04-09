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
    // const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')); // 公钥
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
  // 树形结构
  listToTree(data, options) {
    options = options || {};
    const ID_KEY = options.idKey || 'id';
    const PARENT_KEY = options.parentKey || 'parent';
    const CHILDREN_KEY = options.childrenKey || 'children';

    const tree = [],
      childrenOf = {};
    let item,
      id,
      parentId;

    for (let i = 0, length = data.length; i < length; i++) {
      item = data[i];
      id = item[ID_KEY];
      parentId = item[PARENT_KEY] || 0;
      // 每个元素都可能有自己的子元素
      childrenOf[id] = childrenOf[id] || [];
      // 初始化子元素
      item[CHILDREN_KEY] = childrenOf[id];
      if (parentId !== 0) {
        // 初始化子元素
        childrenOf[parentId] = childrenOf[parentId] || [];
        // 子元素进栈
        childrenOf[parentId].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  },
};
