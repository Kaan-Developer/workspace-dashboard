import { enSite } from "@/data/enSite";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import Card from "@/components/ui/Card";
import ChartBarDefault from "@/components/ui/Chart";

const Overview = () => {
  const overview = enSite.overview;

  return (
    <section>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg lg:text-3xl">{overview.title}</h1>
            <p className="text-muted-foreground">{overview.description}</p>
          </div>

          <Button className="p-5" variant="default">
            <LuPlus size={14} aria-hidden="true" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(overview.stats).map(([id, stat]) => {
            const Icon = stat.icon;
            const detail =
              "detailCount" in stat
                ? stat.detail(stat.detailCount)
                : stat.detail;

            return (
              <Card
                key={id}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </div>

                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{detail}</span>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-6">
        <Card>
          <ChartBarDefault />
        </Card>

        <Card></Card>

      </div>
    </section>
  );
};

export default Overview;
