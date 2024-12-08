import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export const About = () => {
    return (
        <div className="px-6 pb-32 pt-16 lg:px-8 font-light">
            <div className="mx-auto max-w-3xl text-base/7 text-zinc-300">
                {/* <p className="text-base/7 font-semibold text-indigo-500">Introducing</p> */}
                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-zinc-300 sm:text-5xl border-b border-white border-opacity-40 pb-2 mb-4">
                    LawVision
                </h1>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100">Overview</h2>
                <div className="font-light tracking-tight">
                    <p className="mt-6 text-xl/8">
                        Bail is the fee a defendant can pay to be released from custody pending trial. The purpose of bail is to ensure that the defendant appears in court for their trial. If the defendant fails to appear in court, the bail is forfeited. Otherwise, the defendant recoups the expense.
                    </p>
                    <p className="mt-6 text-xl/8">The bail system is controversial because it can lead to the pretrial detention of individuals who cannot afford to pay bail. In New York City, this often means a stint at Rikers Island, a notorious jail complex that has been the subject of numerous investigations and lawsuits.
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

                <ol className="my-6 list-decimal space-y-2  text-xl/8">
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




{/* 

                <div className="font-light tracking-tight">
                </div>
                <div className="max-w-2xl">
                    <p>
                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
                        sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
                        sed turpis id.
                    </p>
                    <ul role="list" className="mt-8 max-w-xl space-y-8 text-zinc-300">
                        <li className="flex gap-x-3">
                            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-500" />
                            <span>
                                <strong className="font-semibold text-zinc-100">Data types.</strong> Lorem ipsum, dolor sit amet
                                consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                                blanditiis ratione.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-500" />
                            <span>
                                <strong className="font-semibold text-zinc-100">Loops.</strong> Anim aute id magna aliqua ad ad non
                                deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-500" />
                            <span>
                                <strong className="font-semibold text-zinc-100">Events.</strong> Ac tincidunt sapien vehicula erat
                                auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                            </span>
                        </li>
                    </ul>
                    <p className="mt-8">
                        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                        fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                        adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                    </p>
                    <h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-zinc-300">
                        From beginner to expert in 3 hours
                    </h2>
                    <p className="mt-6">
                        Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
                        Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus
                        mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
                        ipsum eu a sed convallis diam.
                    </p>
                    <figure className="mt-10 border-l border-indigo-600 pl-9">
                        <blockquote className="font-semibold text-zinc-300">
                            <p>
                                “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh ullamcorper ac
                                dictum justo in euismod. Risus aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
                                tristique.”
                            </p>
                        </blockquote>
                        <figcaption className="mt-6 flex gap-x-4">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="size-6 flex-none rounded-full bg-gray-50"
                            />
                            <div className="text-sm/6">
                                <strong className="font-semibold text-zinc-300">Maria Hill</strong> – Marketing Manager
                            </div>
                        </figcaption>
                    </figure>
                    <p className="mt-10">
                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
                        sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
                    </p>
                </div>
                <figure className="mt-16">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
                        className="aspect-video rounded-xl bg-gray-50 object-cover"
                    />
                    <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
                        <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
                        Faucibus commodo massa rhoncus, volutpat.
                    </figcaption>
                </figure>
                <div className="mt-16 max-w-2xl">
                    <h2 className="text-pretty text-3xl font-semibold tracking-tight text-zinc-300">
                        Everything you need to get up and running
                    </h2>
                    <p className="mt-6">
                        Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In
                        amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie.
                        Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat
                        ac. Cras fermentum convallis quam.
                    </p>
                    <p className="mt-8">
                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
                        sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
                    </p> */}
                {/* </div> */}
            </div>
        </div>
    )
}
