module.exports = {
    db: {
        name: process.env.APP_DB_NAME,
        password: process.env.APP_DB_PASSWORD,
        username: process.env.APP_DB_USERNAME,
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        initiate: process.env.APP_DB_INSTANTIATE || false
    },
    app: {
        name: "Dashboard - Production"
    },
    port: process.env.OPENSHIFT_NODEJS_PORT,
    ip: process.env.OPENSHIFT_NODEJS_IP
}