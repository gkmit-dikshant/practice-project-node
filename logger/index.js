const path = require("path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack, reqId }) => {
  return `${timestamp} [${level}]${reqId ? ` [reqId: ${reqId}]` : ""}: ${
    stack || message
  }`;
});

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logger = createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat,
  ),
  transports: [
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
      format: format.json(),
    }),

    // All logs
    new transports.File({
      filename: path.join("logs", "app.log"),
      format: format.json(),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
  );
}

module.exports = logger;
