import { ChangeEvent, useState } from "react";
import { useActionData, useNavigate } from "@remix-run/react";
import { RiCloseLine } from "@remixicon/react";
import FormField from "./form-field";

function closeModal(navigate: CallableFunction, setFile: CallableFunction) {
  setFile("");
  navigate(-1);
}

let fileReader: FileReader;

const handleFileRead = (setFile: CallableFunction) => {
  const content = fileReader.result;
  setFile(content);
};

function handleFileChange(
  e: ChangeEvent<HTMLInputElement>,
  setFile: CallableFunction,
  setFileSize: CallableFunction
) {
  const file = e?.target?.files![0];
  setFileSize(file.size);
  fileReader = new FileReader();
  fileReader.onloadend = () => handleFileRead(setFile);
  fileReader.readAsText(file);
}

function UploadAnimationModal({ showModal }: { showModal: boolean }) {
  const navigate = useNavigate();
  const [file, setFile] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const actionData = useActionData<any>();

  const styleClasses: string = showModal
    ? "fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
    : "fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4";

  return (
    <>
      {showModal ? (
        <div id="modalUpload" className={styleClasses}>
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-gray-100 max-w-md">
            <div className="flex justify-end p-2">
              <button
                title="Close"
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => closeModal(navigate, setFile)}
              >
                <RiCloseLine size={25} />
              </button>
            </div>

            <form method="POST">
              <div className="p-6 pt-0 grid grid-row6 gap-6">
                <div>
                  <input
                    title="Select animation JSON file"
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFileChange(e, setFile, setFileSize)}
                  />
                  <input
                    title="JSON definition"
                    type="text"
                    name="definition"
                    id="definition"
                    className="hidden"
                    readOnly
                    value={file}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <label htmlFor="fileSize" className="font-bold">
                    File Size
                  </label>
                  <input
                    title="File size"
                    type="text"
                    name="fileSize"
                    id="fileSize"
                    readOnly
                    className="col-span-3"
                    value={`${fileSize ? (fileSize * 0.001).toFixed(1) : 0} KB`}
                    defaultValue={actionData?.fields?.fileSize}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <FormField
                    actionData={actionData}
                    fieldLabel="Title"
                    fieldName="title"
                    multiSpan={true}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <FormField
                    actionData={actionData}
                    fieldLabel="Description"
                    fieldName="description"
                    multiSpan={true}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <FormField
                    actionData={actionData}
                    fieldLabel="Dimension"
                    fieldName="dimension"
                    multiSpan={true}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <FormField
                    actionData={actionData}
                    fieldLabel="Duration"
                    fieldName="duration"
                    multiSpan={false}
                  />
                  <FormField
                    actionData={actionData}
                    fieldLabel="Frame Rate"
                    fieldName="frameRate"
                    multiSpan={false}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <FormField
                    actionData={actionData}
                    fieldLabel="# of Frames"
                    fieldName="totalFrames"
                    multiSpan={false}
                  />
                  <FormField
                    actionData={actionData}
                    fieldLabel="# of Layers"
                    fieldName="layers"
                    multiSpan={false}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-1 text-center mr-2"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => closeModal(navigate, setFile)}
                    className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-1 text-center"
                    data-modal-toggle="delete-user-modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UploadAnimationModal;
