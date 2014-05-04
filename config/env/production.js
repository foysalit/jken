module.exports = {
    db: {
        name: "",
        password: "",
        username: "",
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        initiate: false
    },
    app: {
        name: "Dashboard - Production"
    }
}