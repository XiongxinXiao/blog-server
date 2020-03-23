const router = require('koa-router')()

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body;
    const data = await login(username, password);
    if (data.username) {
        // update user's information within session
        ctx.session.username = data.username;
        ctx.session.realname = data.realname;

        ctx.body = new SuccessModel({
            realname: ctx.session.realname
        });
        return
    }
    ctx.body = new ErrorModel('Wrong User Name or Password');
})

router.get('/get-name', async function (ctx, next) {
    if (ctx.session.realname == null) {
        ctx.body = new ErrorModel('Did not login yet');
    } else {
        ctx.body = new SuccessModel({
            realname: ctx.session.realname
        });
    }
})

router.get('/logout', async function (ctx, next) {
    if (ctx.session.username == null) {
        ctx.body = new ErrorModel('Did not login yet');
    } else {
        ctx.session = null;
        ctx.body = new SuccessModel();
    }
})
/*router.get('/session-test', async function (ctx, next) {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0;
    }
    ctx.session.viewCount++;

    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount
    }
})*/

module.exports = router
