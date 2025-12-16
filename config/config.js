require("dotenv").config();
module.exports = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_USER || "postgres",
  database: process.env.DB_NAME || "postgres",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "postgres",
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
};
