//
import axios from "../utils/request"
import path from "../api/path"

const api = {
    // //1.3 获取用户信息
    // getUserInfo(id) {
    //     return axios.get(path.baseUrl + path.userInfo, { params: { user_id: id } })
    // },
    // //1.3-2 修改个人信息
    // changeUserInfo(user_id, user_name, user_phone, user_email) {
    //     return axios.put(path.baseUrl + path.changeUserInfo, { user_id: user_id, user_name: user_name, user_phone: user_phone, user_email: user_email, user_province: "云南省", user_city: "昆明市", user_area: "五华区", user_address: "一二一大街" })
    // },
    //用户登录
    login(phonenum, password) {
        return axios.post(path.baseUrl + path.userLogin, { "user_phone": phonenum, "user_password": password })
    },
    //10.3 注册用户
    Regist(user_name, user_phone, user_email, user_password) {
        return axios.post(path.baseUrl + path.Regist, { user_name: user_name, user_phone: user_phone, user_email: user_email, user_password: user_password })
    },
    //10.4 添加用户地址，头像，性别
    upLoadInfo(user_id, user_gender, user_province, user_city, user_area, user_address, user_head) {
        return axios.put(path.baseUrl + path.upLoadInfo, { user_id: user_id, user_gender: user_gender, user_province: user_province, user_city: user_city, user_area: user_area, user_address: user_address, user_head: user_head })
    },


    GetSearchInfoNum() {
        return axios.get(path.baseUrl + path.GetSearchInfoNum)
    },
    //已获得线索，线索总数
    GetCluesNum() {
        return axios.get(path.baseUrl + path.GetCluesNum)
    },
    //累计已帮助，就是已经找到的信息
    GetFoundInfoNum() {
        return axios.get(path.baseUrl + path.GetFoundInfoNum)
    },
    // 首页展示信息
    // ScreenSearchInfo(lost){
    //     return axios.get(path.baseUrl + path.ScreenSearchInfo,{params:{}})
    // }
    //初始展示全部寻人信息
    GetAllSearchInfo(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.GetAllSearchInfo, { params: { pageNum: pageNum, pageSize: pageSize } })
    },
    ScreenSearchInfo(search_type_1,
        search_type_2,
        search_type_3,
        search_type_4,
        search_type_5,
        search_type_6,
        gender,
        lostdate,
        birthday,
        province,
        city,
        area,
        height_low,
        height_high,
        pageSize,
        pageNum,
        search) {
        return axios
            .post(path.baseUrl + path.ScreenSearchInfo,
                {
                    search_type_1: search_type_1,
                    search_type_2: search_type_2,
                    search_type_3: search_type_3,
                    search_type_4: search_type_4,
                    search_type_5: search_type_5,
                    search_type_6: search_type_6,
                    gender: gender,
                    lostdate: lostdate,
                    birthday: birthday,
                    province: province,
                    city: city,
                    area: area,
                    height_low: height_low,
                    height_high: height_high,
                    pageSize: pageSize,
                    pageNum: pageNum,
                    search: search
                })
    },
    GetSearchInfoPos(infoAd) {
        return axios.get(path.baseUrl + path.GetSearchInfoPos, { params: { infoAd: infoAd } })
    },


    //4.1.1 获取志愿活动列表
    getVolAct(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.volAct, { params: { pageNum: pageNum, pageSize: pageSize } })
    },
    //4.1.2 搜索志愿活动
    getActSearch(act_name, pageNum, pageSize) {
        return axios.post(path.baseUrl + path.searchAct, { "search": act_name, "pageNum": pageNum, "pageSize": pageSize })
    },

    //4.1.3 获取志愿活动详细信息
    getVolActInfo(act_id) {
        //return axios.get(path.volActInfo, { params: { volAct_id: actID } })
        return axios.get(path.baseUrl + path.volActInfo, { params: { VolActId: act_id } })
    },
    //4.1.4 报名&取消报名志愿活动
    getSignUp(vol_id, act_id) {
        return axios.get(path.baseUrl + path.volSignUp, { params: { VolId: vol_id, VolActId: act_id } })
    },
    //获取报名状态
    getApplyState(vol_id, act_id) {
        return axios.get(path.baseUrl + path.applyState, { params: { vol_id: vol_id, volAct_id: act_id } })
    },

    //4.2.1 获取志愿机构列表
    getVolInst(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.volInst, { params: { pageNum: pageNum, pageSize: pageSize } })
    },
    //4.2.2 搜索志愿机构
    getInstSearch(inst_name, pageNum, pageSize) {
        return axios.post(path.baseUrl + path.searchInst, { "search": inst_name, "pageNum": pageNum, "pageSize": pageSize })
    },

    //4.2.3 获取志愿机构详细信息
    getVolInstInfo(inst_id) {
        return axios.get(path.baseUrl + path.volInstInfo, { params: { VolInstId: inst_id } })
    },
    //4.3 获取志愿时长排在前10的志愿者信息
    getVolRank() {
        return axios.get(path.baseUrl + path.volRank)
    },


    //yfh
    //10.1 登录发送验证信息
    loginCheck(phonenumber, password) {
        return axios.post(path.baseUrl + path.loginCheck, { user_phone: phonenumber, user_password: password })
    },
    //7.1 展示寻人资讯卡片
    newsCard(news_type, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.newsCard, { params: { news_type: news_type, pageNum: pageNum, pageSize: pageSize } })
    },
    //7.2 展示寻人资讯详情页
    newsInfo(newsid) {
        return axios.get(path.baseUrl + path.newsInfo, { params: { news_id: newsid } })
    },
    //7.3 搜索资讯
    searchNews(search, pageNum, pageSize) {
        return axios.post(path.baseUrl + path.searchNews, { search: search, pageNum: pageNum, pageSize: pageSize })
    },
    //8.1 展示相关部门信息卡片
    departmentCard(province, city) {
        return axios.get(path.baseUrl + path.departmentCard, { params: { province: province, city: city } })
    },
    //8.2 展示相关部门详情
    departmentDetail(dpid) {
        return axios.get(path.baseUrl + path.departmentDetail, { params: { DP_id: dpid } })

    },


    //gjj
    //获取寻人信息详情
    getMissingpersonInfo(id) {
        return axios.get(path.baseUrl + path.getMissingpersonInfoUrl, { params: { search_id: id } })
    },
    //发布线索
    upClue(user_id, searchinfo_id, clue_content) {
        return axios.post(path.baseUrl + path.upClueUrl, {
            user_id: user_id,
            searchinfo_id: searchinfo_id,
            clue_content: clue_content
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    //发布线索举报
    upClueReport(user_id, clue_id, report_content) {
        return axios.post(path.baseUrl + path.upClueReportUrl, {
            user_id: user_id,//发布者ID
            clue_id: clue_id,//线索ID
            report_content: report_content
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    //寻人信息举报
    upMisReport(user_id, searchinfo_id, report_content) {
        return axios.post(path.baseUrl + path.upMisReportUrl, {
            user_id: user_id,//发布者ID
            searchinfo_id: searchinfo_id,//线索ID
            report_content: report_content
        }, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    //处理添加寻人信息操作
    upMissperson(user_id, search_type, sought_people_name, sought_people_gender,
        sought_people_height, sought_people_detail, sought_people_birthday, sought_people_state,
        isreport, searchinfo_lostdate, contact_method, province_id, city_id, area_id, address_detail) {
        return axios.post(path.baseUrl + path.upMissingpersonUrl, {
            user_id: user_id,
            search_type: search_type,
            sought_people_name: sought_people_name,
            sought_people_gender: sought_people_gender,
            sought_people_height: sought_people_height,
            sought_people_detail: sought_people_detail,
            sought_people_birthday: sought_people_birthday,
            sought_people_state: sought_people_state,
            isreport: isreport,
            searchinfo_lostdate: searchinfo_lostdate,
            contact_method: contact_method,
            province_id: province_id,
            city_id: city_id,
            area_id: area_id,
            address_detail: address_detail,
        },
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        )
    },
    addPicture(searchInfo_id, searchInfo_pic) {
        return axios.put(path.baseUrl + path.addPictureUrl, { searchInfo_id: searchInfo_id, searchInfo_pic: searchInfo_pic })
    },
    //关注寻人信息
    followMis(userid, infoid) {
        return axios.get(path.baseUrl + path.followMisUrl, {
            params: {
                userid: userid,
                infoid: infoid
            }
        })
    },


    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


    //1.3 获取用户信息
    getUserInfo(id) {
        return axios.get(path.baseUrl + path.userInfo, { params: { user_id: id } })
    },
    //1.4 用户管理
    getAllNorUser(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.allNorUser, { params: { pagenum: pagenum, pagesize: pagesize } })
    },
    //1.4.1 封禁用户
    banUser(userid) {
        return axios.put(path.baseUrl + path.banUser, null, { params: { userid: userid } })
    },
    //1.4.2 删除用户
    deleteUser(userid) {
        return axios.delete(path.baseUrl + path.deleteUser, { params: { userid: userid } })
    },
    //1.6.1 删除资讯
    deleteNews(newsid) {
        return axios.delete(path.baseUrl + path.deleteNews, { params: { newsid: newsid } })
    },
    //1.4.3 搜索
    getUserByName(word, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.userByName, { params: { word: word, pagenum: pagenum, pagesize: pagesize } })
    },
    //1.5 志愿者管理
    getAllVol(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.allVol, { params: { pagenum: pagenum, pagesize: pagesize } })
    },
    //1.6 资讯管理
    getAllNews(pagenum, pagesize) {
        return axios.get(path.baseUrl + path.allNews, { params: { pagenum: pagenum, pagesize: pagesize } })
    },
    //1.7.1 获得审核数量
    getVolApplyCount(adminId,) {
        return axios.get(path.baseUrl + path.volApplyCount, { params: { adminId: adminId } })
    },
    //1.7.2 获得需要审核的志愿者信息
    getVolApplyReviewed(adminId, pagenum, pagesize, review) {
        return axios.get(path.baseUrl + path.volApplyReviewed, { params: { adminId: adminId, pagenum: pagenum, pagesize: pagesize, review: review } })
    },
    //1.7.3 通过志愿者申请
    passVolApply(volapplyid) {
        return axios.put(path.baseUrl + path.passVolApply, null, { params: { volapplyid: volapplyid } })
    },
    //1.7.4 拒绝志愿者申请
    denyVolApply(volapplyid) {
        return axios.put(path.baseUrl + path.denyVolApply, null, { params: { volapplyid: volapplyid } })
    },
    //1.8.1 获得信息举报数量
    getInfoRepoCount(adminId) {
        return axios.get(path.baseUrl + path.infoRepoCount, { params: { adminId: adminId } })
    },
    //1.8.2 获得线索举报数量
    getClueRepoCount(adminId) {
        return axios.get(path.baseUrl + path.clueRepoCount, { params: { adminId: adminId } })
    },
    //1.8.3 获得信息举报信息
    getInfoRepoReviewed(adminId, pagenum, pagesize, review) {
        return axios.get(path.baseUrl + path.infoRepoReviewed, { params: { adminId: adminId, pagenum: pagenum, pagesize: pagesize, review: review } })
    },
    //1.8.4 获得线索举报信息
    getClueRepoReviewed(adminId, pagenum, pagesize, review) {
        return axios.get(path.baseUrl + path.clueRepoReviewed, { params: { adminId: adminId, pagenum: pagenum, pagesize: pagesize, review: review } })
    },
    //1.8.5 通过举报
    passInfoRepo(infoid) {
        return axios.delete(path.baseUrl + path.passInfoRepo, null, { params: { infoid: infoid } })
    },
    //1.8.6 拒绝举报
    denyInfoRepo(inforepoid) {
        return axios.post(path.baseUrl + path.denyInfoRepo, null, { params: { inforepoid: inforepoid } })
    },
    //1.8.7 通过举报
    passClueRepo(clueid) {
        return axios.put(path.baseUrl + path.passClueRepo, null, { params: { clueId: clueId } })
    },
    //1.8.8 拒绝举报
    denyClueRepo(cluerepoid) {
        return axios.put(path.baseUrl + path.denyClueRepo, null, { params: { cluerepoid: cluerepoid } })
    },

    //2.4 用户申请成为志愿者
    userApplyVolunteer(UserId, Specialty, Background, Career) {
        return axios.post(path.baseUrl + path.userApplyVolunteer, { UserId: UserId, Specialty: Specialty, Background: Background, Career: Career })
    },
    //2.5 判断用户是否有正在审核中
    isReviewApply(user_id) {
        return axios.get(path.baseUrl + path.isReviewApply, { params: { user_id: user_id } })
    },
    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    //————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


    //1.3 获取用户信息
    getUserInfo(id) {
        return axios.get(path.baseUrl + path.userInfo, { params: { user_id: id } })
    },

    //1.1-2管理员发布志愿活动
    releaseVolActivity(act_name, act_content, act_time, need_people, act_province, act_city, act_area, act_address, contact_method, volInst_Id) {
        return axios.post(path.baseUrl + path.releaseVolActivity, {
            act_name: act_name, act_content: act_content, act_time: act_time, need_people: need_people,
            act_province: act_province, act_city: act_city, act_area: act_area, act_address: act_address, contact_method: contact_method, volInst_Id: volInst_Id
        })
    },
    //1.1-3返回所有志愿机构id和名称
    getAllVolInst() {
        return axios.get(path.baseUrl + path.getAllVolInst)
    },
    //1.3-2 修改个人信息
    changeUserInfo(user_id, user_name, user_phone, user_email, user_province, user_city, user_area, user_address) {
        return axios.put(path.baseUrl + path.changeUserInfo, { user_id: user_id, user_name: user_name, user_phone: user_phone, user_email: user_email, user_province: user_province, user_city: user_city, user_area: user_area, user_address: user_address })
    },

    uploadAvator(user_id, user_head) {
        return axios.put(path.baseUrl + path.uploadAvator, { user_id: user_id, user_head: user_head })
    },
    //1.1 发布资讯
    releaseNews(id, news_content, news_title, news_type) {
        return axios.post(path.baseUrl + path.releaseNews, { admin_id: id, news_content: news_content, news_title: news_title, news_type: news_type })
    },
    addNewsCover(news_id, news_cover) {
        return axios.put(path.baseUrl + path.addNewsCover, { news_id: news_id, news_cover: news_cover })

    },
    //2.2 展示用户发布的所有寻人线索
    getAllCLuesPublished(user_id, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getAllCLuesPublished, { params: { user_id: user_id, pageNum: pageNum, pageSize: pageSize } })
    },

    //1.1-2管理员发布志愿活动
    releaseVolActivity(act_name, act_content, act_time, need_people, act_province, act_city, act_area, act_address, contact_method, volInst_Id) {
        return axios.post(path.baseUrl + path.releaseVolActivity, {
            act_name: act_name, act_content: act_content, act_time: act_time, need_people: need_people,
            act_province: act_province, act_city: act_city, act_area: act_area, act_address: act_address, contact_method: contact_method, volInst_Id: volInst_Id
        })
    },
    //发布志愿活动图片
    addVolActivityPic(volAct_id, volAct_pic) {
        return axios.put(path.baseUrl + path.addVolActivityPic, { volAct_id: volAct_id, volAct_pic: volAct_pic })
    },
    //1.1-3返回所有志愿机构id和名称
    getAllVolInst() {
        return axios.get(path.baseUrl + path.getAllVolInst)
    },
    //1.3-2 修改个人信息
    changeUserInfo(user_id, user_name, user_phone, user_email, user_province, user_city, user_area, user_address) {
        return axios.put(path.baseUrl + path.changeUserInfo, { user_id: user_id, user_name: user_name, user_phone: user_phone, user_email: user_email, user_province: user_province, user_city: user_city, user_area: user_area, user_address: user_address })
    },
    //上传头像
    uploadAvator(user_id, user_head) {
        return axios.put(path.baseUrl + path.uploadAvator, { user_id: user_id, user_head: user_head })
    },
    //1.1 发布资讯
    releaseNews(id, news_content, news_title, news_type) {
        return axios.post(path.baseUrl + path.releaseNews, { admin_id: id, news_content: news_content, news_title: news_title, news_type: news_type })
    },
    addNewsCover(news_id, news_cover) {
        return axios.put(path.baseUrl + path.addNewsCover, { news_id: news_id, news_cover: news_cover })

    },
    //2.1 展示用户发布的所有寻人信息
    getAllSearchInfoPublished(user_id, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getAllSearchInfoPublished, { params: { user_id: user_id, pageNum: pageNum, pageSize: pageSize } })
    },
    //2.2 展示用户发布的所有寻人线索
    getAllCLuesPublished(user_id, pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getAllCLuesPublished, { params: { user_id: user_id, pageNum: pageNum, pageSize: pageSize } })
    },
    //2.3 展示用户关注的所有寻人信息
    getFollowInfo(user_id, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.getFollowInfo, { params: { userid: user_id, pagenum: pagenum, pagesize: pagesize } })
    },
    //3.1 展示志愿者跟进的所有寻人信息
    getFollowUpInfo(volid, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.getFollowUpInfo, { params: { volid: volid, pagenum: pagenum, pagesize: pagesize } })
    },
    //3.2 展示志愿者报名的所有志愿活动
    getVolApplyAct(volid, pagenum, pagesize) {
        return axios.get(path.baseUrl + path.getVolApplyAct, { params: { volid: volid, pagenum: pagenum, pagesize: pagesize } })
    },
    //用户删除自己发布的寻人信息
    userDeleteInfo(userid, infoid) {
        return axios.delete(path.baseUrl + path.userDeleteInfo, { params: { userid: userid, infoid: infoid } })
    },
    ////用户删除自己发布的寻人线索
    userDeleteClue(userid, clueid) {
        return axios.delete(path.baseUrl + path.userDeleteClue, { params: { userid: userid, clueid: clueid } })
    }
}

export default api;