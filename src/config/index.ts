export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MYSQL_URL:
    process.env.MYSQL_URL || "mysql://root:root@localhost:3306/javaphc",
  GOTENBERG_ENDPOINT: process.env.GOTENBERG_ENDPOINT || "http://localhost:3000",
});
