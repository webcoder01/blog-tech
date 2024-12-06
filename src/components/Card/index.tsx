"use client";
import { cn } from "@/utilities/cn";
import Link from "next/link";
import React, { Fragment } from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/components/Media";
import { formatDate } from "@/utilities/dateTimeFormatters";

export type CardPostData = Pick<
  Post,
  "slug" | "categories" | "meta" | "title" | "publishedAt"
>;

export const Card: React.FC<{
  alignItems?: "center";
  className?: string;
  doc?: CardPostData;
  relationTo?: "articles";
  showCategories?: boolean;
  title?: string;
}> = (props) => {
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props;

  const { slug, categories, meta, title } = doc || {};
  const { description, image: metaImage } = meta || {};

  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, " "); // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`;

  return (
    <article className={cn("overflow-hidden bg-white", className)}>
      <div className="relative w-full ">
        {metaImage && typeof metaImage !== "string" && (
          <Media resource={metaImage} size="33vw" />
        )}
      </div>

      <div className="h-full p-4 flex flex-col justify-between">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === "object") {
                    const { title: titleFromCategory } = category;

                    const categoryTitle =
                      titleFromCategory || "Untitled category";

                    const isLast = index === categories.length - 1;

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        )}

        {titleToUse && <h2>{titleToUse}</h2>}

        {description && (
          <div className="flex-grow mt-5">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}

        <footer className="mt-10 flex flex-row flex-nowrap justify-between align-middle">
          <Link href={href} className="text-primary hover:underline">
            Lire l&apos;article
          </Link>

          {doc?.publishedAt && (
            <time dateTime={doc.publishedAt} className="text-sm text-zinc-400">
              Publié le {formatDate(doc.publishedAt)}
            </time>
          )}
        </footer>
      </div>
    </article>
  );
};
