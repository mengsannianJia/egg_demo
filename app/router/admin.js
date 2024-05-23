module.exports = app => {
    const {router, controller} = app
    
    let adminauth = app.middleware.adminauth()                                              // 生成路由守卫
    
    router.get('/admin/index', controller.admin.main.index)
    
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)                      // 检测登录
    
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)          // 前端守卫-中间件
    
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)           // 添加文章
    
    router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle)     // 修改文章
    
    router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList)   // 获取文章列表
}