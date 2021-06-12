import { HTMLAttributes } from "react";
import Progress from "./Progress";

type Card = {
  heading?: string;
  description?: string;
  suffix?: string;
  progress?: number;
};

export default function Card({
  heading,
  description,
  children,
  suffix,
  progress,
  ...rest
}: Card & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={[
        "px-4 py-5 bg-white dark:bg-gray-800 rounded-md shadow sm:rounded-lg sm:p-6",
        rest.className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children || (
        <>
          <p className="text-xl font-medium leading-snug text-gray-500">
            {heading}
          </p>

          <div className="flex items-baseline space-x-3">
            <p className="mt-4 text-4xl font-bold tracking-tight text-green-600 dark:text-green-500">
              {description}
            </p>

            <p className="text-lg text-gray-500 text-green-600">{suffix}</p>
          </div>

          {progress && (
            <div className="mt-4">
              <Progress className="bg-green-500" value={progress} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
