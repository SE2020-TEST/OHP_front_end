// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/',
              component: '../layouts/BasicLayout',
              Routes: ['src/pages/Authorized'],
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/',
                  redirect: '/welcome',
                },
                {
                  path: '/welcome',
                  name: 'welcome',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: '/manage',
                  name: '管理',
                  icon: 'crown',
                  //component: './Admin',
                  authority: ['admin'],
                  routes: [
                    {
                      path: '/manage/sub-page',
                      name: 'sub-page',
                      icon: 'smile',
                      component: './Welcome',
                      authority: ['admin'],
                    },
                    {
                      path: '/manage',
                      redirect: '/manage/courses',
                    },
                    {
                      name: '课程列表',
                      icon: 'table',
                      path: '/manage/courses',
                      component: './manage/ManageCourseList',
                    },
                  ],
                },
                {
                  name: 'list.table-list',
                  icon: 'table',
                  path: '/list',
                  component: './ListTableList',
                },
                {
                  path: '/account',
                  name: '个人',
                  icon: 'user',
                  routes: [
                    {
                      path: '/account/center',
                      name: '个人中心',
                      icon: 'smile',
                      component: './account/AccountCenter',
                    },
                    {
                      path: '/account/settings',
                      name: '个人设置',
                      icon: 'smile',
                      component: './account/AccountSettings',
                    },
                  ],
                },
                {
                  path: '/course',
                  name: '课程',
                  icon: 'UnorderedListOutlined',
                  routes: [
                    {
                      path: '/course',
                      redirect: '/course/list',
                    },
                    {
                      name: '列表',
                      icon: 'smile',
                      path: '/course/list',
                      component: './course/CourseList',
                      hideInMenu: true,
                    },
                    {
                      name: '详情',
                      icon: 'smile',
                      path: '/course/info/:id',
                      component: './course/CourseInfo',
                      hideInMenu: true,
                    },
                    {
                      name: '课程中心',
                      icon: 'smile',
                      path: '/course/center',
                      component: './course/CourseCenter',
                      hideInMenu: true,
                    },
                    {
                      // path:,
                    },
                  ],
                },
                {
                  name: '日历',
                  icon: 'CalendarOutlined',
                  path: '/calendar',
                  component: './CalendarView',
                },
                {
                  name: '管理课程中心',
                  icon: 'CalendarOutlined',
                  path: '/manageCourseCenter',
                  component: './manage/ManageCourseCenter',
                },
                {
                  component: './404',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
