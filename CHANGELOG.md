# Change Log
All notable changes to the USS-Explorer will be documented in this file.

## <2.0.5>
### New features and enhancements
- Shortcuts for context menu
- Progress indicator spinning when getting large file

## <2.0.1>
### New features and enhancements
- Adding the feature to download a file
- Fixed the bug where opening a file fails when USS path has '/' at the end

## <2.0.0>
### New features and enhancements
- USS-explorer no longer uses explorer-ui-server, but now depends on app-server. In a standard Zowe environment this will result in less processes, but does break links about getting to the explorer via APIML routes. The explorer is now available via the app-server's APIML route.

## <1.0.14>
- Replaced the File APIs with zOSMF APIs
- 
## <1.0.13>
- updated material ui from 0.18 to 4.x, react from v15 to v16
- updated webpack config for local build config
- updated packages for security updates

## <1.0.6>

### New features and enhancements
- Changed packaging and lifecycle start.sh script to support explorer-ui-server keyring support (https://github.com/zowe/zowe-install-packaging/pull/1177), Thanks @stevenhorsman, @js665999, @nakulmanchanda, @jackjia-ibm
- Added .npmrc to specify npm registry as config. Thanks @nakulmanchanda 

## <1.0.5>

### New features and enhancements

- Changed packaging and lifecycle start.sh script to support explorer-ui-server keyring support (https://github.com/zowe/zowe-install-packaging/pull/1177), Thanks @stevenhorsman, @js665999, @nakulmanchanda, @jackjia-ibm
- Added ability to collapse and resize jobs tree (https://github.com/zowe/zlux/issues/259), Thanks @skurnevich

### Bug fixes

- Add default value for ZOWE_EXPLORER_FRAME_ANCESTORS at lifecycle start script.           
  It resolves (https://github.com/zowe/explorer-ui-server/issues/44), thanks @nakulmanchanda

## <1.0.2>

### New features and enhancements
<!--- - Format: Added support for <xx>. (Issue/PR number) [Doc link if any] [Thanks @contributor] --->
### Bug fixes
<!--- - Format: Fixed <xx>. (Issue/PR number) [Doc link if any] [Thanks @contributor] --->
- Fixed bug where user could end up in infinite authorization loop due to z/OSMF Ltps and APIML JWT not expiring at same time (https://github.com/zowe/api-layer/issues/615), Thanks @jordanCain
