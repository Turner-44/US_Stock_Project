import {allSearcInputs, getLocator} from './stockSearch.js';

export let formatDataFromAPI = (columnAPINames,pageSelected) =>{

    switch(pageSelected){
        case 'summary':
            formatSummaryData(columnAPINames,pageSelected);
        break;

        case 'dividends':
            formatDividendData(columnAPINames,pageSelected);
        break;
    }
}

let formatSummaryData = async (columnAPINames,pageSelected) =>{

    for(let a = 0; a < allSearcInputs().length; a++){

        let locator = await getLocator(pageSelected,a);

        for(let i = 0; i < columnAPINames.length; i++){
            let propertyName = columnAPINames[i];

            if(typeof locator[propertyName] == 'number'){

                switch(propertyName){
                    case 'latestPrice': 
                    case 'week52High': 
                    case 'week52Low': 
                    locator[propertyName] = '$'+(locator[propertyName].toFixed(2));
                    break;

                    case 'changePercent': 
                        let dataValueReturned = Math.sign(locator[propertyName]);
                        if(dataValueReturned == 1){
                            locator[propertyName] = '+'+((locator[propertyName]*100).toFixed(1))+'%';
                        }
                        else{
                            locator[propertyName] = ((locator[propertyName]*100).toFixed(1))+'%';
                        }
                }
            }
        }
    }
    
}


let formatDividendData = async (columnAPINames,pageSelected) =>{

    for(let i = 0; i < allSearcInputs().length; i++){

        let locator = await getLocator(pageSelected,i);
    
        for(let a = 0; a < columnAPINames.length; a++){
            let propertyName = columnAPINames[a];
            console.log(propertyName)
            console.log('locator[propertyName]')


            if(locator === undefined){
                console.log('Dividend is N/A for this stock')
                return 'N/A'
            }
            else{

                if(typeof locator[propertyName] == 'number'){

                    switch(propertyName){
                        case 'amount': 
                        locator[propertyName] = '$'+(locator[propertyName].toFixed(2));
                        break;
                    }
                }
            }
        }
    }
}
