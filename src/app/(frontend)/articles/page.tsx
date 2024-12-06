import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import PageClient from "./page.client";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  });

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Articles</h1>
        </div>
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Articles | Blog de Antoine Raymond`,
    description:
      "Découvrez des articles pertinents sur le développement web, couvrant les dernières tendances et les bonnes pratiques",
  };
}