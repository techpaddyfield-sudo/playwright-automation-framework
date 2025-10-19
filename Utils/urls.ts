// urls.ts
const baseDomain = 'troweprice.com/personal-investing/tools/fund-research/';

export const baseUrls: Record<string, string> = {
    prod: `https://www.${baseDomain}`,
};

export enum Routes {
    FundResearch = '',
    ETFScreener = 'etf',
    WatchList = 'watchlist',
}

export const generateUrls = (baseURL: string = baseUrls.prod) => ({
    fundResearch: `${baseURL}${Routes.FundResearch}`,
    etfScreener: `${baseURL}${Routes.ETFScreener}`,
    watchList: `${baseURL}${Routes.WatchList}`,
});
