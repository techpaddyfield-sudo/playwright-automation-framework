// urls.ts
const baseDomain = 'troweprice.com/personal-investing/tools/fund-research/';

export const baseUrls: Record<string, string> = {
    prod: `https://www.${baseDomain}`,
};

export const Routes = {
    FundResearch: 'https://www.troweprice.com/personal-investing/tools/fund-research/',
    ETFScreener: 'https://www.troweprice.com/personal-investing/tools/etf',
    WatchList: 'https://www.troweprice.com/personal-investing/tools/watchlist',
} as const;
export const generateUrls = (baseURL: string = baseUrls.prod) => ({
    fundResearch: `${baseURL}${Routes.FundResearch}`,
    etfScreener: `${baseURL}${Routes.ETFScreener}`,
    watchList: `${baseURL}${Routes.WatchList}`,
});
