import Koa, { Request } from "koa";
import Router from "@koa/router";
import koaPlayground from "graphql-playground-middleware-koa";
import bodyParser from "koa-bodyparser";
import { graphqlHTTP, OptionsData } from "koa-graphql";
import cors from "@koa/cors";
import { schema } from "./graphql/schema";

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async (req: Request): Promise<OptionsData> => {
  return {
    graphiql: false,
    schema,
    pretty: true,
    context: {
      req,
    },
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message);
      console.log(locations);
      console.log(stack);

      return {
        message,
        locations,
        stack,
      };
    },
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all("/graphql", graphqlServer);
router.all(
  "/graphql/playground",
  koaPlayground({
    endpoint: "/graphql",
  })
);

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
