// Content for "The Little Red Dot" — Singapore 1960 → Future.
// Coordinates are [longitude, latitude]; app.js projects them onto the island.

export const ERAS = [
  {
    id: '1960s',
    label: '1960s',
    years: '1959 – 1969',
    title: 'Survival',
    mood: 'A port city with no country, no army, and not enough homes.',
    story:
      'In 1959 Singapore won self-government from Britain. Most people lived in crowded shophouses and wooden kampongs. ' +
      'Jobs were scarce, unemployment was above 10%, and in 1961 a fire in Bukit Ho Swee left 16,000 people homeless in one afternoon. ' +
      'Singapore joined Malaysia in 1963 hoping for a bigger market — but political and racial tensions boiled over, and on 9 August 1965 Singapore was asked to leave. ' +
      'A tiny island of 1.9 million people suddenly had to survive on its own.',
    challenge:
      'No natural resources, no hinterland, water piped in from Malaysia, racial riots in 1964, and the British — who provided 20% of jobs — about to pull out.',
    overcome:
      'The new Housing & Development Board (HDB) built more flats in 3 years than the colonial government had in 32. ' +
      'The Economic Development Board turned swampy Jurong into factories and courted foreign companies when others called it "Goh\'s Folly". ' +
      'National Service began in 1967 so the country could defend itself. Multiracialism — four official languages, one shared nation — became the founding rule.',
    milestones: [
      { year: 1959, text: 'Self-government. Lee Kuan Yew becomes Prime Minister.' },
      { year: 1960, text: 'HDB is formed; Queenstown becomes the first satellite town.', landmark: 'queenstown' },
      { year: 1961, text: 'Bukit Ho Swee fire — 16,000 homeless, rehoused in HDB flats within months.', landmark: 'bhs' },
      { year: 1961, text: 'Jurong Industrial Estate starts rising from swampland.', landmark: 'jurong' },
      { year: 1963, text: 'Merger with Malaysia.' },
      { year: 1965, text: '9 August — Singapore becomes an independent republic.', landmark: 'cityhall' },
      { year: 1966, text: 'Toa Payoh — the first town fully planned and built by HDB.', landmark: 'toapayoh' },
      { year: 1967, text: 'National Service begins. Singapore dollar is born.' },
    ],
    stats: { population: 1.9, gdp: 0.5, ownership: 29, life: 66 },
    takeaway: 'Singapore was never "meant" to work. It was built, on purpose, by people who refused to accept the odds.',
    sources: ['National Archives of Singapore', 'HDB history', 'SingStat'],
  },
  {
    id: '1970s',
    label: '1970s',
    years: '1970 – 1979',
    title: 'Build',
    mood: 'Jobs, flats, and a river that finally stopped smelling.',
    story:
      'The 1970s were about building — fast. New towns like Ang Mo Kio, Bedok and Clementi went up, and by 1979 two out of three Singaporeans lived in an HDB flat. ' +
      'The British military left in 1971, but the jobs they took away were replaced by electronics and oil-refining factories. ' +
      'In 1972 Singapore opened Southeast Asia\'s first container terminal at Tanjong Pagar, betting early on the shipping box that would change world trade.',
    challenge:
      'The British withdrawal removed thousands of jobs overnight. The Singapore River was an open sewer. Many families still rented and felt little stake in the country.',
    overcome:
      'From 1968, Singaporeans could use their CPF savings to buy flats — turning renters into owners. ' +
      'In 1977 Lee Kuan Yew ordered the Singapore River cleaned up within ten years; pig farms were moved and hawkers resettled into hawker centres. ' +
      'The Garden City campaign planted trees along every new road so the island would look loved, not poor.',
    milestones: [
      { year: 1971, text: 'British forces withdraw; Sembawang naval base converted to civilian shipyards.', landmark: 'sembawang' },
      { year: 1972, text: 'Tanjong Pagar container terminal opens — first in Southeast Asia.', landmark: 'tpport' },
      { year: 1973, text: 'Ang Mo Kio new town begins; Bedok follows.', landmark: 'amk' },
      { year: 1975, text: 'Decision to build a new airport at Changi instead of expanding Paya Lebar.' },
      { year: 1977, text: 'The 10-year Singapore River clean-up begins.', landmark: 'river' },
      { year: 1979, text: 'Speak Mandarin Campaign; streaming introduced in schools.' },
    ],
    stats: { population: 2.4, gdp: 4.1, ownership: 59, life: 71 },
    takeaway: 'Owning a home gave ordinary people a stake in the country. That idea — everyone has something to defend — still shapes Singapore today.',
    sources: ['HDB', 'PSA', 'NLB Infopedia'],
  },
  {
    id: '1980s',
    label: '1980s',
    years: '1980 – 1989',
    title: 'Connect',
    mood: 'A world-class airport, the first MRT train, and the first real recession.',
    story:
      'In 1981 Changi Airport opened and immediately became one of the world\'s best — a tiny country\'s front door to everywhere. ' +
      'On 7 November 1987 the first MRT train ran from Yio Chu Kang to Toa Payoh, after years of debate about whether a small island even needed a metro. ' +
      'Then came 1985: Singapore\'s first recession since independence. Growth collapsed, wages were cut, and the government realised it could not rely on cheap factories forever.',
    challenge:
      'The 1985 recession showed Singapore was too expensive for low-cost manufacturing but not yet skilled enough for high-value work. Reclaiming land for Marina Bay meant betting on a city centre that did not exist yet.',
    overcome:
      'Employer CPF contributions were cut to save jobs, and the economy was pushed up the value chain into disk drives, chemicals and finance. ' +
      'Massive reclamation at Marina South and the East Coast created the land that Marina Bay and the Expressway would later fill. ' +
      'The Ethnic Integration Policy (1989) set racial quotas in every HDB block so no neighbourhood could become an enclave.',
    milestones: [
      { year: 1981, text: 'Changi Airport opens with Terminal 1.', landmark: 'changi' },
      { year: 1984, text: 'Bishan and Tampines new towns take shape.', landmark: 'tampines' },
      { year: 1985, text: 'First post-independence recession.' },
      { year: 1986, text: 'OUB Centre completes — tallest building in Singapore (280 m).', landmark: 'cbd' },
      { year: 1987, text: '7 Nov — first MRT line opens, Yio Chu Kang to Toa Payoh.', landmark: 'nsl' },
      { year: 1989, text: 'Ethnic Integration Policy for HDB estates.' },
    ],
    stats: { population: 3.0, gdp: 11.9, ownership: 87, life: 74 },
    takeaway: 'The MRT was nearly cancelled for being too expensive. Big bets on infrastructure are how a small place stays relevant.',
    sources: ['Changi Airport Group', 'LTA', 'SingStat'],
  },
  {
    id: '1990s',
    label: '1990s',
    years: '1990 – 1999',
    title: 'Mature',
    mood: 'A new Prime Minister, a modern skyline, and a financial storm from next door.',
    story:
      'In 1990 Goh Chok Tong became Prime Minister — the first handover of power, done calmly and on schedule. ' +
      'The East-West MRT line reached Boon Lay, Suntec City rose on reclaimed land, and seven small islands were merged to form Jurong Island, a giant petrochemical hub. ' +
      'In 1997 the Asian Financial Crisis tore through Thailand, Indonesia and South Korea. Singapore was hit hard but did not collapse — its reserves, banks and rules held.',
    challenge:
      'The Asian Financial Crisis cut growth to almost zero. Neighbouring economies shrank 10% or more. Singapore had to prove it was a safe harbour, not just a cheap one.',
    overcome:
      'Rather than devalue or borrow, Singapore cut business costs, kept its currency stable and used its reserves as a buffer. ' +
      'Electronic Road Pricing (1998) — the world\'s first — showed Singapore would use technology to manage a crowded island. ' +
      'Upgrading programmes refreshed old HDB estates so the first-generation towns would not become slums.',
    milestones: [
      { year: 1990, text: 'Goh Chok Tong becomes the second Prime Minister. East-West Line opens to Boon Lay.', landmark: 'ewl' },
      { year: 1992, text: 'Chewing gum ban; chewing gum becomes Singapore\'s most famous law.' },
      { year: 1995, text: 'Woodlands Checkpoint and new town expand in the north.', landmark: 'woodlands' },
      { year: 1997, text: 'Suntec City completes. Asian Financial Crisis begins.', landmark: 'suntec' },
      { year: 1998, text: 'Electronic Road Pricing launched. Jurong Island officially created.', landmark: 'jurongisland' },
      { year: 1999, text: 'Esplanade theatres under construction at Marina Bay.' },
    ],
    stats: { population: 3.9, gdp: 21.8, ownership: 92, life: 77 },
    takeaway: 'Boring things — reserves, stable rules, a smooth leadership handover — are what make a small country survive a storm.',
    sources: ['MAS', 'JTC', 'NLB Infopedia'],
  },
  {
    id: '2000s',
    label: '2000s',
    years: '2000 – 2009',
    title: 'Reinvent',
    mood: 'SARS, NEWater, and a bay that became the new face of Singapore.',
    story:
      'The decade began with the dot-com bust, 9/11 and then SARS in 2003, which emptied Changi Airport and closed schools. ' +
      'Singapore responded by diversifying into biomedical science (Biopolis), tourism and finance, and by turning water — its oldest weakness — into a strength with NEWater and desalination. ' +
      'Lee Hsien Loong became Prime Minister in 2004. Marina Barrage sealed Marina Bay into a freshwater reservoir in 2008, and the world\'s first F1 night race lit up the city.',
    challenge:
      'SARS killed 33 people and shook the economy. Water agreements with Malaysia were expiring. Rivals like Hong Kong and Shanghai were competing for the same talent and companies.',
    overcome:
      'The "Four National Taps" — imported water, local catchment, NEWater, desalination — made Singapore water-secure. ' +
      'The controversial decision to allow two integrated resorts (casinos) paid for Marina Bay Sands and Resorts World Sentosa. ' +
      'North East Line (2003) and Circle Line (2009) stitched the island tighter together.',
    milestones: [
      { year: 2002, text: 'Esplanade — "the Durian" — opens.', landmark: 'esplanade' },
      { year: 2003, text: 'SARS outbreak. NEWater launched. North East Line opens.', landmark: 'nel' },
      { year: 2004, text: 'Lee Hsien Loong becomes the third Prime Minister.' },
      { year: 2005, text: 'Biopolis and Fusionopolis anchor one-north research hub.', landmark: 'onenorth' },
      { year: 2008, text: 'Marina Barrage, Singapore Flyer, first F1 night race.', landmark: 'flyer' },
      { year: 2009, text: 'Circle Line opens in stages.', landmark: 'ccl' },
    ],
    stats: { population: 5.0, gdp: 38.6, ownership: 89, life: 81 },
    takeaway: 'Every weakness — even water — can be engineered into a strength if you start early enough.',
    sources: ['PUB', 'MOH', 'LTA'],
  },
  {
    id: '2010s',
    label: '2010s',
    years: '2010 – 2019',
    title: 'Shine',
    mood: 'Marina Bay Sands, Gardens by the Bay, SG50 — and the passing of the founding generation.',
    story:
      'Marina Bay Sands opened in 2010 and its three towers became the new silhouette of Singapore. Gardens by the Bay followed in 2012 with its Supertrees. ' +
      'In 2015 the nation turned 50 — and said goodbye to Lee Kuan Yew, who died in March that year. ' +
      'The Smart Nation initiative (2014) pushed digital services, and Jewel Changi (2019) wrapped the world\'s tallest indoor waterfall around the airport.',
    challenge:
      'A population of 5.5 million on 720 km² raised worries about crowding, housing prices and immigration. Train breakdowns in 2011 and 2017 dented trust in the MRT.',
    overcome:
      'Massive HDB building programmes and cooling measures brought prices down. The MRT network was renewed with new signalling and trains. ' +
      'Downtown Line (2013–17) and Thomson–East Coast Line (from 2019) added over 70 km of track. ' +
      'Punggol became an eco-town and later a digital district.',
    milestones: [
      { year: 2010, text: 'Marina Bay Sands and Resorts World Sentosa open.', landmark: 'mbs' },
      { year: 2012, text: 'Gardens by the Bay opens.', landmark: 'gbtb' },
      { year: 2013, text: 'Downtown Line begins operating.', landmark: 'dtl' },
      { year: 2014, text: 'Smart Nation initiative launched.' },
      { year: 2015, text: 'SG50. Lee Kuan Yew dies on 23 March.' },
      { year: 2018, text: 'Trump–Kim summit held on Sentosa.', landmark: 'sentosa' },
      { year: 2019, text: 'Jewel Changi Airport. Thomson–East Coast Line phase 1.', landmark: 'jewel' },
    ],
    stats: { population: 5.7, gdp: 65.0, ownership: 91, life: 83 },
    takeaway: 'Singapore became a brand. But the generation that built it was handing over — and the next had to decide what to keep.',
    sources: ['URA', 'LTA', 'Smart Nation Singapore'],
  },
  {
    id: '2020s',
    label: '2020s',
    years: '2020 – 2026',
    title: 'Resilience',
    mood: 'A pandemic, a new generation of leaders, and Singapore at 60.',
    story:
      'COVID-19 hit in 2020. A "circuit breaker" lockdown closed the country for two months, and the virus spread through migrant worker dormitories. ' +
      'Singapore vaccinated fast, reopened carefully and kept Changi alive. In May 2024 Lawrence Wong became the fourth Prime Minister. ' +
      'Singapore turned 60 in 2025. Tuas Port — eventually the world\'s largest fully automated terminal — began operating in 2022, and the Singapore Green Plan 2030 set the course for a greener island.',
    challenge:
      'An ageing population, climate change and rising seas, a world of trade wars and great-power rivalry, and young Singaporeans asking whether the old "Singapore Dream" of grades, jobs and flats still fits.',
    overcome:
      'Forward Singapore (2023) gathered views from over 200,000 people and refreshed the social compact: more support for families, workers and seniors. ' +
      'Thomson–East Coast Line completed to Bayshore; Tengah became the first "forest town". ' +
      'At National Day Rally 2026 the government announced an SG Child Support Package for every child and raised the BTO income ceiling.',
    milestones: [
      { year: 2020, text: 'COVID-19 circuit breaker, 7 April – 1 June.' },
      { year: 2021, text: 'Singapore Green Plan 2030 launched.' },
      { year: 2022, text: 'Tuas Port phase 1 begins operations.', landmark: 'tuas' },
      { year: 2023, text: 'Forward Singapore report released.' },
      { year: 2024, text: 'Lawrence Wong becomes the fourth Prime Minister. TEL reaches Bayshore.', landmark: 'tel' },
      { year: 2025, text: 'SG60. Tengah forest town welcomes residents.', landmark: 'tengah' },
      { year: 2026, text: 'NDR 2026: SG Child Support Package; new island planned south of Jurong Island.' },
    ],
    stats: { population: 6.1, gdp: 98.9, ownership: 91.2, life: 84 },
    takeaway: 'Resilience is not about never being hit. It is about having built enough — reserves, trust, systems — to get back up.',
    sources: ['PMO NDR 2026', 'Forward SG 2023', 'SingStat 2025', 'PSA'],
  },
  {
    id: 'future',
    label: 'Future',
    years: '2030 – 2050+',
    title: 'What comes next',
    mood: 'What the government has actually said about the Singapore of 2030, 2040 and beyond.',
    story:
      'The next chapter is already being drawn. "Long Island" — up to 800 ha reclaimed off East Coast — would protect the east coast from rising seas and create a new reservoir and 20 km of waterfront. ' +
      'Changi Terminal 5 (mid-2030s) adds capacity for 50 million more passengers. Tuas Port, finished in the 2040s, will handle 65 million containers a year, freeing the old city-centre port for the Greater Southern Waterfront. ' +
      'The Cross Island Line (first phase around 2030) will link Changi to Jurong, and Paya Lebar Air Base will move, releasing land the size of Bishan for new homes.',
    challenge:
      'Seas may rise by up to 1 m by 2100. By 2030 one in four Singaporeans will be over 65. Artificial intelligence and geopolitics are reshaping the jobs and trade Singapore depends on.',
    overcome:
      'Green Plan 2030 and net zero by 2050. Smart Nation 2.0 (2024) focused on trust, growth and community. Forward SG\'s new social compact. ' +
      'NDR 2026: a new island formed by merging islands south of Jurong Island, undersea tunnels to Tekong under study, and autonomous vehicles to be scaled up when the technology is proven. ' +
      'The goal, in PM Wong\'s words, is a Singapore that stays "trusted, relevant and resilient".',
    milestones: [
      { year: 2030, text: 'Cross Island Line phase 1; Green Plan 2030 targets; Jurong Region Line complete.', landmark: 'crl' },
      { year: 2030, text: 'Paya Lebar Air Base begins relocation; Punggol Digital District matures.', landmark: 'plab' },
      { year: '2030s', text: 'Changi Terminal 5 opens (mid-2030s).', landmark: 't5' },
      { year: '2030s', text: 'Greater Southern Waterfront — homes and parks on old port land.', landmark: 'gsw' },
      { year: '2040s', text: 'Tuas Port fully complete: 65 million TEUs a year.', landmark: 'tuas2' },
      { year: '2040s', text: '"Long Island" reclamation off East Coast — if the plan proceeds.', landmark: 'longisland' },
      { year: 2050, text: 'Net zero emissions target.' },
    ],
    stats: { population: 6.5, gdp: 120, ownership: 90, life: 86 },
    takeaway: 'This chapter is not written yet. Its authors are the people reading this.',
    sources: ['PMO National Day Rally 2026', 'URA Draft Master Plan 2025 — Long Island', 'MOT COS 2026', 'Smart Nation 2.0', 'Green Plan 2030'],
    isFuture: true,
  },
];

// Stats shown in the panel. `future` stats are projections, flagged in the UI.
export const STAT_META = [
  { key: 'population', label: 'Population', unit: 'M', decimals: 1 },
  { key: 'gdp', label: 'GDP per person', unit: 'k US$', decimals: 1 },
  { key: 'ownership', label: 'Own their home', unit: '%', decimals: 0 },
  { key: 'life', label: 'Life expectancy', unit: 'yrs', decimals: 0 },
];

// Simplified outline of the main island, [lon, lat], clockwise from Tuas.
export const MAIN_ISLAND = [
  [103.605, 1.265], [103.615, 1.305], [103.645, 1.335], [103.665, 1.375], [103.69, 1.415],
  [103.72, 1.445], [103.765, 1.46], [103.80, 1.455], [103.835, 1.465], [103.86, 1.44],
  [103.885, 1.425], [103.915, 1.43], [103.945, 1.41], [103.975, 1.405], [104.01, 1.40],
  [104.04, 1.38], [104.045, 1.345], [104.03, 1.32], [103.985, 1.305], [103.95, 1.30],
  [103.91, 1.29], [103.885, 1.283], [103.872, 1.279], [103.869, 1.283], [103.868, 1.288], [103.862, 1.292], [103.854, 1.291], [103.851, 1.285], [103.853, 1.279], [103.858, 1.275], [103.845, 1.265], [103.815, 1.255], [103.78, 1.27],
  [103.745, 1.285], [103.715, 1.285], [103.68, 1.27], [103.64, 1.255],
];

export const ISLETS = [
  { id: 'sentosa', pts: [[103.815, 1.255], [103.84, 1.26], [103.845, 1.245], [103.825, 1.24]] },
  { id: 'jurongisland', pts: [[103.66, 1.265], [103.70, 1.28], [103.72, 1.27], [103.715, 1.245], [103.685, 1.24]] },
  { id: 'ubin', pts: [[103.94, 1.405], [103.98, 1.42], [103.99, 1.405], [103.955, 1.395]] },
  { id: 'tekong', pts: [[104.02, 1.395], [104.06, 1.41], [104.07, 1.38], [104.035, 1.37]] },
  // Future reclamation ("blueprint" islands)
  { id: 'longisland', future: true, pts: [[103.90, 1.283], [103.93, 1.29], [103.975, 1.30], [104.0, 1.315], [103.995, 1.305], [103.97, 1.29], [103.925, 1.28], [103.90, 1.275]] },
  { id: 'southisland', future: true, pts: [[103.68, 1.23], [103.715, 1.235], [103.72, 1.215], [103.69, 1.21]] },
];

// Landmarks. type: hdb | tower | factory | airport | port | dome | garden | wheel | kampong | park | reservoir | base | solar
// era = index into ERAS at which it appears. future landmarks render as translucent blueprints.
export const LANDMARKS = [
  // 1960s
  { id: 'kampong1', era: 0, type: 'kampong', pos: [103.90, 1.36], label: 'Kampongs', blurb: 'Wooden villages with attap roofs, often without water or sewers. Most Singaporeans lived like this in 1960.', removeAt: 3 },
  { id: 'kampong2', era: 0, type: 'kampong', pos: [103.73, 1.40], label: '', blurb: '', removeAt: 3 },
  { id: 'kampong3', era: 0, type: 'kampong', pos: [103.80, 1.39], label: '', blurb: '', removeAt: 4 },
  { id: 'cityhall', era: 0, type: 'civic', pos: [103.851, 1.296], label: 'City Hall & Padang', blurb: 'Where independence was declared in 1965 and the first National Day Parade marched in 1966.' },
  { id: 'queenstown', era: 0, type: 'hdb', pos: [103.80, 1.295], label: 'Queenstown', blurb: 'The first satellite town, started in the 1950s and finished by HDB. The first HDB flats were ready in 1960.', count: 4 },
  { id: 'bhs', era: 0, type: 'hdb', pos: [103.826, 1.288], label: 'Bukit Ho Swee', blurb: 'The 1961 fire destroyed the kampong here. Within a year, emergency HDB flats stood on the ashes.', count: 3 },
  { id: 'toapayoh', era: 0, type: 'hdb', pos: [103.85, 1.335], label: 'Toa Payoh', blurb: 'The first town designed from scratch by HDB (1966). Its dragon playground became a national icon.', count: 6 },
  { id: 'jurong', era: 0, type: 'factory', pos: [103.70, 1.32], label: 'Jurong Industrial Estate', blurb: 'Swamps became factories. Critics called it "Goh\'s Folly" after Finance Minister Goh Keng Swee. It worked.', count: 5 },
  { id: 'tpport0', era: 0, type: 'port', pos: [103.84, 1.265], label: 'Keppel Harbour', blurb: 'Singapore\'s reason to exist since 1819: a deep, sheltered port on the world\'s busiest sea lane.', count: 2 },
  // 1970s
  { id: 'sembawang', era: 1, type: 'port', pos: [103.82, 1.46], label: 'Sembawang Shipyard', blurb: 'The British naval base became a commercial shipyard after the 1971 withdrawal.', count: 2 },
  { id: 'tpport', era: 1, type: 'port', pos: [103.825, 1.262], label: 'Tanjong Pagar Container Terminal', blurb: 'Southeast Asia\'s first container port (1972). By the 1980s Singapore was among the world\'s busiest.', count: 3 },
  { id: 'amk', era: 1, type: 'hdb', pos: [103.845, 1.37], label: 'Ang Mo Kio', blurb: 'A 1970s new town for 200,000 people, with its own town centre, schools and hawker centres.', count: 6 },
  { id: 'bedok', era: 1, type: 'hdb', pos: [103.93, 1.325], label: 'Bedok', blurb: 'Built on land reclaimed from the sea along the East Coast.', count: 5 },
  { id: 'clementi', era: 1, type: 'hdb', pos: [103.765, 1.315], label: 'Clementi', blurb: '', count: 4 },
  { id: 'river', era: 1, type: 'river', pos: [103.843, 1.289], label: 'Singapore River clean-up', blurb: '1977–1987: ten years to turn an open sewer into the waterfront of Boat Quay and Clarke Quay.' },
  { id: 'gardencity', era: 1, type: 'park', pos: [103.815, 1.315], label: 'Garden City', blurb: 'Trees along every road, from 1967. A poor country that looked cared-for attracted investors.' },
  // 1980s
  { id: 'changi', era: 2, type: 'airport', pos: [103.99, 1.36], label: 'Changi Airport', blurb: 'Opened 1981 on reclaimed land. Repeatedly voted the world\'s best airport.' },
  { id: 'tampines', era: 2, type: 'hdb', pos: [103.945, 1.355], label: 'Tampines', blurb: 'Won the UN World Habitat Award in 1992 as a model of public housing.', count: 6 },
  { id: 'bishan', era: 2, type: 'hdb', pos: [103.848, 1.352], label: 'Bishan', blurb: '', count: 4 },
  { id: 'cbd', era: 2, type: 'tower', pos: [103.846, 1.282], label: 'Raffles Place CBD', blurb: 'OUB Centre (1986), UOB Plaza and Republic Plaza all hit the 280 m height cap in the 1980s–90s.', count: 5, height: 1.6 },
  { id: 'nsl', era: 2, type: 'line', color: '#d42e12', label: 'North–South Line (1987)', pts: [[103.775, 1.445], [103.80, 1.44], [103.835, 1.43], [103.845, 1.38], [103.85, 1.335], [103.845, 1.30], [103.848, 1.286], [103.856, 1.276]] },
  { id: 'marina', era: 2, type: 'reclaim', pos: [103.878, 1.281], label: 'Marina reclamation', blurb: 'In the 1970s–80s the sea here was filled in. It would sit empty for 20 years, waiting for Marina Bay.' },
  // 1990s
  { id: 'ewl', era: 3, type: 'line', color: '#009645', label: 'East–West Line (1990)', pts: [[103.95, 1.372], [103.93, 1.35], [103.90, 1.32], [103.875, 1.30], [103.858, 1.297], [103.843, 1.287], [103.82, 1.29], [103.79, 1.30], [103.76, 1.315], [103.72, 1.34], [103.70, 1.34]] },
  { id: 'suntec', era: 3, type: 'tower', pos: [103.86, 1.299], label: 'Suntec City', blurb: 'Five towers and the Fountain of Wealth, completed 1997 on reclaimed land.', count: 4, height: 1.1 },
  { id: 'woodlands', era: 3, type: 'hdb', pos: [103.785, 1.44], label: 'Woodlands', blurb: 'Northern gateway to Malaysia via the Causeway.', count: 5 },
  { id: 'jurongisland', era: 3, type: 'factory', pos: [103.69, 1.26], label: 'Jurong Island', blurb: 'Seven islands merged into one petrochemical hub (1995–2009). Among the world\'s top refining centres.', count: 6 },
  { id: 'pasirris', era: 3, type: 'hdb', pos: [103.95, 1.375], label: 'Pasir Ris', blurb: '', count: 4 },
  { id: 'jurongeast', era: 3, type: 'hdb', pos: [103.74, 1.335], label: 'Jurong East', blurb: '', count: 4 },
  // 2000s
  { id: 'esplanade', era: 4, type: 'esplanade', pos: [103.857, 1.2945], label: 'Esplanade', blurb: 'Theatres on the Bay (2002). Everyone calls it the Durian.' },
  { id: 'nel', era: 4, type: 'line', color: '#9900aa', label: 'North East Line (2003)', pts: [[103.822, 1.265], [103.838, 1.286], [103.852, 1.303], [103.87, 1.34], [103.89, 1.375], [103.90, 1.40]] },
  { id: 'onenorth', era: 4, type: 'tower', pos: [103.79, 1.30], label: 'one-north / Biopolis', blurb: 'Research campus for biomedical science and tech, from 2003.', count: 3, height: 0.8 },
  { id: 'flyer', era: 4, type: 'wheel', pos: [103.871, 1.291], label: 'Singapore Flyer', blurb: '165 m observation wheel (2008), beside the F1 night-race circuit.' },
  { id: 'barrage', era: 4, type: 'barrage', pos: [103.865, 1.2765], label: 'Marina Barrage', blurb: '2008: a dam that turned Marina Bay into a freshwater reservoir in the heart of the city.' },
  { id: 'ccl', era: 4, type: 'line', color: '#fa9e0d', label: 'Circle Line (2009)', pts: [[103.822, 1.265], [103.80, 1.29], [103.79, 1.32], [103.81, 1.345], [103.84, 1.355], [103.87, 1.345], [103.885, 1.32], [103.872, 1.303], [103.862, 1.296]] },
  { id: 'punggol', era: 4, type: 'hdb', pos: [103.905, 1.405], label: 'Punggol', blurb: 'Eco-town of the 2000s, later Singapore\'s first digital district.', count: 5 },
  { id: 'sengkang', era: 4, type: 'hdb', pos: [103.89, 1.39], label: 'Sengkang', blurb: '', count: 4 },
  // 2010s
  { id: 'mbs', era: 5, type: 'mbs', pos: [103.872, 1.2845], label: 'Marina Bay Sands', blurb: 'Three towers with a ship on top (2010). The new silhouette of Singapore.' },
  { id: 'gbtb', era: 5, type: 'garden', pos: [103.876, 1.279], label: 'Gardens by the Bay', blurb: 'Supertrees and cooled conservatories (2012). A garden in a city becoming a city in a garden.' },
  { id: 'rws', era: 5, type: 'dome', pos: [103.825, 1.255], label: 'Resorts World Sentosa', blurb: 'Universal Studios and the second integrated resort (2010).' },
  { id: 'sentosa', era: 5, type: 'park', pos: [103.83, 1.25], label: 'Sentosa', blurb: 'Once a British fort and POW camp. Hosted the Trump–Kim summit in 2018.' },
  { id: 'dtl', era: 5, type: 'line', color: '#005ec4', label: 'Downtown Line (2013–17)', pts: [[103.745, 1.385], [103.77, 1.36], [103.80, 1.34], [103.83, 1.31], [103.846, 1.29], [103.854, 1.277], [103.87, 1.282], [103.885, 1.31], [103.91, 1.33], [103.945, 1.34], [103.96, 1.36]] },
  { id: 'jewel', era: 5, type: 'jewel', pos: [103.981, 1.3535], label: 'Jewel Changi', blurb: 'The world\'s tallest indoor waterfall (40 m), opened 2019.' },
  { id: 'tel', era: 5, type: 'line', color: '#9d5b25', label: 'Thomson–East Coast Line (2019–24)', pts: [[103.785, 1.445], [103.81, 1.42], [103.83, 1.39], [103.84, 1.35], [103.845, 1.31], [103.849, 1.292], [103.86, 1.276], [103.875, 1.282], [103.90, 1.29], [103.94, 1.305]] },
  { id: 'cbd2', era: 5, type: 'tower', pos: [103.843, 1.2745], label: 'Tanjong Pagar Centre', blurb: 'Guoco Tower (2016), at 290 m the tallest building in Singapore.', count: 3, height: 1.7 },
  // 2020s
  { id: 'tuas', era: 6, type: 'port', pos: [103.625, 1.27], label: 'Tuas Port', blurb: 'Phase 1 opened 2022. When complete in the 2040s, the world\'s largest fully automated port.', count: 4 },
  { id: 'tengah', era: 6, type: 'hdb', pos: [103.735, 1.37], label: 'Tengah', blurb: 'The first "forest town" — car-free centre, a forest corridor, centralised cooling.', count: 5 },
  { id: 'bidadari', era: 6, type: 'hdb', pos: [103.87, 1.335], label: 'Bidadari', blurb: '', count: 3 },
  { id: 'solar', era: 6, type: 'solar', pos: [103.72, 1.43], label: 'Tengeh floating solar', blurb: 'One of the world\'s largest inland floating solar farms (2021), on Tengeh Reservoir.' },
  { id: 'pdd', era: 6, type: 'tower', pos: [103.91, 1.41], label: 'Punggol Digital District', blurb: 'Business park plus SIT campus, opening from 2024.', count: 2, height: 0.7 },
  // Future (blueprints)
  { id: 'crl', era: 7, type: 'line', future: true, color: '#97c616', label: 'Cross Island Line (2030+)', pts: [[103.99, 1.36], [103.95, 1.37], [103.90, 1.37], [103.85, 1.36], [103.80, 1.36], [103.76, 1.35], [103.72, 1.34], [103.70, 1.34]] },
  { id: 't5', era: 7, type: 'airport', future: true, pos: [104.02, 1.345], label: 'Changi Terminal 5', blurb: 'Mid-2030s: capacity for 50 million more passengers a year.' },
  { id: 'tuas2', era: 7, type: 'port', future: true, pos: [103.615, 1.25], label: 'Tuas Port (complete)', blurb: '2040s: 65 million TEUs a year, nearly 60% more than today.', count: 4 },
  { id: 'gsw', era: 7, type: 'tower', future: true, pos: [103.81, 1.265], label: 'Greater Southern Waterfront', blurb: 'When the city port moves to Tuas, 30 km of southern coast open up for homes and parks.', count: 5, height: 1.0 },
  { id: 'plab', era: 7, type: 'hdb', future: true, pos: [103.905, 1.36], label: 'Paya Lebar Air Base → new town', blurb: 'After 2030 the air base moves, freeing 800 ha — and lifting height limits across the east.', count: 5 },
  { id: 'longisland', era: 7, type: 'reservoir', future: true, pos: [103.95, 1.292], label: '"Long Island"', blurb: 'Up to 800 ha reclaimed off East Coast: coastal protection, a new reservoir, 20 km of waterfront.' },
  { id: 'southisland', era: 7, type: 'factory', future: true, pos: [103.70, 1.222], label: 'New southern island', blurb: 'NDR 2026: islands south of Jurong Island to be merged into one new island.', count: 3 },
  { id: 'tekongtunnel', era: 7, type: 'line', future: true, color: '#ffffff', label: 'Tekong undersea tunnel (study)', pts: [[104.01, 1.40], [104.04, 1.385]] },
];

export const INTRO_STEPS = [
  { kicker: 'HELLO, SINGAPORE / 01', title: 'A small island with a big story', body: 'This is Singapore in 3D. Every era, buildings, towns and train lines grow out of the ground — the way they did in real life.' },
  { kicker: 'HELLO, SINGAPORE / 02', title: 'Press an era to travel in time', body: 'Use the timeline at the top, your ← → keys, or press Play. The panel on the right tells you what happened, what went wrong, and how Singapore got through it.' },
  { kicker: 'HELLO, SINGAPORE / 03', title: 'Tap a label to learn more', body: 'Click any landmark on the island for the story behind it. Switch between day and night. Then decide: what will you build next?' },
];
