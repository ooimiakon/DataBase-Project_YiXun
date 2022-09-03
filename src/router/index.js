import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue' //引用Login组件

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import("../views/HomeView.vue")
  // },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/addInfo',
    name: 'addInfo',
    component: () => import('../views/AddInfoView.vue')
  },
  {
    path: '/cover',
    name: 'cover',
    component: () => import('../views/CoverView.vue')
  },
  // {
  //   path: '/report',
  //   name: 'report',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "report" */ '../views/ReportView.vue')
  // },
  {
    path: '/missingpersonInfo',
    name: 'missingpersonInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "report" */ '../views/MissingpersonInfoView.vue')
  },
  {
    path: '/up_missingperson',
    name: 'up_missingperson',
    component: () => import('../views/UpmissingpersonView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import("../views/AboutView.vue")
  // },
  {
    path: '/VolunOver',
    name: '志愿活动概览',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/VolunOverView.vue"),
    //meta: {
    //isUseCache: false, // 默认不缓存
    //keepAlive: true // 是否使用 keep-alive
    //}
  },
  {
    path: '/volunAct',
    name: 'volunAct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/VolunActView.vue")
  },
  {
    path: '/volunInst',
    name: 'volunInst',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/VolunInstView.vue")
  },
  {
    path: '/volunActInfo',
    name: 'volunActInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/VolunActInfoView.vue")
  },
  {
    path: '/volunInstInfo',
    name: 'volunInstInfo',
    component: () => import("../views/VolunInstInfoView.vue")
  },

  // 寻人资讯主界面
  {
    path: "/news",
    name: "news",
    component: () => import("../views/NewsView.vue"),
  },
  // // 寻人资讯主页面跳转到详情页
  // {
  //   path: "/report/about",
  //   name: "/report/about",
  //   component: () => import("../views/AboutReport.vue"),
  // },
  // 寻人资讯主页面跳转到详情页
  {
    path: "/newsInfo",
    name: "newsInfo",
    component: () => import("../views/NewsInfoView.vue"),
  },
  //相关部门信息界面
  {
    path: "/department",
    name: "department",
    //重定向，默认显示第一个页面
    // redirect: "/department/1-1",
    component: () => import("../views/DepartmentView.vue"),

  },
  {
    path: "/department/detail",
    name: "departmentdetail",
    component: () => import("../views/DepartmentDetailView.vue"),
  },
  //管理员后台//
  {
    path: '/backstage',
    name: 'backstage',
    component: () => import('../views/BackstageView.vue'),
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('../views/Backstage/UserManagement.vue')
      },
      {
        path: 'volManagement',
        name: 'volManagement',
        component: () => import('../views/Backstage/VolManagement.vue')
      },
      {
        path: 'releasedNews',
        name: 'releasedNews',
        component: () => import('../views/Backstage/ReleasedNews.vue')
      },
      {
        path: 'releaseActivity',
        name: 'releaseActivity',
        component: () => import('../views/Backstage/ReleaseActivity.vue')
      },
      {
        path: 'volReview',
        name: 'volReview',
        component: () => import('../views/Backstage/VolReview.vue')
      },
      {
        path: 'infoReports',
        name: 'infoReports',
        component: () => import('../views/Backstage/InfoReports.vue')
      },
      {
        path: 'clueReports',
        name: 'clueReports',
        component: () => import('../views/Backstage/ClueReports.vue')
      },
      {
        path: "InformationRelease",
        component: () => import('../views/Backstage/InformationRelease.vue')
      },
      {
        path: "PersonalInfo",
        component: () => import('../views/Backstage/PersonalInfo.vue')
      },
    ]
  },
  // {
  //   path: '/mainmenu',
  //   name: 'mainmenu',
  //   component: () => import('../views/MainmenuView.vue')
  // },
  //普通用户后台//
  {
    path: '/UserBackstage',
    name: 'UserBackstage',
    component: () => import('../views/UserBackStageView.vue'),
    children: [
      {
        path: "PersonalInfo",
        component: () => import('../views/Backstage/PersonalInfo.vue')
      },
      {
        path: "UserHomePage",
        component: () => import('../views/Backstage/UserHomePage.vue')
      },
      {
        path: "ApplyVol",
        component: () => import('../views/Backstage/ApplyVol.vue')
      }
    ]
  },
  //志愿者后台//
  {
    path: '/VolBackstage',
    name: 'VolBackstage',
    component: () => import('../views/VolBackStageView.vue'),
    children: [
      {
        path: "PersonalInfo",
        component: () => import('../views/Backstage/PersonalInfo.vue')
      },
      {
        path: "Published",
        component: () => import('../views/Backstage/UserHomePage.vue')
      },
      {
        path: "VolHomePage",
        component: () => import('../views/Backstage/VolHomePage.vue'),
      }
    ]
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from, next) => {

  window.scrollTo(0, 0);

})

router.beforeEach((to,from,next)=>{
  console.log(to.path)
//如果用户不访问后台页面，直接放行
  if(to.path === "/Userbackstage")
  {
    const userid =JSON.parse(sessionStorage.getItem("userid"))
    console.log(userid)
    if(!userid)
        return next("/");
  }
  return next();
  next();//有token，直接放行
})

export default router
