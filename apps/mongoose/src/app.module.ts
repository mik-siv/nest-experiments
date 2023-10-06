import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleFactory } from '../factories/mongoose.factory';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: MongooseModuleFactory,
    }),
    RestaurantModule,
  ],
})
export class AppModule { }
