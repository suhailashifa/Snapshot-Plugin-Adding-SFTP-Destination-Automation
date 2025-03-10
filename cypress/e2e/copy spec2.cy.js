describe('Snapshot - Destination - SFTP : Automation', () => {

    it('Add Destination', () => {
  
        // Login
        cy.visit('https://test2suhailashifa.tempurl.host/wp-login.php?');
        cy.get('#user_login').type('suhaila.shifa@incsub.com');
        cy.get('#user_pass').type('1234567891011');
        cy.get('#wp-submit').click();
  
        // Check if the onboarding modal exists before proceeding
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
        const destinationName = 'SFTP Backups3';

        // Step 1: Verify or Add Directory Path in the List
        cy.visit('https://test2suhailashifa.tempurl.host/wp-admin/admin.php?page=snapshot-destinations');
        //cy.wait(5000);

        cy.get('td.sui-hidden-xs.sui-hidden-sm.snapshot-destination-path') // when exists: tr.destination-row.destination-type-ftp , when not exists: table.sui-table.sui-table-flushed,  td.snapshot-destination-path 
        .invoke('attr', 'data-tpd_path')
        .then((path) => {
            cy.log('path data type:', typeof path); // Log the type of 'path'
            cy.log('valid_directoryPath data type:', typeof valid_directoryPath); // Log the type of 'valid_directoryPath'
            cy.log('path value:', path); // Log the actual value of 'path'
            cy.log('valid_directoryPath value:', valid_directoryPath); // Log the value of 'valid_directoryPath'
            if (path === valid_directoryPath) {
                cy.log(`Path "${path}" already exists.`);
            } 
            else {
                // Add New Destination
                cy.get('#snapshot-add-destination').click();
                cy.get('#ftp-destination').click({ force: true });
                cy.contains('Next').click();
                cy.get('#snapshot-add-destination-dialog-slide-2-ftp .snapshot-ftp-type div:nth-child(2)').click();

                // Enter SFTP Details
                cy.get('#ftp-user').clear().type(valid_username);
                cy.get('#ftp-password').clear().type(valid_password);
                cy.get('#ftp-host').clear().type(valid_host);
                cy.get('#ftp-directory').clear().type(valid_directoryPath);

                // Verify default values
                cy.get('#ftp-port').should('have.value', '22');
                cy.get('#ftp-details-limit').should('have.value', '5');
                cy.get('#ftp-timeout').should('have.value', '90');

                // Test Connection
                cy.get('#snapshot-test-connection__ftp').click();
                cy.get('#ftp-destination-test__success .sui-notice-content', { timeout: 15000 }).should('be.visible')
                    .and('contain', `The testing results were successful. We are able to connect to your destination. You're good to proceed with the current settings. Click "Next" to continue.`);// Verify successful connection

                // Set Destination Name and Save
                cy.get('.snapshot-ftp-destination--next').contains('Next').click({ force: true });
                cy.get('input[id="ftp-name"]', { timeout: 5000 }).clear({ force: true }).type(destinationName, { force: true });
                cy.get('.snapshot-ftp-destination--save').click();

                cy.get('.sui-floating-notices .sui-notice-content', { timeout: 15000 }).should('be.visible')
                    .and('contain', `${destinationName} has been added as a destination.`);
            }
        });
        
        // Step 1a: Directory path doesn't exist — Add New Destination
        cy.get('#snapshot-add-destination').click(); // Click on Add Destination button
        cy.get('#ftp-destination').click( {force: true}); // Select FTP/SFTP
        cy.contains('Next').click(); // Click Next
        cy.get('#snapshot-add-destination-dialog-slide-2-ftp .snapshot-ftp-type div:nth-child(2)').click(); // Ensure SFTP tab is selected

        // Step 2: RE-Enter SFTP details
        cy.get('#ftp-user').clear().type(valid_username); // Enter invalid Username
        cy.get('#ftp-password').clear().type(valid_password); // Enter invalid Password
        cy.get('#ftp-host').clear().type(valid_host); // Enter Host
        cy.get('#ftp-directory').clear().type(valid_directoryPath); // Enter Directory
        cy.get('#ftp-port').should('have.value','22'); // Check if default Port value set to is 22
        cy.get('#ftp-details-limit').should('have.value','5'); // Check if default Storage Limit value is set to 5
        cy.get('#ftp-timeout').should('have.value','90'); // Check if default Timeout value is set to 90


        // Step 3: Test Connection and verify successful connection with already added Directory ID
        cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
        cy.get('#snapshot-duplicate-ftp-details__test .sui-notice-content', { timeout: 15000 }).should('be.visible')
        .and('contain', `You're trying to save a destination that already exists. If you want to create a new destination with the same credentials, please choose a different folder or create a new one. If you run into further issues, you can contact our Support team for help.`);
    
        
            
    });
  
});


  




