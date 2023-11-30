const { createLogger, transports, format, level } = require("winston");
//customer logger
// const customerLogger = createLogger({
//     transports: [
//         new transports.File({
//             filename: 'log/eventLog/customer.log',
//             level: 'info',
//             format: format.combine(format.timestamp(), format.json())
//         }),

//     ]
// })

//ErrorLogger
const ErrorLogger = createLogger({
  transports: [
    new transports.File({
      filename: "log/eventLog/ErrorLogger.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
module.exports = {  ErrorLogger };
