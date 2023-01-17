import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/submodules/backend-refresher-entities-1.0/src/entities/user.entity';
import { Content } from 'src/submodules/backend-refresher-entities-1.0/src/entities/content-entity';
import { Group } from 'src/submodules/backend-refresher-entities-1.0/src/entities/group.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Reaction } from 'src/submodules/backend-refresher-entities-1.0/src/entities/reaction.entity';
import { queues } from 'src/submodules/backend-refresher-1.0-rmq/src/constants/rmqQueues';
import { Option } from 'src/submodules/backend-refresher-entities-1.0/src/entities/option.entity';


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
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
