import 'reflect-metadata';
import { MockContext, Context, createMockContext } from '../test-utils/mock-context';


let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

export { mockCtx, ctx }