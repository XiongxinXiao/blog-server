const xss = require('xss');
const { exec, escape } = require('../db/mysql');

const getList = async (author, keyword) => {
    // 1=1 for the case that if query parameters are all null, 'where' would cause error
    let sql = `select * from blogs where 1=1 `; // remember leave a space after each segment of sql directive
    
    if (author) {
        sql += `and author='${author}' `;
    }

    if (keyword) {
        sql += `and title like '%${keyword}%' or author like '%${keyword}%' or content like '%${keyword}%'`;
    }
    sql += `order by createtime desc;`;

    return await exec(sql);
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`;
    const rows = await exec(sql);
    return rows[0];
}

const newBlog = async (blogData = {}) => {
    // blogData is a blog object, contains title, content properties
    const title = escape(xss(blogData.title));
    const content = escape(xss(blogData.content));
    const img = escape(xss(blogData.img));
    const author = blogData.author;
    const createTime = blogData.createtime;

    const sql = `
        insert into blogs (title, content, img, createTime, author) 
        values (${title}, ${content}, ${img}, ${createTime}, '${author}')`;
    
    const insertData = await exec(sql);
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id is blog id
    // blogData is a blog object, contains title, content properties
    const title = escape(xss(blogData.title));
    const content = escape(xss(blogData.content));
    const img = escape(xss(blogData.img));
    const createtime = blogData.createtime;
    const sql =`
        update blogs set title=${title}, content=${content}, img=${img},
        createtime=${createtime} where id=${id}
    `
    const updateData = await exec(sql);
    if (updateData.affectedRows > 0) {
        return true;
    }
    return false;
}

const deleteBlog = async (id, author) => {
    //delete a blog by given id
    const sql = `
        delete from blogs where id='${id}' and author='${author}';
    `

    const delteData = await exec(sql);
    if (delteData.affectedRows > 0) {
        return true;
    }
    return false;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}