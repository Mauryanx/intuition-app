# Branch Protection Rules

To ensure code quality and maintain a stable main branch, you should set up branch protection rules in GitHub. Follow these steps:

1. Go to your GitHub repository
2. Click on "Settings"
3. Click on "Branches" in the left sidebar
4. Under "Branch protection rules", click "Add rule"
5. Configure the following settings:

## Protection Settings for `main` branch

- **Branch name pattern**: `main`
- **Require a pull request before merging**: ✅
  - **Require approvals**: ✅
  - **Required number of approvals before merging**: 1
- **Require status checks to pass before merging**: ✅
  - **Require branches to be up to date before merging**: ✅
  - **Status checks that are required**:
    - `test` (ensures tests pass)
    - `build` (ensures the app builds successfully)
- **Require conversation resolution before merging**: ✅
- **Do not allow bypassing the above settings**: ✅

## Additional Recommended Settings

- **Restrict who can push to matching branches**: ✅
  - Add repository administrators and selected developers

These settings ensure that:
1. All changes to the main branch must go through a pull request
2. CI checks (tests and build) must pass before merging
3. At least one reviewer must approve changes
4. All conversations must be resolved before merging

This setup maintains code quality and prevents broken code from being merged into the main branch.
