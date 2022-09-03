const base = {
    //公共路径
    baseUrl: "http://8.130.101.207:1827",
    //1.3 获取用户信息
    userInfo: "/api/UserInfo/GetUserInfo",
    //1.3-2 修改个人信息
    changeUserInfo: "/api/UserInfo/ChangeUserInfo",
    //用户登录
    userLogin: "/api/LogIn/LogInCheck",
    //10.3 注册用户
    Regist: "/api/LogIn/Regist",
    //10.4 添加用户地址，头像，性别
    upLoadInfo: "/api/LogIn/UpLoadInfo",

    //zqr
    //已发布项目，寻人信息总数
    GetSearchInfoNum: "/api/MainPage/GetSearchInfoNum",
    //已获得线索，线索总数
    GetCluesNum: "/api/MainPage/GetCluesNum",
    //累计已帮助，就是已经找到的信息
    GetFoundInfoNum: "/api/MainPage/GetFoundInfoNum",

    GetAllSearchInfo: "/api/MainPage/GetAllSearchInfo",
    ScreenSearchInfo: "/api/MainPage/ScreenSearchInfo",
    //该地址码处的寻人信息
    GetSearchInfoPos: "/api/MainPage/GetSearchInfoPos",

    //csy
    //4.1.1 获取志愿活动
    //volAct: "/api/volAct",
    volAct: "/api/Vol/ShowVolActivityList",
    //4.1.2 搜索志愿活动
    searchAct: "/api/Vol/SearchVolActivity",
    //4.1.3 获取志愿活动详细信息
    //volActInfo: "/api/volActInfo",
    volActInfo: "/api/Vol/ShowSingleVolActivity",
    //4.1.4 报名&取消报名志愿活动
    volSignUp: "/api/Vol/SignupOrCancelVolActivity",
    //判断报名状态
    applyState: "/api/Vol/IfApplyActivity",
    //4.2.1 获取志愿机构
    //volInst: "/api/volInst",
    volInst: "/api/Vol/ShowAllVolInstitution",
    //4.2.2 搜索志愿机构
    searchInst: "/api/Vol/SearchVolInst",
    //4.2.3 获取志愿机构详细信息
    //volInstInfo: "/api/volInstInfo",
    volInstInfo: "/api/Vol/ShowSingleVolInstitution",
    //4.3.1 获取志愿时长排在前10的志愿者信息
    volRank: "/api/Vol/ShowTenVolunteer",

    //yfh
    //10.1 登录验证
    loginCheck: "/api/LogIn/LogInCheck",
    //7.1 展示寻人资讯卡片
    newsCard: "/api/News/GetAllNews",
    //7.2 展示寻人资讯详情
    newsInfo: "/api/News/GetNewsDetail",
    //7.3 搜索寻人资讯
    searchNews: "/api/News/SearchNews",
    //8.1 展示相关部门信息卡片
    departmentCard: "/api/RelatedDp/GetRelatedDps",
    //8.2 展示相关部门详情
    departmentDetail: "/api/RelatedDp/GetDPDetail",


    //gjj
    //获取寻人详情页
    getMissingpersonInfoUrl: "/api/SearchInfo/GetSearchInfo",
    //发布线索
    upClueUrl: "/api/UserOperation/AddSearchPeopleClue",
    //发布线索举报
    upClueReportUrl: "/api/UserOperation/AddSearchClueReport",
    //寻人信息举报
    upMisReportUrl: "/api/UserOperation/AddSearchInfoReport",
    //录入寻人信息
    upMissingpersonUrl: "/api/UserOperation/AddSearchPeopleInfo",
    addPictureUrl: "/api/UserOperation/AddSearchInfoPic",
    //关注寻人信息
    followMisUrl: "/api/User/UserFocus",


    //公共路径
    //baseUrlh: "http://8.130.101.207:5927",
    //1.1 发布资讯
    releaseNews: "/api/Administrator/ReleaseNews",
    //1.1-1 上传资讯图片
    addNewsCover: "/api/Administrator/AddNewsCover",
    //1.1-2管理员发布志愿活动
    releaseVolActivity: "/api/Administrator/ReleaseVolActivity",
    //发布志愿活动图片
    addVolActivityPic: "/api/Administrator/AddVolActivityPic",
    //1.1-3返回所有志愿机构id和名称
    getAllVolInst: "/api/Administrator/GetAllVolInst",
    //baseUrl0: "http://8.130.101.207:5927",
    //baseUrl1: "http://8.130.101.207:10105",
    //1.3 获取用户信息
    userInfo: "/api/UserInfo/GetUserInfo",
    //1.3-2 修改个人信息
    changeUserInfo: "/api/UserInfo/ChangeUserInfo",
    //上传头像
    uploadAvator: "/api/UserInfo/upLoadUserHead",
    //2.1 展示用户发布的所有寻人信息
    getAllSearchInfoPublished: "/api/UserOperation/GetAllSearchInfoPublished",
    //2.2 展示用户发布的所有寻人线索
    getAllCLuesPublished: "/api/UserOperation/GetAllCLuesPublished",
    //2.3 展示用户关注的所有寻人信息
    getFollowInfo: "/api/UserOperation/GetFollowInfo",
    //3.1 展示志愿者跟进的所有寻人信息
    getFollowUpInfo: "/api/Vol/GetFollowUpInfo",
    //3.2 展示志愿者报名的所有志愿活动
    getVolApplyAct: '/api/Vol/GetVolAct',
    //用户删除自己发布的寻人信息
    userDeleteInfo: "/api/User/UserDeleteInfo",
    //用户删除自己发布的寻人线索
    userDeleteClue: "/api/User/UserDeleteClue",

    //1.4 用户管理
    allNorUser: "/api/Administrator/GetAllNorUser",
    //1.4.1 封禁用户
    banUser: "/api/Administrator/BanUser",
    //1.4.2 删除用户
    deleteUser: "/api/Administrator/DeleteUser",
    //1.4.3 搜索
    userByName: "/api/Administrator/GetUserByName",
    //1.5 志愿者管理
    allVol: "/api/Administrator/GetAllVol",
    //1.6 资讯管理
    allNews: "/api/Administrator/GetAllNews",
    //1.6.1 删除资讯
    deleteNews: "/api/Administrator/DeleteNews",
    //1.7.1 获得审核数量
    volApplyCount: "/api/Administrator/GetVolApplyCount",
    //1.7.2 获得需要审核的志愿者信息
    volApplyReviewed: "/api/Administrator/GetVolApplyReviewed",
    //1.7.3 通过志愿者申请
    passVolApply: "/api/Administrator/PassVolApply",
    //1.7.4 拒绝志愿者申请
    denyVolApply: "/api/Administrator/DenyVolApply",
    //1.8.1 获得信息举报数量
    infoRepoCount: "/api/Administrator/GetInfoRepoCount",
    //1.8.2 获得线索举报数量
    clueRepoCount: "/api/Administrator/GetClueRepoCount",
    //1.8.3 获得信息举报信息
    infoRepoReviewed: "/api/Administrator/GetInfoRepoReviewed",
    //1.8.4 获得线索举报信息
    clueRepoReviewed: "/api/Administrator/GetClueRepoReviewed",
    //1.8.5 通过举报
    passInfoRepo: "/api/Administrator/PassInfoRepo",
    //1.8.6 拒绝举报
    denyInfoRepo: "/api/Administrator/DenyInfoRepo",
    //1.8.7 通过举报
    passClueRepo: "/api/Administrator/PassClueRepo",
    //1.8.8 拒绝举报
    denyClueRepo: "/api/Administrator/DenyClueRepo",

    //2.4 用户申请成为志愿者
    //userApplyVolunteer: "/api/LogIn/UserApplyVolunteer",
    userApplyVolunteer: "/api/Vol/UserApplyVolunteer",
    //2.5 判断用户是否有正在审核中
    // isReviewApply: "/api/LogIn/IsReviewApply",
    isReviewApply: "/api/Vol/IsReviewApply",

    //1.1 发布资讯
    releaseNews: "/api/Administrator/ReleaseNews",
    //1.1-1 上传资讯图片
    addNewsCover: "/api/Administrator/AddNewsCover",
    //1.1-2管理员发布志愿活动
    releaseVolActivity: "/api/Administrator/ReleaseVolActivity",
    //1.1-3返回所有志愿机构id和名称
    getAllVolInst: "/api/Administrator/GetAllVolInst",
    //1.3 获取用户信息
    userInfo: "/api/UserInfo/GetUserInfo",
    //1.3-2 修改个人信息
    changeUserInfo: "/api/UserInfo/ChangeUserInfo",
    //上传头像
    uploadAvator: "/api/UserInfo/upLoadUserHead",
    //2.1 展示用户发布的所有寻人线索
    getAllCLuesPublished: "/api/UserOperation/GetAllCLuesPublished",
    //3.2 展示志愿者报名的所有志愿活动
    getVolAct: '/api/Vol/GetVolAct',
}

export default base;