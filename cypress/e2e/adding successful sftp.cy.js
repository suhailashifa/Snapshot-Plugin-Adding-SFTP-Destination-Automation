describe('Snapshot - Destination - SFTP : Automation', () => {

    it('Add Destination', () => {
        // Login
        cy.visit('https://test2suhailashifa.tempurl.host/wp-login.php?');
        cy.get('#user_login').type('suhaila.shifa@incsub.com');
        cy.get('#user_pass').type('1234567891011');
        cy.get('#wp-submit').click();
        
        // Step 1: Navigate to Snapshot > Destination
        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=snapshot-destinations');
        cy.get('#snapshot-add-destination').click(); // Click on Add Destination button
        cy.get('#ftp-destination').click( {force: true}); // Select FTP/SFTP
        cy.contains('Next').click(); // Click Next
        //cy.get('input[value="sftp"]').click({force: true}); // Ensure SFTP tab is selected
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
        
        // Step 2b: Check positive test case for Test Connection
        cy.get('#ftp-user').type(valid_username); // Enter Username
        cy.get('#ftp-password').type(valid_password); // Enter Password
        cy.get('#ftp-host').type(valid_host); // Enter Host
        cy.get('#ftp-directory').type(valid_directoryPath); // Enter Directory
        cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
        cy.wait(10000); //wait for the spinner to disappear
        cy.get('.sui-notice-content').contains('The testing results were successful. We are able to connect to your destination.'); // Verify successful connection
  
        // Step 3: Set Destination Name and Save
        cy.get('.snapshot-ftp-destination--next').click(); // Click Next
        cy.get('input[id="ftp-name"]').clear().type(destinationName); // Enter Destination Name
        cy.get('.snapshot-ftp-destination--save').click(); // Click Save Destination 
        cy.wait(15000); //wait for the spinner to disappear
  
        // // Step 4: Verify Destination in the list : Verify both values exist in the same row
        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=snapshot-destinations');
        cy.get('.sui-table tr').contains(new RegExp(`${destinationName}.*${valid_directoryPath}`)).and('contain', '0'); // Verify Destination Name and Directory in the list
        cy.log('Newly Added Destination Exists');
        
    });
  
  });