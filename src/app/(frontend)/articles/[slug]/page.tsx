import type { Metadata } from "next";

import { RelatedPosts } from "@/blocks/RelatedPosts/Component";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import RichText from "@/components/RichText";

import { generateMeta } from "@/utilities/generateMeta";
import PageClient from "./page.client";
import { formatDate } from "@/utilities/dateTimeFormatters";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = posts.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = "" } = await paramsPromise;
  const url = "/articles/" + slug;
  const post = await queryPostBySlug({ slug });

  if (!post) return <PayloadRedirects url={url} />;

  return (
    <main className="flex flex-col items-center container">
      <article className="pt-20 pb-20 flex flex-col gap-4 max-w-[48rem]">
        <PageClient />

        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        <header className="flex flex-col">
          <h1>{post.title}</h1>

          <div className="mt-10 mb-10 text-sm text-zinc-500">
            {post.publishedAt && (
              <span>
                Publié le{" "}
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </span>
            )}
            ,&nbsp;
            {post.updatedAt && (
              <span>
                mis à jour le{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt)}
                </time>
              </span>
            )}
          </div>
        </header>

        <RichText data={post.content} enableGutter={false} />
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
            docs={post.relatedPosts.filter((post) => typeof post === "object")}
          />
        )}
      </article>
    </main>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;
  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post });
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
