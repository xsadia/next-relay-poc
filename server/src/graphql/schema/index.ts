import { GraphQLSchema } from "graphql";
import { MutationType } from "./MutationQuery";
import { QueryType } from "./QueryType";

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
