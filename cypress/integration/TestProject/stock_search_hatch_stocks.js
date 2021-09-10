/// <reference types="cypress" />

import 'cypress-wait-until';

Cypress.config()


describe('testBasicToolBehaviour', () =>{

    it('openWebsite', () =>{
        cy.visit('http://localhost:4000/')

        cy.get('#PageTitle').should('have.text','Stock Search')
    })

    it('checkInputAddAndRemove', () =>{
        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput2').should('be.visible')

        cy.get('#removeSearchInputBtn').click().blur()
        cy.get('#searchInput2').should('not.exist');
    })

    it('checkInputButtonContent', () =>{
        cy.get('#submitSearchBtn').should('be.visible')
        cy.get('#addSearchInputBtn').should('be.visible')
        cy.get('#removeSearchInputBtn').should('be.visible')
    })

    it('searchAllHatchValues', () =>{

        cy.get('#searchInput1').type('ET').blur()
        .should('have.value','ET')
       
        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput2').should('be.visible').type('CARA').blur()
        .should('have.value','CARA')
        
        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput3').type('NERV').blur()
        .should('have.value','NERV')

        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput4').type('LTRN').blur()
        .should('have.value','LTRN')

        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput5').type('NIO').blur()
        .should('have.value','NIO')

        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput6').type('ALKS').blur()
        .should('have.value','ALKS')

        cy.get('#addSearchInputBtn').click().blur()
        cy.get('#searchInput7').type('RKLB').blur()
        .should('have.value','RKLB')

        cy.get('#submitSearchBtn').click().blur()
    })

    // it('searchSingleValue', () =>{

    //     cy.get('#searchInput1').should('be.visible').type('CARA').blur()
    //     .should('have.value','CARA')
        
    //     cy.get('#submitSearchBtn').click().blur()
    // })

    it('checkInputButtonContentPostSearch', () =>{
        cy.get('#displaySummary', {timeout:20000})
        .should('be.visible')
        
        cy.get('#searchInput1').should('not.be.visible')
        cy.get('#submitSearchBtn').should('not.be.visible')
        cy.get('#addSearchInputBtn').should('not.be.visible')
        cy.get('#removeSearchInputBtn').should('not.be.visible')
        cy.get('#editSearchInputBtn').should('be.visible')
    })

    it('checkTableContent', () =>{
        cy.get('#displaySummary').should('be.visible')
        cy.get('#displayDividend').should('be.visible')
        cy.get('#displayStats').should('be.visible')
    })

    it('checkLatestPriceFormat', () =>{
        let elementSelector = cy.get('.locatorlatestPrice').last();
        elementSelector.should(selector =>{
            let elementText = selector.text()
            expect(elementText).to.include('$');
        })
        
    })

    it('checkWeek52HighFormat', () =>{
        let elementSelector = cy.get('.locatorweek52High').last();
        elementSelector.should(selector =>{
            let elementText = selector.text()
            expect(elementText).to.include('$');
        })
    })

    it('checkWeek52LowFormat', () =>{
        let elementSelector = cy.get('.locatorweek52Low').last();
        elementSelector.should(selector =>{
            let elementText = selector.text()
            expect(elementText).to.include('$');
        })
    })

    it('changePercentFormat', () =>{

        
        cy.get('body').then( body =>{
            if (body.find('.locatorPostivechangePercent').length > 0){  //Checks page for presents of element with class name 
                let elementSelector = cy.get('.locatorPostivechangePercent').last();
                elementSelector.should(selector =>{
                let elementText = selector.text()
                expect(elementText).to.include('+');
                })   
            }     
        })
        cy.get('body').then( body =>{
            if (body.find('.locatorPostivechangePercent').length > 0){
                let elementSelector = cy.get('.locatorNegativechangePercent').last();
                elementSelector.should(selector =>{
                let elementText = selector.text()
                expect(elementText).to.include('-');
                })
            }
        })
    })
})