#!/bin/sh

################################################################################
# This program and the accompanying materials are made available under the terms of the
# Eclipse Public License v2.0 which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright IBM Corporation 2019
################################################################################

################################################################################
# Variables required on shell:
# - STATIC_DEF_CONFIG_DIR
# - ROOT_DIR
# - NODE_HOME

. $ROOT_DIR/scripts/utils/validateNode.sh
NODE_BIN=${NODE_HOME}/bin/node

EXPLORER_CONFIG="$ROOT_DIR/components/jes-explorer/bin/app/package.json"
EXPLORER_PLUGIN_BASEURI=$($NODE_BIN -e "process.stdout.write(require('${EXPLORER_CONFIG}').config.baseuri)")


# Remove any old config
if [[ -f ${STATIC_DEF_CONFIG_DIR}/uss.yml ]]; then
    rm ${STATIC_DEF_CONFIG_DIR}/uss.yml 
fi

# Add static definition for uss explorer ui
cat <<EOF >$STATIC_DEF_CONFIG_DIR/uss.ebcdic.yml
#
services:
  - serviceId: explorer-uss
    title: IBM z/OS USS UI
    description: IBM z/OS USS UI service
    catalogUiTileId:
    instanceBaseUrls:
      - https://$ZOWE_EXPLORER_HOST:$USS_EXPLORER_UI_PORT/
    homePageRelativeUrl:
    routedServices:
      - gatewayUrl: ui/v1
        serviceRelativeUrl: $EXPLORER_PLUGIN_BASEURI
EOF

iconv -f IBM-1047 -t IBM-850 ${STATIC_DEF_CONFIG_DIR}/uss.ebcdic.yml > $STATIC_DEF_CONFIG_DIR/uss.yml	
rm ${STATIC_DEF_CONFIG_DIR}/uss.ebcdic.yml
chmod 770 $STATIC_DEF_CONFIG_DIR/uss.yml
