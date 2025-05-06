"use client";

type ToggleSwitchProps = {
  ComponentA: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ComponentB: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onToggle: () => void;
  activeTheme?: 'a' | 'b';
};

export default function ToggleSwitch({
  ComponentA,
  ComponentB,
  onToggle,
  activeTheme
}: ToggleSwitchProps) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center p-1 bg-surface rounded-full cursor-pointer w-fit transition"
    >
      <div
        className={`flex justify-center items-center px-3 py-1 rounded-full transition-all duration-300 ${
          activeTheme === 'a' ? "bg-background/40" : ""
        }`}
      >
        {<ComponentA stroke={"#b77157"} fill = {activeTheme === 'a'? "#b77157": "none"}/>}
      </div>
      <div
        className={`flex justify-center items-center px-3 py-1 rounded-full transition-all duration-300 ${
          activeTheme === 'b' ? "bg-background/40" : ""
        }`}
      >
        {<ComponentB stroke={"#b77157"} fill = {activeTheme === 'b'? "#b77157": "none"}/>}
      </div>
    </div>
  );
}
