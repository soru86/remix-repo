// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as clientCore from "@apollo/client/core/core.cjs";
const { ApolloClient, gql, InMemoryCache } = clientCore;
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {
  createAnimation,
  findAllAnimations,
  findAnimationById,
  findAnimationsByTitle,
} from "~/apis/db.apis";

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export const typeDefs = gql`
  type Animation {
    id: String
    title: String
    definition: String
    createdAt: String
  }

  type AnimationDetails {
    id: String
    title: String
    description: String
    dimension: String
    frameRate: Int
    duration: Int
    layers: Int
    totalFrames: Int
    fileSize: String
  }

  type Query {
    getAllAnimations: [Animation]
    getAnimationById(animationId: String): AnimationDetails
    getAnimationsByTitle: [Animation]
  }

  type Mutation {
    addAnimation(animation: InputAnimation): Boolean
  }

  input InputAnimation {
    title: String
    definition: String
    description: String
    dimension: String
    frameRate: Int
    duration: Int
    layers: Int
    totalFrames: Int
    fileSize: String
  }
`;

export const resolvers = {
  Query: {
    getAllAnimations: async () => await findAllAnimations(),
    getAnimationById: async (parent, args, context, { variableValues }) => {
      const { animationId } = variableValues;
      return await findAnimationById(animationId);
    },
    getAnimationsByTitle: async (parent, args, context, { variableValues }) => {
      const { title } = variableValues;
      return await findAnimationsByTitle(title);
    },
  },
  Mutation: {
    addAnimation: async (parent, { animation }) =>
      await createAnimation(animation),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new SchemaLink({ schema }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
