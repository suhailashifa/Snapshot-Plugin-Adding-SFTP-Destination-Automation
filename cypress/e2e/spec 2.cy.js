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
  
        // Declaring all the Valid and Invalid values
        const valid_username = 'suhailashifa';
        // const invalid_username = 'invalid username';
        const valid_password = '1234567891011';
        // const invalid_password = 'inavlid password';
        const valid_host = 'test2suhailashifa.tempurl.host';
        const valid_directoryPath = 'site/public_html/test_snapshot3';
        // const invalid_directoryPath = 'site/public_html/test';
        // const destinationName = 'SFTP Backups3';
  
        // Step 2: Enter SFTP details
        // Step 2a: Check if deafult values are set as expected in SFTP details modal
        cy.get('#ftp-user').clear().type(valid_username); // Enter invalid Username
        cy.get('#ftp-password').clear().type(valid_password); // Enter invalid Password
        cy.get('#ftp-host').clear().type(valid_host); // Enter Host
        cy.get('#ftp-directory').clear().type(valid_directoryPath); // Enter Directory
        cy.get('#ftp-port').should('have.value','22'); // Check if default Port value set to is 22
        cy.get('#ftp-details-limit').should('have.value','5'); // Check if default Storage Limit value is set to 5
        cy.get('#ftp-timeout').should('have.value','90'); // Check if default Timeout value is set to 90
  
  
      
        //-------* Negative test case 3c for Test Connection -------*//
  
        // Step 3c: Test Connection and verify successful connection with already added Directory ID
        cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
        cy.get('#snapshot-duplicate-ftp-details__test .sui-notice-content', { timeout: 15000 }).should('be.visible')
          .and('contain', `You're trying to save a destination that already exists. If you want to create a new destination with the same credentials, please choose a different folder or create a new one. If you run into further issues, you can contact our Support team for help.`);
    
        
      
    });
  
  });