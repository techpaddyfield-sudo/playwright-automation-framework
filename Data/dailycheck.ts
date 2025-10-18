export interface Fund{
    type : string;
    class: string;
    ticker:string;
    name:string;
}
export const mutalFunds:Fund[]=[

    {type:'Stock', class: 'I Class', ticker: 'PNAIX' , name:'All- Cap Opportunities Fund-I Class (PNAIX)' },
    {type: 'Stock',class: 'Invetsor Class',ticker:'PRFDX',name:'Equity Income Fund (PRFDX) },'},
    {type: 'Stock',class :'Invetsor Class',ticker:'TRBCX',name:'Blue Chip Growth Fund (TRBCX)'},

    {type:'Bond', class: 'I Class',ticker:'PGMSX', name :'Global Multi-Sector Bond Fund - I Class (PGMSX)'},
    {type :'Bond',class:'Invetsor Class', ticker:'PRCIX',name :'New Income Fund (PRCIX)' },
    {type :'Target Date',class:'Invetsor Class', ticker:'TRRCX',name :'Retirement 2030 Fund (TRRCX)' },
    {type :'Money Market',class:'Invetsor Class', ticker:'PRRXX', name :'Government Money Fund (PRRXX)' },
];