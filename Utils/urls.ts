const baseDomain = 'troweprice.com/personal-investing/tools/fund-research/';

export const baseUrl: Record<string, string> = {
    prod: `https://www.${baseDomain}`
};

export enum Routes {

    FundResearch = '',
    ETFScreener = 'etf'

}

export const generatedUrls = (baseURL: string = '') => ({
    fundResearch: `${baseURL}${Routes.FundResearch}`,
    etfScreener: `${baseURL}${Routes.ETFScreener}`

});