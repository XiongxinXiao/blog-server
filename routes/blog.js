const router = require('koa-router')()

const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');

const { SuccessModel, ErrorModel } = require('../model/resModel');

const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog')

// get blog list
router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';

    if (ctx.query.isadmin) {
        //console.log('is admin');
        // admin page
        if (ctx.session.username == null) {
            console.error('is admin, but did not login');
            ctx.body = new ErrorModel('Please login first');
            return
        }
        // only can admin login user own blogs
        author = ctx.session.username;
    }

    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData);
})

// get blog detail
router.get('/detail', async (ctx, next) => {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
});

// post a new blog
router.post('/new', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username;
    const data = await newBlog(ctx.request.body);
    ctx.body = new SuccessModel(data);
});

// update a blog
router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.request.body);
    if (val) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('blog update failed');
    }
});

// delete a blog
router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await deleteBlog(ctx.query.id, author);
    if (val) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('blog delete failed');
    }
});

module.exports = router
