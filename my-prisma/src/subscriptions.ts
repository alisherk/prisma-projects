import { subscriptionField } from 'nexus';
import { Context } from './context';


export const eventType = 'authorCreated';

export const authorSubscription = subscriptionField('newAuthorCreated', {
  type: 'Author',
  subscribe(_parent, _args, context: Context) {
    return context.pubsub.asyncIterator(eventType);
  },
  resolve(payload) {
    return payload;
  },
});
