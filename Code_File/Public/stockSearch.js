import configValue from './config.mjs';
import * as buttonAction from './stockSearchButton.js';
import * as tableCreation from './stockSearchTableCreation.js';

const configFile = new configValue(); 

let allDataReturnedByAPI = [];

let clearExistingSearchData = () => {

    if (allDataReturnedByAPI != []){
       
        allDataReturnedByAPI = [];

    }

}

let allSearchInputFromDOM = () =>{

    return document.querySelectorAll('.searchInput');

}

export let allSearcInputs = () =>{ 

    return retrieveCollectionOfAllSearchInputs(allSearchInputFromDOM())

}

let returnStockData = async () =>{

    let allInputSearchValues = retrieveCollectionOfAllSearchInputs(allSearchInputFromDOM());
    await returnJSONData(allInputSearchValues, retrieveJsonEndPoints());


}

let retrieveCollectionOfAllSearchInputs = allInputSearchValueQuerySelectorResults =>{

    return tableCreation.createCollectionOfAllSearchInputs(allInputSearchValueQuerySelectorResults);

}

let retrieveJsonEndPoints = () =>{
    
    let endpointTargets = ['summary', 'dividends', 'stats']
    return endpointTargets;

}

let returnJSONData = async (allInputSearchValues) =>{

    let collectionOfCalls = createCollectionOfAPICalls(allInputSearchValues);
        
    for(let i = 0; i < collectionOfCalls.length; i++){
        allDataReturnedByAPI.push({[allInputSearchValues[i]]:await makeAPICalls(collectionOfCalls[i].symbol[allInputSearchValues[i]])});

    }
}

function APICallCollection(symbol) { 
    this.symbol = symbol;
}

let createCollectionOfAPICalls = InputResults =>{

    let APICalls = [];

    InputResults.forEach((search) => {

        let summaryResult = 'https://cloud.iexapis.com/stable/stock/'+search+'/'+configFile.tokenValue();
        let dividendResult = 'https://cloud.iexapis.com/stable/stock/'+search+'/dividends/next/'+configFile.tokenValue();
        let statsResult = 'https://cloud.iexapis.com/stable/stock/'+search+'/stats/'+configFile.tokenValue();

        APICalls.push(new APICallCollection({[search]:[summaryResult,dividendResult,statsResult]}));
    });

    return APICalls;

}

let makeAPICalls = async collectionOfCalls =>{
    console.log('collectionOfCalls makeAPICall')
    console.log(collectionOfCalls)
    let results = await Promise.all(collectionOfCalls.map(calls =>{
 
         let callResults = fetch(calls)
         .then(resp => resp.json());
         return callResults;
     }));
    
     return results;
}




export let getLocator = (pageSelected,a) =>{
    
    let indexOfSelection = (retrieveJsonEndPoints()).indexOf(pageSelected);
    let allSearchInputCollection = allSearcInputs();
    let locatorValue = allDataReturnedByAPI[a][allSearchInputCollection[a]][indexOfSelection];

    return locatorValue
}

let populateTableContents = pageSelected =>{
    
    tableCreation.printKeyMetricsInTable(pageSelected);
    tableCreation.createTableRows(allSearchInputFromDOM());
    tableCreation.inputSearchSymbols();
    tableCreation.printJsonValues(pageSelected,allSearcInputs());
    console.log('allSearcInputs()')
    console.log(allSearcInputs())
    focusOnTable();

}



let toggleOnSearchResultDisplay = () =>{
    document.querySelector('#searchResultDisplay').style.visibility = 'visible';
    document.querySelector('#loadingContainer').style.display = 'none';
    document.querySelector('#seacrchDivSection').style.display = 'none';
    document.querySelector('#editSearchInputsContainer').style.display = 'block';
}

let toggleOffSearchResultDisplay = () =>{
    document.querySelector('#searchResultDisplay').style.visibility = 'hidden';
    document.querySelector('#loadingContainer').style.display = 'block';
}

let editInputBtnSelection = () =>{
    document.querySelector('#seacrchDivSection').style.display = 'block';
    document.querySelector('#editSearchInputsContainer').style.display = 'none';
}

let clearTableRows = () =>{
    document.querySelector('#displayTable').querySelectorAll('tr').forEach(node =>{
        node.remove()
    })
}

let selectedPageDisplay = element =>{  
    clearPageSelected();
    $(element).addClass('tableConstructorSelected');
}

let clearPageSelected = () =>{
    $('.tableConstructor').removeClass('tableConstructorSelected');
}

let focusOnTable = () =>{
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#displayTable").offset().top
    }, 500);
};

//=======================Input Functions=================================

$(() =>{
    
    $('#submitSearchBtn').on('click', async() =>{
        toggleOffSearchResultDisplay();
        clearPageSelected();
        clearExistingSearchData();
        clearTableRows();
        await returnStockData('summary');
        populateTableContents('summary');
        toggleOnSearchResultDisplay();
    });

    $('#addSearchInputBtn').on('click', () =>{
        buttonAction.createSearchInput();
    }); 

    $('#removeSearchInputBtn').on('click', () =>{
        buttonAction.deleteSearchInput();
    }); 

    $('#displaySummary').on('click', async e =>{
        e.preventDefault();
        //$('#displaySummary').addClass('tableConstructorSelected')
        toggleOffSearchResultDisplay();
        selectedPageDisplay('#displaySummary');
        clearTableRows();
        //await tableCreation.printJsonValues('summary',allSearcInputs());
        populateTableContents('summary');
        toggleOnSearchResultDisplay();
    }); 

    $('#displayStats').on('click', async e =>{
        e.preventDefault();
        //$('#displayStats').addClass('tableConstructorSelected')
        toggleOffSearchResultDisplay();
        selectedPageDisplay('#displayStats');
        clearTableRows();
        //await tableCreation.printJsonValues('stats',allSearcInputs());
        populateTableContents('stats');
        toggleOnSearchResultDisplay();
    }); 

    $('#displayDividend').on('click', async e =>{
        e.preventDefault();
        //$('#displayDividend').addClass('tableConstructorSelected')
        toggleOffSearchResultDisplay();
        selectedPageDisplay('#displayDividend');
        clearTableRows();
        //await tableCreation.printJsonValues('dividends',allSearcInputs());
        populateTableContents('dividends');
        toggleOnSearchResultDisplay();
    }); 

    $('#editSearchInputBtn').on('click', () =>{
        editInputBtnSelection();
    })
});