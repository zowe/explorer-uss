# Change Log
All notable changes to the USS-Explorer will be documented in this file.

## <1.0.12>

### New features and enhancements
- Introduces the menu shortcuts and confirmation dialog before deleting file for USSS explorer. Thanks @Martin-Zeithaml

## <1.0.11>

### New features and enhancements

- Refactor USS packagaing & installation scripts, and folder renames, to accomodate new iframe capability in ZLUX. Thanks @NakulManchanda
- Added manifest for API ML & App Framework installation using new plugin installation process. Thanks @JadinLuong, @jackjia-ibm

## <1.0.8>

### New features and enhancements
- Added trap int signal for zowe launcher to stop the running process

## <1.0.6>

### New features and enhancements
- Changed packaging and lifecycle start.sh script to support explorer-ui-server keyring support (https://github.com/zowe/zowe-install-packaging/pull/1177), Thanks @stevenhorsman, @js665999, @nakulmanchanda, @jackjia-ibm
- Added .npmrc to specify npm registry as config. Thanks @nakulmanchanda
- Added short cuts for directory and file menu. Thanks @Martin-Zeithaml

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