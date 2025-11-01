import ActionBar from "~/components/action-bar";
import AnimationItem from "~/components/animation-item";
import Animation from "~/shapes/animation";

function AnimationsContainer({ animations }: { animations: Animation[] }) {
  return (
    <div className="bg-gray-200 h-dvh">
      <ActionBar />
      <ul className="p-4 grid gap-x-4 gap-y-12 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        {animations.map((animation: Animation) => (
          <AnimationItem key={animation.id} animation={animation} />
        ))}
      </ul>
    </div>
  );
}

export default AnimationsContainer;
