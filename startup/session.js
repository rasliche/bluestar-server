const config = require('config')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport')

const store = new MongoDBStore({
    uri: config.get('db'),
    collection: 'sessions',
    // expires: '2h'
})

module.exports = function (app) {
    app.use(session({ 
        secret: config.get('cookie_secret'),
        resave: false,
        saveUninitialized: false,
        store: store,
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}
