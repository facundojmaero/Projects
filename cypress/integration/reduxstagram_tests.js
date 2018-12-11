describe('Reduxstagram Test', function () {

    beforeEach(() => {
        cy.fixture("comments").as("user");
      });

    it("Should increase the like count by 1", function () {
        cy.visit('http://localhost:7770/')

        cy.get('div.grid-photo-wrap').first().click()

        cy.url().should('include', '/view/')

        cy
            .get('button.likes').should('contain', 56)
            .click().should('contain', 57)
    });

    it("Should post a comment", function () {
        cy.visit('http://localhost:7770/');

        cy.get('div.grid-photo-wrap').first().click();

        cy.url().should('include', '/view/');

        cy.get('form.comment-form').within(() => {
            cy.get('input').first().should('have.attr', 'placeholder', 'author')
                .type(this.user.author).should('have.value', this.user.author);
            cy.get('input').eq(1).should('have.attr', 'placeholder', 'comment')
                .type(this.user.comment).should('have.value', this.user.comment);
        })
        cy.get('form.comment-form').submit();

        cy.get('div.comment').last().find('strong').should('contain', this.user.author);
        cy.get('div.comment').last().should('contain', this.user.comment);
        
    });;

    it("Should delete a comment", function () {
        cy.visit('http://localhost:7770/');

        cy.get('div.grid-photo-wrap').first().click();

        cy.url().should('include', '/view/');

        cy.get('div.comment').should('have.length', 4);
        cy.get('div.comment').last().find('button.remove-comment').click();
        cy.get('div.comment').should('have.length', 3);
        
    });

    it("Should go back to main screen via big logo", function() {
        cy.visit('http://localhost:7770/');
        cy.get('div.grid-photo-wrap').first().click();
        cy.url().should('include', '/view/');
        cy.get('a').contains('Reduxstagram').click();
        cy.url().should('eq', 'http://localhost:7770/');
    });

    it("Should like a post from main page", function() {
        cy.visit('http://localhost:7770/');
        cy.get('button.likes').first().should('contain', 56).click().should('contain', 57);
    });
})