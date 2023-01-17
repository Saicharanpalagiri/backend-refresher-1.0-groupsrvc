import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { queues } from './submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';
import { Content } from './submodules/backend-refresher-entities-1.0/src/entities/content-entity';
import { Group } from './submodules/backend-refresher-entities-1.0/src/entities/group.entity';
import { Option } from './submodules/backend-refresher-entities-1.0/src/entities/option.entity';
import { Reaction } from './submodules/backend-refresher-entities-1.0/src/entities/reaction.entity';
import { User } from './submodules/backend-refresher-entities-1.0/src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'mydatabase-instance.cc1kuvxcs7tm.ap-northeast-1.rds.amazonaws.com',
      port: 5432,
      username: 'charan',
      password: 'charan123',
      database: 'backend-socialmedia',
      entities: [User, Content, Group, Option, Reaction],
      synchronize: true,
      logging: true,
    }),
    ClientsModule.register([
      {
        name: 'CONTENT_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ghdswtyl:0tdkAKnW71Ty8Pe3JVvDtd3qI43pr2fX@puffin.rmq2.cloudamqp.com/ghdswtyl',
          ],
          queue: queues.CONTENT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          }
        },
      },
    ]),
    TypeOrmModule.forFeature([User, Content, Group]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
