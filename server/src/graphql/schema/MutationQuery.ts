import { GraphQLObjectType } from "graphql";
import PostMutations from "../post/mutations";

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of all mutations",
  fields: () => ({
    ...PostMutations,
  }),
});
