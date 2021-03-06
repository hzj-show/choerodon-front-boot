import React, { Component } from 'react';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { nomatch } from '../{{ source }}/containers/components/index';
import asyncRouter from '../{{ source }}/containers/components/util/asyncRouter';
import asyncModuleWrapper from '../{{ source }}/containers/components/util/asyncModuleWrapper';
import createAxiosInsByModuleName from '../{{ source }}/containers/components/util/createAxiosInsByModuleName';
import IFRAMEINDEX from '../{{ source }}/containers/components/pro/iframeWrapper';
import { dashboard } from '../{{ source }}/containers/common/index';
import Dashboard from '{{ dashboardPath }}';

const routes = {};
const CHOERODON_FRONT_BOOT_HOME_PAGE = 'home';

function createRoute(path, component, moduleCode) {
  const getAxios = createAxiosInsByModuleName(moduleCode);
  if (!routes[path]) {
    const Cmp = asyncModuleWrapper(component, null, null, moduleCode, getAxios);
    routes[path] = <CacheRoute path={path} component={Cmp} />;
  }
  return routes[path];
}

function createHome(path, component, homePath) {
  if (!routes[path]) {
    const injectObj = dashboard ? Dashboard : {};
    const Cmp = asyncRouter(
      // eslint-disable-next-line no-nested-ternary
      homePath
        ? component
        : dashboard 
          ? () => import('../{{ source }}/containers/components/c7n/dashboard')
          : () => import('../{{ source }}/containers/components/pro/home'),
      null,
      {
        // axios: createAxiosInsByModuleName(CHOERODON_HAP_FRONT_BOOT_HOME_PAGE),
        ...injectObj,
        getAxios: createAxiosInsByModuleName,
      },
    );
    routes[path] = <CacheRoute exact path={path} component={Cmp} />;
  }
  return routes[path];
}

const Home = asyncRouter(
  () => import('../{{ source }}/containers/components/pro/home'),
  null,
  {
    // axios: createAxiosInsByModuleName(CHOERODON_HAP_FRONT_BOOT_HOME_PAGE)
    getAxios: createAxiosInsByModuleName,
  },
);

export default class AutoRouter extends Component {
  render() {
    return (
      <CacheSwitch>
        {'{{ home }}'}
        {'{{ routes }}'}
        <CacheRoute path="/iframe/:name" cacheKey="iframe" component={IFRAMEINDEX} /> 
        <CacheRoute path="*" component={nomatch} />
      </CacheSwitch>
    );
  }
}
