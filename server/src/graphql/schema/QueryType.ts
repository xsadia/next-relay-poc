import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql";
import {
  connectionArgs,
  connectionFromArray,
  fromGlobalId,
} from "graphql-relay";
import { nodeField, nodesField } from "../node/nodeDefinitions";
import { Post } from "../post/PostModel";
import { PostConnection, PostType } from "../post/PostType";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    up: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (root, args, ctx) => {
        const { id } = fromGlobalId(args.id);
        const data = await Post.findOne({ _id: id });

        return data;
      },
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async (root, args, ctx) => {
        const data = await Post.find();

        return connectionFromArray(data, args);
      },
    },
  }),
});
