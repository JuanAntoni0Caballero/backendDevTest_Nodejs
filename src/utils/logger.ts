import winston, { format, Logger } from 'winston'
import { TransformableInfo } from 'logform'

const { combine, timestamp, printf, colorize } = format

const myFormat = printf((info: TransformableInfo) => {
  const { level, message, timestamp } = info
  return `${timestamp ?? ''} [${level}]: ${message}`
})

const logger: Logger = winston.createLogger({
  level: 'info',
  format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
  transports: [new winston.transports.Console()],
})

export default logger
