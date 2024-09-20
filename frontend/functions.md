# SmartContract Solidity Contract

## Overview

This Solidity contract implements a system for managing user verification requests and verifier access. It allows for adding and removing verifiers, managing verification requests, and controlling user data access.

## Functions

### 1. `addVerifier`

- **Description**: Adds a new verifier to the system.
- **Parameters**:
  - `verifierName` (`string memory`): The name of the verifier.
  - `verifierAddress` (`string memory`): The address of the verifier.

### 2. `removeVerifier`

- **Description**: Removes an existing verifier from the system.
- **Parameters**:
  - `verifierName` (`string memory`): The name of the verifier to be removed.

### 3. `updateVerifierAddress`

- **Description**: Updates the address of an existing verifier.
- **Parameters**:
  - `verifierName` (`string memory`): The name of the verifier whose address is to be updated.
  - `newAddress` (`string memory`): The new address for the verifier.

### 4. `addVReq`

- **Description**: Adds a new verification request.
- **Parameters**:
  - `verifier` (`address`): The address of the verifier.
  - `cid` (`string memory`): The unique identifier for the verification request.
  - `name` (`string memory`): The name of the user.
  - `sex` (`string memory`): The sex of the user.
  - `dob` (`string memory`): The date of birth of the user.
  - `mobile` (`uint`): The mobile number of the user.
  - `email` (`string memory`): The email address of the user.
  - `college` (`string memory`): The college of the user.
  - `isOver18` (`int`): Indicator if the user is over 18.
  - `isCollegeStudent` (`int`): Indicator if the user is a college student.

### 5. `showVerifierVerificationReqListLength`

- **Description**: Shows the number of verification requests for the caller.
- **Parameters**: None

### 6. `showVerifierVerificationReqList`

- **Description**: Retrieves a verification request based on index.
- **Parameters**:
  - `index` (`uint`): The index of the verification request.
- **Returns**:
  - `cid` (`string memory`): The unique identifier for the request.
  - `user` (`address`): The address of the user.
  - `status` (`int`): The status of the request.
  - `metaIndex` (`uint`): The metadata index of the request.

### 7. `showVerifierVerificationReqScopeList`

- **Description**: Retrieves the scope details of a verification request.
- **Parameters**:
  - `index` (`uint`): The index of the verification request.
- **Returns**:
  - `name` (`string memory`): The name of the user.
  - `sex` (`string memory`): The sex of the user.
  - `dob` (`string memory`): The date of birth of the user.
  - `mobile` (`uint`): The mobile number of the user.
  - `email` (`string memory`): The email address of the user.
  - `college` (`string memory`): The college of the user.

### 8. `showVerifierVerificationReqScopeBoolsList`

- **Description**: Retrieves boolean scope details of a verification request.
- **Parameters**:
  - `index` (`uint`): The index of the verification request.
- **Returns**:
  - `isOver18` (`int`): Indicator if the user is over 18.
  - `isCollegeStudent` (`int`): Indicator if the user is a college student.

### 9. `showUserVerificationReqListLength`

- **Description**: Shows the number of verification requests made by the caller.
- **Parameters**: None

### 10. `showUserVerificationReqList`

- **Description**: Retrieves the metadata of a verification request made by the caller.
- **Parameters**:
  - `index` (`uint`): The index of the verification request.
- **Returns**:
  - `verifier` (`address`): The address of the verifier.
  - `status` (`int`): The status of the request.

### 11. `verifyReq`

- **Description**: Updates the status of a verification request.
- **Parameters**:
  - `user` (`address`): The address of the user whose request is being verified.
  - `index` (`uint`): The index of the verification request.
  - `decision` (`bool`): The decision to approve (`true`) or reject (`false`) the request.

### 12. `showUserInfo`

- **Description**: Retrieves the user information for the caller.
- **Parameters**: None
- **Returns**:
  - `name` (`string memory`): The name of the user.
  - `sex` (`string memory`): The sex of the user.
  - `dob` (`string memory`): The date of birth of the user.
  - `mobile` (`uint`): The mobile number of the user.
  - `email` (`string memory`): The email address of the user.
  - `college` (`string memory`): The college of the user.
  - `isOver18` (`int`): Indicator if the user is over 18.
  - `isCollegeStudent` (`int`): Indicator if the user is a college student.

### 13. `giveAccess`

- **Description**: Grants an organization access to the user’s information.
- **Parameters**:
  - `org` (`address`): The address of the organization.
  - `name` (`bool`): Whether to grant access to the user’s name.
  - `sex` (`bool`): Whether to grant access to the user’s sex.
  - `dob` (`bool`): Whether to grant access to the user’s date of birth.
  - `mobile` (`bool`): Whether to grant access to the user’s mobile number.
  - `email` (`bool`): Whether to grant access to the user’s email address.
  - `college` (`bool`): Whether to grant access to the user’s college.
  - `isOver18` (`bool`): Whether to grant access to the user’s over 18 status.
  - `isCollegeStudent` (`bool`): Whether to grant access to the user’s college student status.

### 14. `showUserInfoByOrg`

- **Description**: Retrieves user information by an organization that has been granted access.
- **Parameters**:
  - `user` (`address`): The address of the user.
- **Returns**:
  - `name` (`string memory`): The name of the user.
  - `sex` (`string memory`): The sex of the user.
  - `dob` (`string memory`): The date of birth of the user.
  - `mobile` (`uint`): The mobile number of the user.
  - `email` (`string memory`): The email address of the user.
  - `college` (`string memory`): The college of the user.

### 15. `showUserInfoBoolsByOrg`

- **Description**: Retrieves boolean scope details of user information by an organization that has been granted access.
- **Parameters**:
  - `user` (`address`): The address of the user.
- **Returns**:
  - `isOver18` (`int`): Indicator if the user is over 18.
  - `isCollegeStudent` (`int`): Indicator if the user is a college student.

### 16. `getVerifierAddress`

- **Description**: Retrieves the address of a verifier by name.
- **Parameters**:
  - `verifierName` (`string memory`): The name of the verifier.
- **Returns**:
  - `verifierAddress` (`string memory`): The address of the verifier.

### 17. `getVerifierName`

- **Description**: Retrieves the name of a verifier by address.
- **Parameters**:
  - `verifierAddress` (`string memory`): The address of the verifier.
- **Returns**:
  - `verifierName` (`string memory`): The name of the verifier.

## License

This contract is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
