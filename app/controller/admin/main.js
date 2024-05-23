'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
        //首页的文章列表数据
        this.ctx.body='hi api'
    }


    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.passWord
        const sql = "select userName from admin_user Where userName = '"+userName+"' and password = '" + password +"';"
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            let openId = new Date().getTime()
            this.ctx.session.openId={'openId':openId}
            this.ctx.body={'data':'登录成功', 'openId':openId}
        }else{
            this.ctx.body={'data':'登录失败'}
        }
        
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data:resType}
    }

    async addArticle(){
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tempArticle)
        const inserSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            inserSuccess:inserSuccess,
            insertId:insertId
        }
    }

    //修改文章
    async updateArticle(){
        let tmpArticle= this.ctx.request.body

        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body={
            isScuccess:updateSuccess
        }
    }  

    // 获取文章列表
    async getArticleList(){
        let sql = 'select article.id as id, article.title as title, article.introduce as introduce, FROM_UNIXTIME(article.releaseTime,"%Y-%m-%d %H:%i:%s" ) as releaseTime, article.viewCount as viewCount, type.typeName as typeName from article left join type on article.typeId = type.id order by article.id desc;'
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data:result}
    }

    // 删除文章
    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body = {data:res}
    }
}

module.exports = MainController