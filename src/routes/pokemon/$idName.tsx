import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/config";
import { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import axios from "axios";
import { capitalize } from "radash";

export const Route = createFileRoute("/pokemon/$idName")({
  component: PersonDetail,
});

function PersonDetail() {
  const { idName } = Route.useParams();
  const navigate = useRouter();
  const { data: pokemon, isLoading } = useQuery<Pokemon>({
    queryKey: [`pokemon-${idName}`],
    queryFn: () =>
      axios.get(config.url(`pokemon/${idName}`)).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <Card className="w-56">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl text-center">
              {capitalize(idName)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {pokemon?.sprites?.front_shiny ? (
              <img
                className="block w-44 h-44"
                src={pokemon?.sprites?.front_shiny}
                alt={`pokemon-photo-${idName}`}
              />
            ) : null}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 items-center">
                <h3 className="text-sm">Weight</h3>
                <span className="text-lg font-semibold">{pokemon?.weight}</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <h3 className="text-sm">Height</h3>
                <span className="text-lg font-semibold">{pokemon?.height}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <button className="w-full text-center py-5 text-sm underline" onClick={() => navigate.history.back()}>
          Pokemon list
        </button>
      </div>
    </div>
  );
}
