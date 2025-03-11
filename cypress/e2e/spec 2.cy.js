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
  
        // Declaring all the Valid and Invalid values
        const valid_username = 'suhailashifa';
        // const invalid_username = 'invalid username';
        const valid_password = '1234567891011';
        // const invalid_password = 'inavlid password';
        const valid_host = 'test2suhailashifa.tempurl.host';
        const valid_directoryPath = 'site/public_html/test_snapshot3';
        // const invalid_directoryPath = 'site/public_html/test';
        const destinationName = 'SFTP Backups 1';

        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=snapshot-destinations');
  
        function enterFtpDetails(username, password, host, directoryPath, expectError = false) {
          // Add New Destination
          cy.get('#snapshot-add-destination').click();
          cy.get('#ftp-destination').click({ force: true });
          cy.contains('Next').click();
          cy.get('#snapshot-add-destination-dialog-slide-2-ftp .snapshot-ftp-type div:nth-child(2)').click();
      
          // Enter SFTP Details
          cy.get('#ftp-user').clear().type(username);
          cy.get('#ftp-password').clear().type(password);
          cy.get('#ftp-host').clear().type(host);
          cy.get('#ftp-directory').clear().type(directoryPath);
      
          // Verify default values
          cy.get('#ftp-port').should('have.value', '22');
          cy.get('#ftp-details-limit').should('have.value', '5');
          cy.get('#ftp-timeout').should('have.value', '90');
      
          // Test Connection
          cy.get('#snapshot-test-connection__ftp').click();
      
          if (expectError) {
              // Assert the expected error message
              cy.get('#snapshot-duplicate-ftp-details__test .sui-notice-content', { timeout: 15000 }).should('be.visible')
             .and('contain', `You're trying to save a destination that already exists. If you want to create a new destination with the same credentials, please choose a different folder or create a new one. If you run into further issues, you can contact our Support team for help.`);
          } else {
              // Assert the success message
              cy.get('#ftp-destination-test__success .sui-notice-content', { timeout: 15000 }).should('be.visible')
              .and('contain', `The testing results were successful. We are able to connect to your destination. You're good to proceed with the current settings. Click "Next" to continue.`);
              
              // Proceed to Set Destination
              setDestinationNameAndSave(destinationName);
          }
      }
      
      function setDestinationNameAndSave(destination) {
          // Set Destination Name and Save
          cy.get('.snapshot-ftp-destination--next').contains('Next').click({ force: true });
          cy.get('input[id="ftp-name"]', { timeout: 5000 }).clear({ force: true }).type(destination, { force: true });
          cy.get('.snapshot-ftp-destination--save').click();
      
          cy.get('.sui-floating-notices .sui-notice-content', { timeout: 15000 }).should('be.visible');
      }
      
      // First Call — Expect Success
      enterFtpDetails(valid_username, valid_password, valid_host, valid_directoryPath);
      
      // Second Call — Expect Error
      enterFtpDetails(valid_username, valid_password, valid_host, valid_directoryPath, true);
      
    
        
      
    });
  
  });


