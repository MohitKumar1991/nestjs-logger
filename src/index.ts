import { createLogger, LoggerOptions } from 'bunyan';
import * as Logger from 'bunyan';
import { Interceptor, NestInterceptor, ExecutionContext, Module } from '@nestjs/common';
import { LOGGER_TOKEN } from './constants'

namespace NestJsLogger {
    
    export interface IBTLogConfig {
        serviceName?:string,
        bunyanOptions: LoggerOptions,
        src:boolean
    }

    const btLoggerFactory = {
        provide: LOGGER_TOKEN,
        useFactory: (logConfig: IBTLogConfig) => {
          return new BTLogger(logConfig);
        }
    }

    class BTLogger {

        serviceName?:string;
        logger:Logger;
        src:boolean;

        constructor(logConfig:IBTLogConfig){
            this.serviceName = logConfig.serviceName;
            this.src = logConfig.src || true;
            this.logger = createLogger(logConfig.bunyanOptions);
        }

        log(Msg: any) {
            this.logger.debug(Msg);
        }

        error(errMsg: any) {
            this.logger.error(errMsg);
        }
    }

    @Module({
        components:[btLoggerFactory]
    })
    export class BTLoggerModule {}

}
