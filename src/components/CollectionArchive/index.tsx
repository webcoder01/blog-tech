import React from "react";
import { Card, CardPostData } from "@/components/Card";

export type Props = {
  posts: CardPostData[];
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-4">
      {posts?.map((result, index) => {
        if (typeof result === "object" && result !== null) {
          return (
            <Card
              key={index}
              className="h-full"
              doc={result}
              relationTo="articles"
              showCategories
            />
          );
        }

        return null;
      })}
    </div>
  );
};
