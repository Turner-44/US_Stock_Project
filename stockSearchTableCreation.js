import {allSearcInputs, getLocator} from './stockSearch.js';
import {formatDataFromAPI} from './stockSearchFormatDisplayData.js';

export let createTableRows = (allInputSearchValueQuerySelectorResults) =>{
    let tableLocation = document.querySelector('#displayTable');
        
    allInputSearchValueQuerySelectorResults.forEach((search) => {
        let newDataRow = document.createElement('tr');
        let newDataRowCreated = tableLocation.appendChild(newDataRow);
        let rowId = (search.value.toUpperCase())+'rowEntry';
        newDataRowCreated.setAttribute('id',rowId)   //Add new row to the table
        newDataRowCreated.setAttribute('class','searchResults')
    });

};

export let inputSearchSymbols = () =>{
    allSearcInputs().forEach(arrayEntry =>{ 
        let tableDataLocation = document.querySelector('#'+arrayEntry+'rowEntry')
        let newEntry = document.createElement('td');
        let newTDCreated = tableDataLocation.appendChild(newEntry);
        newTDCreated.innerHTML = arrayEntry.toUpperCase();
    })
}

export let printKeyMetricsInTable = (pageSelected) =>{

    let names = retrieveColumnsForDisplay(pageSelected);
    let tableLocation = document.querySelector('#displayTable');

    let newRow = document.createElement('tr');
    let newRowCreated = tableLocation.appendChild(newRow);
    newRowCreated.setAttribute('id','keyMetrics');    //Create new table row to hold headers

    names.forEach(title => {
    let headerLocation = document.querySelector('#keyMetrics')
    let header = document.createElement('th');
    let headerCreated = headerLocation.appendChild(header);
    headerCreated.innerHTML = title;    //Cycle through array, create new header tabs for each and print hearder values into new row
    });    
}

let retrieveColumnsForDisplay = pageSelected =>{
    let SectionObject = {
        summary:["Symbol", "Company Name", "Primary Exchange", "PE Ratio", "Latest Price", "Change Percent", "52 Week High", "52 Week Low"],
        dividends:["Symbol","Frequency", "Amount"],
        stats:["Symbol", "Market Cap", "Employees"]
    }
    return SectionObject[pageSelected];

}

export let createCollectionOfAllSearchInputs = allInputSearchValueQuerySelectorResults =>{
    let symbolList = new Set();
    allInputSearchValueQuerySelectorResults.forEach(value =>{
        if(value.value){
            symbolList.add(value.value.toUpperCase());
        }
    })
    return [...symbolList];
}

// export let createCollectionOfAllSearchInputs = allInputSearchValueQuerySelectorResults =>{
//     let arrayResult = []
//     allInputSearchValueQuerySelectorResults.forEach(value =>{
//         if(value.value){
//         arrayResult.push(value.value.toUpperCase());
//         }
//     })
//     //)
//     return arrayResult;
// }

let retrieveJsonDataColumnsForAPICall = pageSelected =>{
    let jsonDataColumnsByPage = {
        summary:["companyName", "primaryExchange", "peRatio", "latestPrice", "changePercent", "week52High", "week52Low"],
        dividends:["frequency", "amount"],    
        stats:["marketcap", "employees"]
    }
    return jsonDataColumnsByPage[pageSelected];
}

export let printJsonValues = async (pageSelected,allInputSearchValues) => {

    let columnAPINames = retrieveJsonDataColumnsForAPICall(pageSelected);
    formatDataFromAPI(columnAPINames,pageSelected);

    for(let i = 0; i < allSearcInputs().length; i++){

        console.log(allInputSearchValues)
        console.log(pageSelected)
        console.log(i)
        let locator = await getLocator(pageSelected,i);

        console.log(locator);
        console.log(columnAPINames);

        await columnAPINames.forEach( nameKey => {  
             //Issue with locator when appending child.!!!!++++++++++++++++++
            let className = generateClassName(locator,nameKey);
            console.log(className)
            let tableDataLocation = document.querySelector('#'+allInputSearchValues[i]+'rowEntry')
            console.log(tableDataLocation)
            let tableData = document.createElement('td'); 
            let tableDataCreated = tableDataLocation.appendChild(tableData);
            tableDataCreated.setAttribute('class',className);
            tableDataCreated.innerHTML = (locator === undefined ? 'N/A' : locator[nameKey]);     //Using the name array with API names, match these with JSON call and populate values as td in the new row.
        });  
    }        
}

let generateClassName = (locator,nameKey) =>{
    
    let className = null;

        switch(nameKey){
            case 'changePercent':
                className =  generateChangePercentClassName(locator,nameKey)
            break;

            default:
                className = 'locator'+nameKey;
            break;
        }
    return className;
}

let generateChangePercentClassName = (locator,nameKey) =>{
    let percentChange;

    if(locator[nameKey].includes('+')){
        console.log(locator);
        percentChange = 'Postive'
    }
    else if(locator[nameKey].includes('-')){
        percentChange = 'Negative'
    }
    else{
        percentChange = 'Unchanged'
    }

    return 'locator'+percentChange+nameKey;
}