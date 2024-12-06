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
      publishedAt: true,
    },
  });

  return (
    <main>
      <PageClient />
      <div className="container pt-20 pb-20">
        <h1 className="mb-5">Articles</h1>

        <CollectionArchive posts={posts.docs} />

        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </main>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Articles | Blog de Antoine Raymond`,
    description:
      "Découvrez des articles pertinents sur le développement web, couvrant les dernières tendances et les bonnes pratiques",
  };
}
