// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
// const permissionRouter = {
//   path: "/permission",
//   meta: {
//     title: "权限管理",
//     icon: "ep:lollipop",
//     rank: 10
//   },
//   children: [
//     {
//       path: "/permission/page/index",
//       name: "PermissionPage",
//       meta: {
//         title: "页面权限",
//         roles: ["admin", "common"]
//       }
//     },
//     {
//       path: "/permission/button/index",
//       name: "PermissionButton",
//       meta: {
//         title: "按钮权限",
//         roles: ["admin", "common"],
//         auths: [
//           "permission:btn:add",
//           "permission:btn:edit",
//           "permission:btn:delete"
//         ]
//       }
//     }
//   ]
// };

// const systemMonitorRouter = {
//   path: "/monitor",
//   meta: {
//     icon: "ep:monitor",
//     title: "系统监控",
//     rank: 14
//   },
//   children: [
//     {
//       path: "/monitor/online-user",
//       component: "monitor/online/index",
//       name: "OnlineUser",
//       meta: {
//         icon: "ri:user-voice-line",
//         title: "在线用户"
//       }
//     },
//     {
//       path: "/monitor/login-logs",
//       component: "monitor/logs/login/index",
//       name: "LoginLog",
//       meta: {
//         icon: "ri:window-line",
//         title: "登录日志"
//       }
//     },
//     {
//       path: "/monitor/operation-logs",
//       component: "monitor/logs/operation/index",
//       name: "OperationLog",
//       meta: {
//         icon: "ri:history-fill",
//         title: "操作日志"
//       }
//     },
//     {
//       path: "/monitor/system-logs",
//       component: "monitor/logs/system/index",
//       name: "SystemLog",
//       meta: {
//         icon: "ri:file-search-line",
//         title: "系统日志"
//       }
//     }
//   ]
// };
//
// const systemManagementRouter = {
//   path: "/system",
//   meta: {
//     icon: "ri:settings-3-line",
//     title: "系统管理",
//     rank: 13
//   },
//   children: [
//     {
//       path: "/system/user/index",
//       name: "SystemUser",
//       meta: {
//         icon: "ri:admin-line",
//         title: "用户管理"
//       }
//     },
//     {
//       path: "/system/role/index",
//       name: "SystemRole",
//       meta: {
//         icon: "ri:admin-fill",
//         title: "角色管理"
//       }
//     },
//     {
//       path: "/system/menu/index",
//       name: "SystemMenu",
//       meta: {
//         icon: "ep:menu",
//         title: "菜单管理"
//       }
//     },
//     {
//       path: "/system/dept/index",
//       name: "SystemDept",
//       meta: {
//         icon: "ri:git-branch-line",
//         title: "部门管理"
//       }
//     }
//   ]
// };

const fakeRouteData = [
  {
    path: "/iframe",
    name: "PureIframe",
    redirect: "",
    meta: {
      title: "外部页面",
      icon: "ri:links-fill",
      showLink: true,
      rank: 7,
      extraIcon: "",
      showParent: false,
      roles: null,
      auths: null,
      keepAlive: false,
      frameSrc: "",
      frameLoading: false,
      hiddenTag: false,
      dynamicLevel: 0,
      activePath: ""
    },
    children: [
      {
        path: "/iframe/external",
        name: "PureIframeExternal",
        redirect: "",
        meta: {
          title: "文档外链",
          icon: "",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        },
        children: [
          {
            path: "/external",
            name: "https://pure-admin.github.io/pure-admin-doc",
            redirect: "",
            meta: {
              title: "vue-pure-admin",
              icon: "",
              showLink: true,
              rank: 99,
              extraIcon: "",
              showParent: false,
              roles: null,
              auths: null,
              keepAlive: false,
              frameSrc: "",
              frameLoading: false,
              hiddenTag: false,
              dynamicLevel: 0,
              activePath: ""
            }
          },
          {
            path: "/pureUtilsLink",
            name: "https://pure-admin-utils.netlify.app/",
            redirect: "",
            meta: {
              title: "pure-admin-utils",
              icon: "",
              showLink: true,
              rank: 99,
              extraIcon: "",
              showParent: false,
              roles: null,
              auths: null,
              keepAlive: false,
              frameSrc: "",
              frameLoading: false,
              hiddenTag: false,
              dynamicLevel: 0,
              activePath: ""
            }
          }
        ]
      },
      {
        path: "/iframe/embedded",
        name: "PureIframeEmbedded",
        redirect: "",
        meta: {
          title: "文档内嵌",
          icon: "",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: true,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        },
        children: [
          {
            path: "/iframe/ep",
            name: "FrameEp",
            redirect: "",
            meta: {
              title: "element-plus",
              icon: "",
              showLink: true,
              rank: 99,
              extraIcon: "",
              showParent: false,
              roles: null,
              auths: null,
              keepAlive: false,
              frameSrc: "https://element-plus.org/zh-CN/",
              frameLoading: true,
              hiddenTag: false,
              dynamicLevel: 0,
              activePath: ""
            }
          },
          {
            path: "/iframe/vue3",
            name: "FrameVue",
            redirect: "",
            meta: {
              title: "vue3",
              icon: "",
              showLink: true,
              rank: 99,
              extraIcon: "",
              showParent: false,
              roles: null,
              auths: null,
              keepAlive: false,
              frameSrc: "https://cn.vuejs.org/",
              frameLoading: true,
              hiddenTag: false,
              dynamicLevel: 0,
              activePath: ""
            }
          }
        ]
      }
    ]
  },
  {
    path: "/system",
    name: "System",
    redirect: "",
    meta: {
      title: "系统管理",
      icon: "ri:settings-3-line",
      showLink: true,
      rank: 10,
      extraIcon: "",
      showParent: false,
      roles: null,
      auths: null,
      keepAlive: false,
      frameSrc: "",
      frameLoading: false,
      hiddenTag: false,
      dynamicLevel: 0,
      activePath: ""
    },
    children: [
      {
        path: "/system/user/index",
        name: "SystemUser",
        redirect: "",
        meta: {
          title: "用户管理",
          icon: "ri:admin-line",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      },
      {
        path: "/system/role/index",
        name: "SystemRole",
        redirect: "",
        meta: {
          title: "角色管理",
          icon: "ri:admin-fill",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      },
      {
        path: "/system/menu/index",
        name: "SystemMenu",
        redirect: "",
        meta: {
          title: "菜单管理",
          icon: "ep:menu",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      },
      {
        path: "/system/dept/index",
        name: "SystemDept",
        redirect: "",
        meta: {
          title: "部门管理",
          icon: "ri:git-branch-line",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      }
    ]
  },
  {
    path: "/monitor",
    name: "PureMonitor",
    redirect: "",
    meta: {
      title: "系统监控",
      icon: "ep:monitor",
      showLink: true,
      rank: 11,
      extraIcon: "",
      showParent: false,
      roles: null,
      auths: null,
      keepAlive: false,
      frameSrc: "",
      frameLoading: false,
      hiddenTag: false,
      dynamicLevel: 0,
      activePath: ""
    },
    children: [
      {
        path: "/monitor/online-user",
        name: "OnlineUser",
        redirect: "",
        component: "monitor/logs/system/index",
        meta: {
          title: "在线用户",
          icon: "ri:user-voice-line",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      },
      {
        path: "/monitor/login-logs",
        name: "LoginLog",
        redirect: "",
        component: "monitor/logs/login/index",
        meta: {
          title: "登录日志",
          icon: "ri:window-line",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      },
      {
        path: "/monitor/operation-logs",
        name: "OperationLog",
        redirect: "",
        component: "monitor/logs/operation/index",
        meta: {
          title: "操作日志",
          icon: "ri:history-fill",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      },
      {
        path: "/monitor/system-logs",
        name: "SystemLog",
        redirect: "",
        component: "monitor/logs/system/index",
        meta: {
          title: "系统日志",
          icon: "ri:file-search-line",
          showLink: true,
          rank: 99,
          extraIcon: "",
          showParent: false,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      }
    ]
  },
  {
    path: "/user",
    name: "SelfUserCenter",
    redirect: "",
    meta: {
      title: "个人中心",
      icon: "ri:user-line",
      showLink: true,
      rank: 99,
      extraIcon: "",
      showParent: false,
      roles: null,
      auths: null,
      keepAlive: false,
      frameSrc: "",
      frameLoading: false,
      hiddenTag: false,
      dynamicLevel: 0,
      activePath: ""
    },
    children: [
      {
        path: "/user/info/index",
        name: "SelfUserInfo",
        redirect: "",
        meta: {
          title: "个人信息",
          icon: "ri:user-follow-line",
          showLink: true,
          rank: 999,
          extraIcon: "",
          showParent: true,
          roles: null,
          auths: null,
          keepAlive: false,
          frameSrc: "",
          frameLoading: false,
          hiddenTag: false,
          dynamicLevel: 0,
          activePath: ""
        }
      }
    ]
  }
];

export default defineFakeRoute([
  {
    url: "/api/v2/system/route",
    method: "get",
    response: () => {
      return {
        code: 200,
        msg: "success",
        data: fakeRouteData
      };
    }
  }
]);
