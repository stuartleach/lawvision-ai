export const About = () => (
    <div className="px-6 pb-32 lg:px-8 font-light tracking-tight *:my-2">
        <div className="mx-auto max-w-3xl text-base/7 text-zinc-300">
            <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-zinc-300 sm:text-5xl border-b border-white border-opacity-40 pb-2 mb-4">
                LawVision
            </h1>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100">Overview</h2>
            <div className="font-light tracking-tight">
                <p className="mt-6 text-xl/8">
                    Bail is the fee a defendant can pay to be released from custody pending trial. The purpose of bail is to ensure that the defendant appears in court for their trial. If the defendant fails to appear in court, the bail is forfeited. Otherwise, the defendant recoups the expense.
                </p>
                <p className="mt-6 text-xl/8">
                    The bail system is controversial because it can lead to the pretrial detention of individuals who cannot afford to pay bail. In New York City, this often means a stint at Rikers Island, a notorious jail complex that has been the subject of numerous investigations and lawsuits.
                </p>
                <p className="mt-6 text-xl/8">
                    <a className="transition text-blue-500 hover:text-blue-400/60" href="https://www.nysenate.gov/legislation/laws/CPL/510.10" target="_blank">CPL 510.10</a> outlines what judges can and cannot consider when setting bail.
                </p>
                <p className="mt-6 text-xl/8">
                    The purpose of this project is to understand how closely judges in New York State adhere to the law, as outlined in CPL 510.10, when setting bail.
                </p>
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100">Dataset</h2>
            <ol className="my-6 text-xl/8 list-decimal">
                <li className="text-xl/8">
                    <a className="transition text-blue-500 hover:text-blue-400/60" href="https://ww2.nycourts.gov/pretrial-release-data-33136" target="_blank">New York Pretrial Release Data</a>
                </li>
                <li className="text-xl/8">
                    <a className="transition text-blue-500 hover:text-blue-400/60" href="https://data.census.gov/profile/New_York_County,_New_York?g=050XX00US36061" target="_blank">Census Average Median Income for New York State counties</a>
                </li>
            </ol>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100">Methodology</h2>
            <ol className="my-6 list-decimal space-y-2 text-xl/8">
                <li>
                    Create a "New York Judge" profile by analyzing the bail decisions of judges in New York State. Use regression models such as Gradient Boosting and Random Forest to assign importance values to various features that might be relevant to the case.
                </li>
                <li>
                    Create a similar profile for each county: Identify what correlations are stronger with a Kings County judge's decisions than a Richmond County judge's decisions when compared to the average New York State judge.
                </li>
                <li>
                    Assign profiles to every judge in the state, comparing them to judges in their county and state.
                </li>
            </ol>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100">Research Questions</h2>
            <ul className="my-6 list-disc space-y-2 text-xl/8">
                <li>
                    Are there factors that have an correlation on the amount of bail set?
                </li>
                <li>
                    What factors have a high importance value that shouldn't, e.g., race, gender, median income of the county?
                </li>
                <li>
                    What factors have a higher importance value to some judges than others?
                </li>
            </ul>
            <p className="mt-6 text-xl/8 text-purple-500 font-semibold">
                Drawing inferences
            </p>
            <p className="text-xl/8 text-purple-300">
                Correlation ≠ Causation. This model is good at noticing patterns, but responsible inferences shouldn't take us further than appreciating correlations between datapoints—i.e. just because a judge's bail amounts reflect a strikingly high race-importance, for example, we ought not to assume race plays into the bail decisions. This model is more interested in questions than answers, and is certainly not meant to tar-and-feather anyone in the justice system.
            </p>
            <p className="mt-6 text-xl/8 text-red-500 font-semibold">
                Disclaimer
            </p>
            <p className="text-xl/8 text-red-300">
                This is not and will never be a tool to be used by counsel. It can't teach a lawyer what to emphasize on their client's behalf. This model will never be as effective as a reasonably perceptive defense attorney. This project is only to understand the extent that judges in New York State abide by the rules laid out in CPL 510.10.
            </p>
            <p className="mt-6 text-yellow-300 text-xl/8 font-semibold">
                Incompleteness of the dataset
            </p>
            <p className="text-yellow-100 text-xl/8">
                This data is incomplete, both in its range and its scope. In a perfect world (or one where compute is cheaper and court records are more thorough), this model would take bail eligibility into account, and set ROR "release on recognizance" decisions to a bail amount of $0.00, which would give us deeper and more complete insight into a correlations between bail amounts and other factors. As it is currently running, the model only accounts for bail amounts &gt; 0.
            </p>
        </div>
    </div>
)
