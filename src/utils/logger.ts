import winston from "winston";
import morgan from "morgan";

const levels: object|any = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    incidentReport: 5,
};
const level: () => string = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const colors: object|any = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
    incidentReport: 'white'
};
winston.addColors(colors);
const format = winston.format.combine(
winston.format.timestamp({ format: 'HH:mm:ss:ms' }), 
winston.format.colorize({ all: true }), 
winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`));
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
];
const logger: any = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
export default logger

const stream = {
    // Use the http severity
    write: (message) => logger.http(message),
};
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
const morganLog: any = morgan(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
":remote-addr :method :url :status :res[content-length] - :response-time ms", 
// Options: in this case, I overwrote the stream and the skip logic.
// See the methods above.
{ stream, skip });

export const morganMiddleware = morganLog;