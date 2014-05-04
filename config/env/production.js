module.exports = {
    db: {
        name: process.env.APP_DB_NAME,
        password: APP_DB_PASSWORD,
        username: APP_DB_USERNAME,
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        initiate: false
    },
    app: {
        name: "Dashboard - Production"
    },
    port: process.env.OPENSHIFT_NODEJS_PORT
}