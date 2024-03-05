Feature: DashBoard page

  Scenario: Verify the Dashboard page is visible1
    Given DashBoard page is visible properly

  Scenario: Grab the side columns name in dashboard page
    Given Grab the side columns name in dashboard page
    When Get the grabbed side columns

  Scenario: Click on side section <pageName> page and verify the page url
    Given Click on '<pageName>' page
    Then Verify the '<pageName>' url

    Examples:
      | pageName    |
      | Admin       |
      | PIM         |
      | Leave       |
      | Time        |
      | Recruitment |
      | My Info     |
      | Performance |
      | Dashboard   |
      | Directory   |
      | Claim       |
      | Buzz        |

  Scenario: Grab the <pageName> page header and sub headers
    Given Click on '<pageName>' page
    When Verify the '<pageName>' url
    And Grab the '<pageName>' page on top headers page
    And Grab the '<pageName>' page on top sub headers page
    Then Get the '<pageName>' page top headers and verify

    Examples:
      | pageName    |
      | Admin       |
      | PIM         |
      | Leave       |
      | Time        |
      | Recruitment |
      | Performance |
      | Claim       |

  Scenario: Verify the <pageName> page headers and sub headers
    Given Get the '<pageName>' top header and sub headers and verify

    Examples:
      | pageName    |
      | Admin       |
      | PIM         |
      | Leave       |
      | Time        |
      | Recruitment |
      | Performance |
      | Claim       |

  Scenario: Verify the user can add edit and delete a user and verify that
    Given Click on '<pageName>' page
    When Click on add user button
    And Verify the 'Add User' heading in the corresponding page
    And Add the user details in admin page
    And Verify the success and 'Successfully Saved' message is visible
    And Verify the user is created
    And Now edit the user and verify the changes should be updated
    And Verify the 'Edit User' heading in the corresponding page
    And Click on save button
    And Verify the success and 'Successfully Updated' message is visible
    And Verify the delete user
    And Verify the delete pop up is visible
    And Click on delete icon
    Then Verify the success and 'Successfully Deleted' message is visible

    Examples:
      | pageName | 
      | Admin    |





