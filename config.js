const getEnv = (property,defaultValue)=>process.env[property] || defaultValue;

module.exports = {
    db:{
        url:getEnv("DB_URL","mongodb://localhost:27017"),
        name:getEnv("DB_NAME","chitragupt"),
        retries:getEnv("DB_ATTEMPTS","3"),
    },
    schema:{
        server:getEnv("SCHEMA_SERVER","/schemas")
    },
    port:getEnv('PORT',12345)
}
