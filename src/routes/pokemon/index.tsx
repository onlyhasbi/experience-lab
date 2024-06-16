import { config } from "@/config";
import { ContentLayout } from "@/layout/content";
import { Response } from "@/types/response";
import { Link, createFileRoute } from "@tanstack/react-router";
import { capitalize } from "radash";
import React, { Suspense } from "react";
import z from "zod";

const searchParamsSchema = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
});

export const Route = createFileRoute("/pokemon/")({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search: { limit = 12, offset = 0 } }) => ({ offset, limit }),
  loader: async ({ deps: { offset, limit } }) => {
    return await fetch(
      config.url(`pokemon?offset=${offset}&limit=${limit}`)
    ).then((res) => res.json());
  },
  component: Pokemon,
});

function Pokemon() {
  const navigate = Route.useNavigate();
  const { limit } = Route.useSearch();
  const { results: pokemons }: Response = Route.useLoaderData();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <ContentLayout>
        <React.Fragment>
          <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-5">
            {pokemons?.map((item) => (
              <Link
                key={item.name}
                to="/pokemon/$idName"
                className="py-3 border-b border-slate-300"
                params={{ idName: item.name }}
              >
                {capitalize(item.name)}
              </Link>
            ))}
          </div>
          <div className="w-full text-center mt-10">
            <button
              type="button"
              className="underline"
              onClick={() => {
                navigate({
                  search: () => ({
                    limit: limit ? limit + 12 : 24,
                    offset: 0,
                  }),
                });
              }}
            >
              Load more
            </button>
          </div>
        </React.Fragment>
      </ContentLayout>
    </Suspense>
  );
}
