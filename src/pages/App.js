/*
 * @Author: wyf 1017618540@qq.com
 * @Date: 2023-05-16 17:57:53
 * @LastEditors: wyf 1017618540@qq.com
 * @LastEditTime: 2023-05-16 18:20:18
 * @FilePath: \new-app\src\pages\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
  import IndexPage from './index/index';
  import UserPage from './user/index';
  import InfoPage from './info/index';
  function Router ()  {
    return (
      <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="info" element={<InfoPage />} />
        </Routes>
      </BrowserRouter></>
    );
  }
  
  export default Router;