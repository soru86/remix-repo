import Lottie from "react-lottie-player";
import Animation from "~/shapes/animation";
import { jp } from "~/utils/utils";
import { RiDownload2Fill, RiInformationLine } from "@remixicon/react";
import { Link } from "@remix-run/react";

function handleDownload(jsonData: string) {
  const fileName = `animation-${Date.now()}.json`;
  const contentType = "application/json;charset=utf-8;";
  const a = document.createElement("a");
  a.download = fileName;
  a.href = "data:" + contentType + "," + encodeURIComponent(jsonData);
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function AnimationItem({ animation }: { animation: Animation }) {
  return (
    <li
      key={animation.id}
      className="bg-gray-100 lg:basis-1/4 sm:basis-1/2 border-2 border-gray-300 rounded-xl max-w-64 max-h-64"
    >
      <Lottie
        loop
        animationData={jp(animation.definition)}
        play
        style={{ width: 256, height: 256 }}
      />
      <div className="flex flex-row space-x-4 pt-1 pb-4 justify-between">
        <label className="justify-self: start">{animation.title}</label>
        <div className="flex flex-row justify-items-end">
          <button
            type="button"
            title="Download Animation JSON"
            className="justify-self: end mr-5"
            onClick={() => handleDownload(animation.definition)}
          >
            <RiDownload2Fill
              size={25}
              className="text-gray-800 justify-self: end"
            />
          </button>
          <Link
            title="View Animation Details"
            to={`/animations/${animation.id}?showModal=true`}
            className="justify-self: end"
          >
            <RiInformationLine
              size={25}
              className="text-gray-800 justify-self: end"
            />
          </Link>
        </div>
      </div>
    </li>
  );
}

export default AnimationItem;
