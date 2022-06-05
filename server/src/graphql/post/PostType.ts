import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node/nodeDefinitions";

export const PostType: any = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: globalIdField("Post"),
    postedBy: {
      type: GraphQLString,
      resolve: (post) => post.postedBy,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.content,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.createdAt.toISOString(),
    },
  }),
  interfaces: () => [nodeInterface],
});

const { connectionType: PostConnection, edgeType: PostEdge } =
  connectionDefinitions({
    name: "Post",
    nodeType: PostType,
  });

export { PostConnection, PostEdge };
