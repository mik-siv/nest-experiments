import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export function MongooseModuleFactory(configService: ConfigService): MongooseModuleOptions {
    return {
        uri: configService.get<string>('MONGO_URI'),
        dbName: 'sample_restaurants'
    }
}