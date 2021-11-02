import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  retryStrategy: (times) => Math.min(times * 50, 2000),
  port: 6379,
  host: 'localhost',
};

export namespace PubSubNameSpace {
  export enum Event {
    UserAdded = 'USER_ADDED',
  }

  export interface UserPayload {
    email: string;
  }

  interface EventPayload {
    [Event.UserAdded]: UserPayload;
  }

  export class PubSubClient {
    private _client: RedisPubSub;
    constructor() {
      this._client = new RedisPubSub({
        publisher: new Redis(options),
        subscriber: new Redis(options),
      });
    }

    get client() {
      return this._client;
    }

    public publish<Event extends keyof EventPayload>(
      event: Event,
      payload: EventPayload[Event]
    ): Promise<void> {
      return this.client.publish(event, payload);
    }

    public subscribe<Event extends keyof EventPayload>(
      event: Event,
      onMessage: (payload: EventPayload[Event]) => void
    ) {
      return this.client.subscribe(event, onMessage);
    }
  }

  export const pubsubClient = new PubSubClient();
}
