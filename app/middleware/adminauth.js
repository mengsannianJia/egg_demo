module.exports = options => {
    // 简单的路由守卫
    return async function adminauth(ctx, next){
        console.log(ctx.session.openId)
        // 检查登录状态
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:"未登录"}
        }
    }
}