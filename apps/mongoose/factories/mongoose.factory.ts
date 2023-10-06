import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export function MongooseModuleFactory(configService: ConfigService): MongooseModuleOptions {
    process.stdout.write(`MONGO_URI: ${configService.get<string>('MONGO_URI')}\n`);
    return {
        uri: configService.get<string>('MONGO_URI')
    }
}