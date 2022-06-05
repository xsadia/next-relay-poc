import { GraphQLBoolean, GraphQLObjectType } from "graphql";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    up: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
  }),
});
