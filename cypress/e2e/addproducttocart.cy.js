describe('Launch Website Address', function () {


    it('Add To Cart', () => {

        //1. The user visits the address
        cy.visit('https://www.automationexercise.com')

        //1a. User verifies they went to the right address
        cy.get('.active > :nth-child(1) > h1', { timeout: 5000 }).should('contain', 'AutomationExercise')
        // cy.wait(3000)

        //2. The user clicks on the “Cart” icon from the header.
        cy.contains('Cart').click({ force: true })

        //2a. Verify that the shopping cart is empty at the moment
        cy.get('b').should('contain', 'Cart is empty!')

        //3. The user clicks on the Product on the header
        cy.contains('Products').click({ force: true })

        //3a. click on the T-shirt option under the men option
        cy.get(':nth-child(2) > .panel-heading > .panel-title > a').click({ force: true })
        cy.wait(3000)

        //Click T-shirt
        cy.get('#Men > .panel-body > ul > :nth-child(1) > a').click({ force: true })
        cy.wait(3000)


        //3b. Add 3 Random Products to the cart
        //Add Product 1
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click({ force: true })

        //Confirm the 1st product has been added to cart
        cy.get('.modal-body > :nth-child(1)').should('contain', 'Your product has been added to cart.')

        //click on continue shopping to add product 2
        cy.get('.modal-footer > .btn').click({ force: true })
        cy.wait(3000)

        //Add Product 2
        cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click({ force: true })

        //Confirm the 2nd product has been added to cart
        cy.get('.modal-body > :nth-child(1)').should('contain', 'Your product has been added to cart.')

        //click on continue shopping to add product 3
        cy.get('.modal-footer > .btn').click({ force: true })
        cy.wait(3000)

        //Add Product 3
        cy.get(':nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn').click({ force: true })

        //Confirm the 3rd product has been added to cart
        cy.get('.modal-body > :nth-child(1)').should('contain', 'Your product has been added to cart.')
        cy.wait(3000)

        //3c. Click View Cart button in the pop-up
        cy.get('u').click({ force: true })

        //3d. confirm that click on View Cart redirects the user to the cart page
        cy.url().should('eq', 'https://www.automationexercise.com/view_cart')

        //3e. verify there are items in the cart and they all have amounts
        cy.get('.description').should('be.visible')
        cy.get('.price').should('be.visible')

        //confirm the agent wallet balance is visible on the dashboard
        const product1 = '#product-2 > .cart_description > h4 > a'
        cy.get(product1).should('be.visible')
        const price1 = '#product-2 > .cart_price > p'
        cy.get(price1).should('be.visible')

        if (cy.get('.description').length === 0) {
            throw new Error('No product 1 in Cart')
        }
        else {
            // Log the text content of the element
            cy.get('.description').invoke('text').then(text => {
                cy.log('Product Name:' + ' ' + product1);
                cy.log('Price' + ' ' + price1);

            });
        }
    });
});