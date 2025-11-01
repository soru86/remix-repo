import { redirect } from "@remix-run/react";
import { createAnimation } from "~/apis/gql.apis";
import UploadAnimationModal from "~/components/upload-animation-modal";
import InputAnimation from "~/shapes/input-animation";

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData();

  const title = form.get("title");
  const definition = form.get("definition");

  if (!definition) {
    throw new Error("No JSON file selected. Please select file and try again.");
  }

  const description = form.get("description");
  const dimension = form.get("dimension");
  const frameRate = parseInt(form.get("frameRate")?.toString() || "");
  const duration = parseInt(form.get("duration")?.toString() || "");
  const layers = parseInt(form.get("layers")?.toString() || "");
  const totalFrames = parseInt(form.get("totalFrames")?.toString() || "");
  const fileSize = form.get("fileSize");

  const fields: InputAnimation = {
    title,
    definition,
    description,
    dimension,
    frameRate,
    duration,
    layers,
    totalFrames,
    fileSize,
  };
  console.log(fields);
  const status = await createAnimation(fields);

  if (!status) {
    throw new Error("Error creating new animation in store.");
  }

  return redirect("/animations");
};

function NewAnimation() {
  return <UploadAnimationModal showModal={true} />;
}

export default NewAnimation;
