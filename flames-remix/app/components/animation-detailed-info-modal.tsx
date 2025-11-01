import { useNavigate } from "@remix-run/react";
import { RiCloseLine } from "@remixicon/react";
import Animation from "~/shapes/animation";

function AnimationDetailedInfoModal({
  animation,
  showModal,
}: {
  animation: Animation;
  showModal: boolean;
}) {
  const navigate = useNavigate();
  const styleClasses: string = showModal
    ? "fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
    : "fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4";

  return (
    <>
      {showModal && animation ? (
        <div id="modalAnimationInfo" className={styleClasses}>
          <div className="relative pl-5 top-40 mx-auto shadow-xl rounded-md bg-gray-100 max-w-md">
            <div className="flex justify-end p-2">
              <button
                title="Close"
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => navigate(-1)}
              >
                <RiCloseLine size={25} />
              </button>
            </div>

            <div className="p-6 pt-0 grid grid-row6 gap-6">
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  Title
                </label>
                <span>{animation.title}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  File Size
                </label>
                <span>{animation.fileSize}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  Description
                </label>
                <span>{animation.description}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  Dimension
                </label>
                <span>{animation.dimension}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  Duration
                </label>
                <span>{animation.duration}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  Frame Rate
                </label>
                <span>{animation.frameRate}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  # of Frames
                </label>
                <span>{animation.totalFrames}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="fileSize" className="font-bold">
                  # of Layers
                </label>
                <span>{animation.layers}</span>
              </div>
              <div>
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-1 text-center mr-2"
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-1 text-center"
                  data-modal-toggle="delete-user-modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AnimationDetailedInfoModal;
