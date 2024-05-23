'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        //获取用户表的数据
        let result = await this.app.mysql.get("blog_content",{})
        this.ctx.body=result
    }

    // 获取文章列表
    async getArticleList(){
        let sql = 'select article.id as id, article.title as title, article.introduce as introduce, article.articleContent as articleContent, FROM_UNIXTIME(article.releaseTime,"%Y-%m-%d %H:%i:%s" ) as releaseTime, article.viewCount as viewCount, type.typeName as typeName from article left join type on article.typeId = type.id;'
        const results = await this.app.mysql.query(sql)
        this.ctx.body={
            data:results
        }
    }

    // 通过ID获取文章
    async getArticleById(){
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id

        let sql = 'select article.id as id, article.title as title, article.introduce as introduce, article.articleContent as articleContent, FROM_UNIXTIME(article.releaseTime,"%Y-%m-%d %H:%i:%s" ) as releaseTime, article.viewCount as viewCount, type.typeName as typeName from article left join type on article.typeId = type.id where article.id='+id

        const result = await this.app.mysql.query(sql)

        this.ctx.body = {data:result}
    }

    // 获取导航栏菜单信息
    async getTypeInfo(){
        const result = await this.app.mysql.select('type')
        this.ctx.body = {data:result}
    }

    // 根据类别ID获得文章列表
    async getListById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        "FROM_UNIXTIME(article.releaseTime,'%Y-%m-%d %H:%i:%s' ) as releaseTime,"+
        'article.viewCount as viewCount ,'+
        'type.typeName as typeName '+
        'FROM article LEFT JOIN type ON article.typeId = type.id '+
        'WHERE typeId='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}

    }

}

module.exports = HomeController