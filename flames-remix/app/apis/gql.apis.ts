import { graphQLClient } from "~/lib/apollo/apollo.server";
import InputAnimation from "~/shapes/input-animation";
import {
  addNewAnimationMutation,
  getAllAnimationsQuery,
  getAnimationByIdQuery,
  getAnimationsByTitleQuery,
} from "~/utils/graphql-queries";

const queryAllAnimations = async () => {
  const animations = await graphQLClient.query({
    query: getAllAnimationsQuery,
  });
  return animations?.data?.getAllAnimations;
};

const queryAnimationById = async (animationId: string) => {
  const animation = await graphQLClient.query({
    query: getAnimationByIdQuery,
    variables: {
      animationId: animationId,
    },
  });
  return animation?.data?.getAnimationById;
};

const queryAnimationsByTitle = async (title: string) => {
  const animations = await graphQLClient.query({
    query: getAnimationsByTitleQuery,
    variables: {
      title: title,
    },
  });
  return animations?.data?.getAnimationsByTitle;
};

const createAnimation = async (animation: InputAnimation) => {
  const isCreated = await graphQLClient.mutate({
    mutation: addNewAnimationMutation,
    variables: {
      animation: animation,
    },
  });
  return isCreated;
};

export {
  queryAllAnimations,
  queryAnimationById,
  createAnimation,
  queryAnimationsByTitle,
};
