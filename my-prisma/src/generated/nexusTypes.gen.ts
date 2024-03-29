/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AuthorCreateInput: { // input type
    books: NexusGenInputs['BookCreateInput'][]; // [BookCreateInput!]!
    name: string; // String!
  }
  BookCreateInput: { // input type
    comment?: string | null; // String
    title: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Author: { // root type
    id: number; // Int!
    name?: string | null; // String
  }
  Book: { // root type
    authorId?: number | null; // Int
    id: number; // Int!
    title: string; // String!
  }
  Comment: { // root type
    content: string; // String!
    id: number; // Int!
  }
  Mutation: {};
  Query: {};
  Subscription: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Author: { // field return type
    books: NexusGenRootTypes['Book'][]; // [Book!]!
    id: number; // Int!
    name: string | null; // String
  }
  Book: { // field return type
    authorId: number | null; // Int
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    id: number; // Int!
    title: string; // String!
  }
  Comment: { // field return type
    content: string; // String!
    id: number; // Int!
  }
  Mutation: { // field return type
    createAuthor: NexusGenRootTypes['Author'] | null; // Author
    createBook: NexusGenRootTypes['Book'] | null; // Book
    deleteAuthor: NexusGenRootTypes['Author'] | null; // Author
  }
  Query: { // field return type
    authors: Array<NexusGenRootTypes['Author'] | null>; // [Author]!
    books: Array<NexusGenRootTypes['Book'] | null>; // [Book]!
    searchAuthors: NexusGenRootTypes['Query'] | null; // Query
    searchBooks: Array<NexusGenRootTypes['Book'] | null>; // [Book]!
  }
  Subscription: { // field return type
    newAuthorCreated: NexusGenRootTypes['Author'] | null; // Author
  }
}

export interface NexusGenFieldTypeNames {
  Author: { // field return type name
    books: 'Book'
    id: 'Int'
    name: 'String'
  }
  Book: { // field return type name
    authorId: 'Int'
    comments: 'Comment'
    id: 'Int'
    title: 'String'
  }
  Comment: { // field return type name
    content: 'String'
    id: 'Int'
  }
  Mutation: { // field return type name
    createAuthor: 'Author'
    createBook: 'Book'
    deleteAuthor: 'Author'
  }
  Query: { // field return type name
    authors: 'Author'
    books: 'Book'
    searchAuthors: 'Query'
    searchBooks: 'Book'
  }
  Subscription: { // field return type name
    newAuthorCreated: 'Author'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAuthor: { // args
      data: NexusGenInputs['AuthorCreateInput']; // AuthorCreateInput!
    }
    createBook: { // args
      data: NexusGenInputs['BookCreateInput']; // BookCreateInput!
    }
    deleteAuthor: { // args
      id: number; // Int!
    }
  }
  Query: {
    searchBooks: { // args
      searchString: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}