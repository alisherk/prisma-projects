import { buildSchema } from 'type-graphql';
import { PubSubNameSpace } from './services/pubsub';
import { CustomUserResolver } from './resolvers/custom.user.resolver';
import {
  FindManyUserResolver,
  CreateUserResolver,
} from '@generated/type-graphql';

export const createSchema = async () =>
  buildSchema({
    resolvers: [FindManyUserResolver, CreateUserResolver, CustomUserResolver],
    validate: true,
    pubSub: PubSubNameSpace.pubsubClient.client,
  });
