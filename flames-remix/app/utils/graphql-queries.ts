import * as clientCore from "@apollo/client/core/core.cjs";
const { gql } = clientCore;

const getAllAnimationsQuery = gql`
  query getAllAnimations {
    getAllAnimations {
      id
      title
      definition
      createdAt
    }
  }
`;

const getAnimationByIdQuery = gql`
  query getAnimationById($animationId: String!) {
    getAnimationById(id: $animationId) {
      id
      title
      description
      dimension
      frameRate
      duration
      layers
      totalFrames
      fileSize
    }
  }
`;

const getAnimationsByTitleQuery = gql`
  query getAnimationsByTitle($title: String!) {
    getAnimationsByTitle(title: $title) {
      id
      title
      definition
      createdAt
    }
  }
`;

const addNewAnimationMutation = gql`
  mutation addAnimation($animation: InputAnimation!) {
    addAnimation(animation: $animation) {
      id
    }
  }
`;

export {
  getAllAnimationsQuery,
  getAnimationByIdQuery,
  getAnimationsByTitleQuery,
  addNewAnimationMutation,
};
