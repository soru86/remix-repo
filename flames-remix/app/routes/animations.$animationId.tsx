import { useLoaderData } from "@remix-run/react";
import { queryAnimationById } from "~/apis/gql.apis";
import AnimationDetailedInfoModal from "~/components/animation-detailed-info-modal";
import AnimationDetailsLoaderData from "~/shapes/animation-details-loader-data";

export const loader = async ({ request, params }) => {
  const { animationId } = params;
  const url = new URL(request.url);
  const showModal = url.searchParams.get("showModal");

  const animation = await queryAnimationById(animationId);

  return { showModal, animation };
};

function AnimationDetails() {
  const { showModal, animation } = useLoaderData<AnimationDetailsLoaderData>();

  return (
    <AnimationDetailedInfoModal showModal={showModal} animation={animation} />
  );
}

export default AnimationDetails;
