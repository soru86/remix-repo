import { Form, Link, useSubmit } from "@remix-run/react";
import { RiSearchLine } from "@remixicon/react";

function handleKeyDown(event: any, submit: CallableFunction) {
  const key = event.key;
  if (key === "Enter") {
    submit(event.currentTarget);
  }
}

function ActionBar() {
  const submit = useSubmit();
  return (
    <div className="bg-gray-200 w-full p-4 flex items-stretch space-x-4">
      <Form
        method="GET"
        className="bg-gray-200 w-full flex items-stretch space-x-4"
      >
        <input
          type="text"
          title="Search Animations"
          placeholder="Enter search term"
          name="search"
          id="search"
          className="pl-2 w-full h-8 rounded pb-0.5"
          onKeyDown={(e) => handleKeyDown(e, submit)}
        />
        <button type="submit" title="Search Animation">
          <RiSearchLine
            size={25}
            className="text-gray-800 mt-1 hover:cursor-pointer"
          />
        </button>
      </Form>
      <Link
        to={`/animations/new?showModal=true`}
        title="Create New Animation"
        className="bg-gray-800 hover:bg-gray-600 text-white pt-0.5 px-4 rounded"
      >
        New
      </Link>
    </div>
  );
}

export default ActionBar;
