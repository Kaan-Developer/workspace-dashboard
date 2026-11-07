import { enSite } from "@/data/enSite";

const Overview = () => {
    const overview = enSite.overview;

    return (
        <section>
            <div>
                            <div className="flex flex-col gap-2">
                            <h1 className="text-lg lg:text-3xl">{overview.title}</h1>
            <p className="text-muted-foreground">{overview.description}</p>
            </div>
            </div>

            <div key={overview.title} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {overview.stats.map}
            </div>
        </section>
    )
}

export default Overview;