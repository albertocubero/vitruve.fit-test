import { createLogger, format, transports } from 'winston';

const customFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.printf(({ timestamp, level, message, ...metadata }) => {
    let logMessage = `${timestamp} [${level}]: ${message} `;
    if (metadata && Object.keys(metadata).length) {
      logMessage += JSON.stringify(metadata);
    }
    return logMessage.trim();
  })
);

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: customFormat,
    }),
    new transports.File({
      filename: 'combined.log',
      format: customFormat,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
} else {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), customFormat),
    })
  );
}

export default logger;
