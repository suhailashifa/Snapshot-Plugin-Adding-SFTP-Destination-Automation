describe('Snapshot - Destination - SFTP : Automation', () => {

  it('Add Destination', () => {

      // Login
      cy.visit('https://test2suhailashifa.tempurl.host/wp-login.php?');
      cy.get('#user_login').type('suhaila.shifa@incsub.com');
      cy.get('#user_pass').type('1234567891011');
      cy.get('#wp-submit').click();

      //  // Check if the onboarding modal exists before proceeding
      // cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=smush');
      // cy.wait(2000);
      // cy.get('body').then(($body) => {
      //     if ($body.find('div#smush-onboarding-content.loaded').length > 0) {
      //       // If modal exists, click the skip button
      //       cy.get('.sui-modal-skip.smush-onboarding-skip-link').click();
      //     }
      //   });

      // Step 1: Navigate to Snapshot > Destination
      cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=snapshot-destinations');
      cy.get('#snapshot-add-destination').click(); // Click on Add Destination button
      cy.get('#ftp-destination').click( {force: true}); // Select FTP/SFTP
      cy.contains('Next').click(); // Click Next
      cy.get('#snapshot-add-destination-dialog-slide-2-ftp .snapshot-ftp-type div:nth-child(2)').click(); // Ensure SFTP tab is selected

      
    
      // Step 2a: Test Connection by keeping the mandatory fields empty
      cy.get('#ftp-port').clear(); 
      cy.get('#ftp-details-limit').clear(); 
      cy.get('#ftp-timeout').clear(); 
      cy.get('#ftp-user').clear(); 
      cy.get('#ftp-password').clear(); 
      cy.get('#ftp-directory').clear();
      cy.get('#snapshot-test-connection__ftp').click();
      
      // Step 2b: Check for empty field validation error messages
      cy.get('span#error-destination-ftp-host.sui-error-message').should('be.visible').and('contain', 'Host is required'); 
      cy.get('span#error-destination-ftp-port.sui-error-message').should('be.visible').and('contain', 'Port number is required'); 
      cy.get('span#error-destination-ftp-user.sui-error-message').should('be.visible').and('contain', 'Username is required'); 
      cy.get('span#error-destination-ftp-password.sui-error-message').should('be.visible').and('contain', 'Password is required');
      cy.get('span#error-destination-ftp-directory.sui-error-message').should('be.visible').and('contain', 'Path is required');   
      cy.get('span#error-ftp-details-limit.sui-error-message').should('be.visible').and('contain', 'A valid storage limit is required.');

     
    
  });

});