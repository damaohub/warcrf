'use strict';

const obj = { equip_name: 'test2',
  equip_location: 'tou',
  equip_type: 'suo',
  talent_ids: [ '3', '2', '4' ],
  monster_id: '57',
};

function test(params) {
  Object.keys(params).map(key => {

    if (Array.isArray(params[key])) {
      const tmpStr = params[key].join(',');
      params[key] = `,${tmpStr},`;
    }
    return key;
  });
  return params;
}

console.log(test(obj));
// test(obj);
