import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { Post } from "../PostModel";
import { PostEdge } from "../PostType";

export default mutationWithClientMutationId({
  name: "CreatePost",
  description: "Create post mutation",
  inputFields: {
    postedBy: {
      type: GraphQLString,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ postedBy, content }) => {
    const post = new Post({
      postedBy,
      content,
    });

    await post.save();

    return { post };
  },
  outputFields: {
    postEdge: {
      type: PostEdge,
      resolve: async ({ post }) => {
        return {
          cursor: toGlobalId("Post", post._id),
          node: post,
        };
      },
    },
  },
});
