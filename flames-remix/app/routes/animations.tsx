import {
  Outlet,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { RiErrorWarningFill } from "@remixicon/react";
import { queryAllAnimations, queryAnimationsByTitle } from "~/apis/gql.apis";
import AnimationsContainer from "~/components/animations-container";
import AnimationListLoaderData from "~/shapes/animations-list-loader-data";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search");

  let animations;

  if (searchTerm) {
    animations = await queryAnimationsByTitle(searchTerm);
  } else {
    animations = await queryAllAnimations();
  }

  if (!animations) throw new Error("Animations not found!");

  return {
    animations,
  };
};

export function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);
  return (
    <div className="border-2 border-red-400 p-5 rounded m-5 flex flex-row justify-between">
      <div className="flex flex-row justify-start">
        <RiErrorWarningFill size={25} className="text-red-400 mr-5" />
        <span className="text-red-500">Error: {error?.message}</span>
      </div>
      <button
        type="button"
        className="border-2 border-gray-800 hover:bg-gray-600 hover:text-white text-gray-800 px-4 rounded justify-self: end"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

function Animations() {
  const animations = useLoaderData<AnimationListLoaderData>().animations;

  return (
    <div>
      <AnimationsContainer animations={animations} />
      <Outlet />
    </div>
  );
}

export default Animations;
