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
        cy.get('input[value="sftp"]').click({force: true}); // Ensure SFTP tab is selected
  
        // Step 2: Enter SFTP details
        // Step 2a: Check if deafult values are set as expected in SFTP details modal
        cy.get('#ftp-port').should('have.value','22'); // Check if default Port value set to is 22
        cy.get('#ftp-details-limit').should('have.value','5'); // Check if default Storage Limit value is set to 5
        cy.get('#ftp-timeout').should('have.value','90'); // Check if default Timeout value is set to 90
        
        // Step 2b: Check positive test case for Test Connection
        cy.get('#ftp-user').type('suhailashifa'); // Enter Username
        cy.get('#ftp-password').type('1234567891011'); // Enter Password
        cy.get('#ftp-host').type('test2suhailashifa.tempurl.host'); // Enter Host
        cy.get('#ftp-directory').type('site/public_html/test_snapshot3'); // Enter Directory
        cy.get('#snapshot-test-connection__ftp').click(); // Click Test Connection
        cy.wait(30000); //wait for the spinner to disappear
        cy.get('.sui-notice-content').contains('The testing results were successful. We are able to connect to your destination.'); // Verify successful connection
  
        // Step 3a: Set Destination Name and Save
        // cy.contains('Connection successful').should('be.visible'); // Verify successful connection
        cy.contains('Next').click({force: true}); // Click Next
        cy.get('#ftp-name').type('SFTP Backups 3'); // Enter Destination Name
        cy.get('#snapshot-add-destination-dialog-slide-3-ftp > .sui-box > .sui-box-footer > .sui-button-blue').click(); // Click Save Destination
        cy.get('.sui-notice-content').contains('Destination added successfully.'); // Verify Destination added successfully
  
        // // Step 4: Verify Destination in the list
        cy.get('.sui-table').contains('SFTP Backups 3'); // Verify Destination Name in the list
        cy.get('.sui-table').contains('site/public_html/test_snapshot3'); // Verify Directory in the list
        cy.get('.sui-table').contains('0'); // Verify Exported Backups in the list
        //cy.get('.sui-toggle-slider').contains('Active'); // Verify Destination Status in the list
        
        
    });
  
  });