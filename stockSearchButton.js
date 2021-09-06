export let createSearchInput = () =>{
    let searchSection = document.querySelector('#seacrchDivSection');
    let br = document.createElement('br');
    searchSection.appendChild(br);      //Add line break between each input
    
    let createInput = document.createElement('input');
    let idNum = idValue();
    let idVar = 'searchInput'+idNum;
    let inputCreation = searchSection.appendChild(createInput);
    inputCreation.setAttribute('id', idVar);
    inputCreation.setAttribute('class', 'searchInput'); 
    inputCreation.setAttribute('type', 'text');   //setting id and class for appended input fields.
    inputCreation.setAttribute('tabindex', idNum);
}

export let deleteSearchInput = () =>{
    let allSearchInputs = document.querySelectorAll('.searchInput');
    let numberOfInputs = allSearchInputs.length - 1;
    if(numberOfInputs > 0){     //clear 
    let lastInput = allSearchInputs[numberOfInputs];
    lastInput.remove();
    }

    let searchInputBrs = document.querySelector('#seacrchDivSection').querySelectorAll('br');
    let numberOfBrs = searchInputBrs.length - 1
    if(numberOfBrs+1 >= 1){
    let lastBr = searchInputBrs[numberOfBrs];
    lastBr.remove();
    }
}

let idValue = () =>{
    let inputNum = document.querySelectorAll('.searchInput');
    return inputNum.length+1  //Counter for adding id to added input field
    
}