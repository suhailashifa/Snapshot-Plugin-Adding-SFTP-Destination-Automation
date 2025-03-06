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
      const invalid_username = 'invalid username';
      const valid_password = '1234567891011';
      const invalid_password = 'inavlid password';
      const valid_host = 'test2suhailashifa.tempurl.host';
      const valid_directoryPath = 'site/public_html/test_snapshot3';
      const invalid_directoryPath = 'site/public_html/test';
      const destinationName = 'SFTP Backups';

      // Step 2: Enter SFTP details
      // Step 2a: Check if deafult values are set as expected in SFTP details modal
      cy.get('#ftp-port').should('have.value','22'); // Check if default Port value set to is 22
      cy.get('#ftp-details-limit').should('have.value','5'); // Check if default Storage Limit value is set to 5
      cy.get('#ftp-timeout').should('have.value','90'); // Check if default Timeout value is set to 90


    
      //-------* Negative test cases for Test Connection -------*//


      // Step 3a: Test Connection with Invalid Username and Password
      cy.get('#ftp-user').clear().type(invalid_username); // Enter invalid Username
      cy.get('#ftp-password').clear().type(invalid_password); // Enter invalid Password
      cy.get('#ftp-host').clear().type(valid_host); // Enter Host
      cy.get('#ftp-directory').clear().type(valid_directoryPath); // Enter Directory
      cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
      cy.wait(15000); //wait for the spinner to disappear
      cy.get('.sui-notice-content').contains('Test Connection failed.'); // Verify failed connection
      
      // Step 3b: Test Connection with Invalid Directory ID
      cy.get('#ftp-user').clear().type(valid_username); // Enter Username
      cy.get('#ftp-password').clear().type(valid_password); // Enter Password
      cy.get('#ftp-directory').clear().type(invalid_directoryPath); // Enter Directory
      cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
      cy.wait(15000); //wait for the spinner to disappear
      cy.get('.sui-notice-content').contains('Test Connection failed.'); // Verify failed connection

      // Step 3c: Test Connection and verify successful connection with already added Directory ID
      cy.get('#ftp-directory').clear().type(valid_directoryPath); // Enter Directory
      cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
      cy.wait(15000); //wait for the spinner to disappear
      cy.get('.sui-notice-content').contains('Test Connection failed.'); // Verify failed connection


      
      //-------* Positive test cases for Test Connection -------*//


      // Step 4: Successful Test Connection
      // Step 4a: Test Connection with correct Directory ID
      cy.get('#ftp-directory').clear().type(valid_directoryPath); // Enter Directory
      cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection, , { timeout: 50000 }
      cy.wait(15000); //wait for the spinner to disappear
      cy.get('.sui-notice-content').contains('The testing results were successful. We are able to connect to your destination.'); // Verify successful connection


      // Step 5a: Set Destination Name and Save
      cy.get('.snapshot-ftp-destination--next').click(); // Click Next
      cy.get('input[id="ftp-name"]').clear().type(destinationName); // Enter Destination Name
      cy.get('.snapshot-ftp-destination--save').click(); // Click Save Destination 
      cy.wait(15000); //wait for the spinner to disappear
      cy.log('Successfully Added Destination');

      // // Step 6: Verify Destination in the list : Verify both values exist in the same row
      cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=snapshot-destinations');
      cy.get('.sui-table tr').contains(new RegExp(`${destinationName}.*${valid_directoryPath}`)).and('contain', '0'); // Verify Destination Name and Directory in the list
      cy.log('Newly Added Destination Exists');
    
  });

});