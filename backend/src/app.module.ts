import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PollsModule } from './polls/polls.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (config : ConfigService) =>( {
      type:'postgres',
      host : config.get('DB_HOST'),
      port : +config.get<number>('DB_PORT')!,
      username : config.get('DB_USERNAME'),
      password : config.get('DB_PASSWORD'),
      database : config.get('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  }),
    AuthModule,
    UsersModule,
    PollsModule,
    VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
