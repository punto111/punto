/*
 * @Author: wyf 1017618540@qq.com
 * @Date: 2023-05-14 21:37:00
 * @LastEditors: wyf 1017618540@qq.com
 * @LastEditTime: 2023-05-17 11:22:04
 * @FilePath: \new-app\.umirc.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: './index/index' },
    { path: '/index', component: './index/index' },
    { path: '/user', component: './user/index' },
    { path: '/info', component: './info/index' },
    { path: '/carousel', component: './carousel/index' },

  ],
  fastRefresh: {},
});
