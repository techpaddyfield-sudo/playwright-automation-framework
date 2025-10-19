import {Locator, Page,Selectors} from'@playwright/test'


export class FundScreenerTableHeaderComponets{

    readonly page:Page;
   // common header for all tabs
   readonly fundName: Locator;
   //summary Tab
   readonly overallMorningstarRating:Locator;
   readonly riskPotential:Locator;
   readonly sevenDayYieldWithWaiver:Locator;
   readonly sevenDayYieldWithoutWaiver:Locator;
   readonly dailyYTD:Locator;
   readonly oneYearReturn:Locator;
   readonly fiveYearReturn:Locator;
   readonly tenYearReturn:Locator;
   readonly sinceInception :Locator;
   readonly grossExpenseRatio: Locator;
   readonly netExpenseRatio:Locator;
  
   //category Tab

    readonly morningstarCategory: Locator;
    readonly morningstarSubCategory: Locator;
    readonly alpha:Locator;
    readonly beta:Locator;
    readonly annualTurnoverRate:Locator;


    //price tab

    readonly currentNav:Locator;
    readonly navChange:Locator;
    readonly changePercentage: Locator;
    readonly navLowHigh:Locator;

    //yeilds Tab

    readonly Waiver:Locator;
    readonly WaiverOut:Locator;
    readonly DailyYTD:Locator;
    readonly MonthlyYTD:Locator;


 
    constructor (page:Page){
    this.page=page;
    //common header( shared all tabs)
    this.fundName=page.locator(this.selector('name'));
    
    //initialize the locator for summary tab
    this.overallMorningstarRating=page.locator(this.selector('fiveStarRating'));
    this.riskPotential=page.locator(this.selector('riskLevel'));
    this.sevenDayYieldWithWaiver=page.locator(this.selector('sevenDayYieldSimple'));
    this.sevenDayYieldWithoutWaiver=page.locator(this.selector('unsubsidizedSevenDayYieldSimple'));
    this.dailyYTD=page.locator(this.selector('fundReturn'));
    this.oneYearReturn=page.locator(this.selector('oneYearReturn'));
    this.fiveYearReturn=page.locator(this.selector('fiveYearReturn'));
    this.tenYearReturn=page.locator(this.selector('tenYearReturn'));
    this.sinceInception=page.locator(this.selector('sinceInceptionReturn'));
    this.grossExpenseRatio=page.locator(this.selector('grossExpenseRatio'));
    this.netExpenseRatio=page.locator(this.selector('netExpense'));
 //initialize the locator for  category-volatility

     this.morningstarCategory =page.locator(this.selector('broadAssetClass'));
     this.morningstarSubCategory=page.locator(this.selector('morningStarCategoryName'));
     this.alpha=page.locator(this.selector('price'));
     this.beta=page.locator(this.selector('beta'));
     this.annualTurnoverRate=page.locator(this.selector('turnoverRateTwelveMonth'));

      //initialize the locator for  price

      this.currentNav=page.locator(this.selector('price'));
      this.navChange=page.locator(this.selector('priceChange'));
      this.changePercentage=page.locator(this.selector('pricePercentChange'));
      this.navLowHigh=page.locator(this.selector('priceLowHigh'));

      //initialize the locator for  Yields

      this.Waiver=page.locator(this.selector('sevenDayYieldSimple'));
      this.WaiverOut=page.locator(this.selector('unsubsidizedSevenDayYieldSimple'));
      this.dailyYTD=page.locator(this.selector('dailyYTDReturn'));
      this.MonthlyYTD=page.locator(this.selector('ytdMonthlyTotalReturns'));

     }  

   

   


//Used to generate dynamic locators for table columns or grid cells in a test automation framework.
    private selector(colID:string):string {
    return `[col-id="${colID}"][role="presentation"]`
   }
//Finds a <span> with attribute ref="eText" inside the header cell.
//Returns the text content of that span.

    async getHeaderText(headerLocator:Locator) :Promise<string |null>{
    return await headerLocator.locator('span[ref="eText"]').textContent();
   }
}

