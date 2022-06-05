import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { Post } from "../post/PostModel";
import { PostType } from "../post/PostType";

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case "Post":
        return await Post.findOne({ _id: id });
    }

    return null;
  },
  (obj) => {
    if (obj instanceof Post) {
      return PostType.name;
    }
  }
);
