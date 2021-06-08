import { HTMLAttributes } from "react";

type Card = {
  heading: string;
  description: string;
};

export default function Card({
  heading,
  description,
  ...rest
}: Card & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={[
        "px-4 py-5 bg-white rounded-md shadow sm:rounded-lg sm:p-6",
        rest.className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-xl font-medium leading-snug text-gray-500">
        {heading}
      </p>

      <p className="mt-4 text-4xl font-bold tracking-tight text-green-600">{description}</p>
    </div>
  );
}
