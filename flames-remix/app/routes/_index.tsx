import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Flames Animation App" },
    { name: "description", content: "Welcome to Remix PWA for animation app!" },
  ];
};

export default function Home() {
  return (
    <div className="bg-gray-200 h-dvh p-6">
      <h1 className="text-2xl pb-2.5">Welcome to Flames!</h1>
      <p>You can choose to download and upload the animations you like!</p>
    </div>
  );
}
