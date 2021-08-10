/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

import * as treeTyes from '../../../WebContent/js/actions/treeUSS';

export const USSFetchChildrenData = [
    { name: '.sh_history', mode: '-rwxrwxrwx', type: 'FILE', size: 1276, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/.sh_history' },
    { name: 'test', mode: 'drwxrwxrwx', type: 'DIRECTORY', size: 8192, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/test' },
    { name: 'hello.txt', mode: '-rwxrwxrwx', type: 'FILE', size: 57, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/hello.txt' },
    { name: 'test2', mode: 'drwxrwxrwx', type: 'DIRECTORY', size: 8192, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/test2' },

];

export const USSFetchResponse = {
    items: USSFetchChildrenData,
};

export const receivedUSSChildrenAction = {
    type: treeTyes.RECEIVE_USS_TREE_CHILDREN,
    USSPath: '/u/jcain',
    childData: USSFetchChildrenData,
};

export const USSFetchChildrenLargeData = [
    { name: '.sh_history', mode: '-rwxrwxrwx', size: 2351, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/.sh_history' },
    { name: '$SYSNAME', mode: 'drwxrwxrwx', size: 576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/$SYSNAME' },
    { name: '$VERSION', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/$VERSION' },
    { name: 'bin', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/bin' },
    { name: 'dev', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/dev' },
    { name: 'etc', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/etc' },
    { name: 'lib', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/lib' },
    { name: 'opt', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/opt' },
    { name: 'samples', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/samples' },
    { name: 'tmp', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/tmp' },
    { name: 'usr', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/usr' },
    { name: 'var', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/var' },
    { name: '...', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/...' },
    { name: 'mqm', mode: 'drwxrwxrwx', size: 352, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/mqm' },
    { name: 'shr', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/shr' },
    { name: 'tools', mode: 'drwxrwxrwx', size: 24576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/tools' },
    { name: 'u', mode: 'drwxrwxrwx', size: 0, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/u' },
    { name: 'MV2E', mode: 'drwxrwxrwx', size: 576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/MV2E' },
    { name: 'MV2F', mode: 'drwxrwxrwx', size: 608, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/MV2F' },
    { name: 'ZOS112', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS112' },
    { name: 'ZOS170', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS170' },
    { name: 'ZOS180', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS180' },
    { name: 'cics', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/cics' },
    { name: 'ZOS190', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS190' },
    { name: 'java', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/java' },
    { name: 'cicsts', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/cicsts' },
    { name: 'dead.letter', mode: '-rwxrwxrwx', size: 22157, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/dead.letter' },
    { name: 'ZOS113', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS113' },
    { name: 'ing', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ing' },
    { name: 'netview', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/netview' },
    { name: 'ZOS201', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS201' },
    { name: 'insBase', mode: 'drwxrwxrwx', size: 0, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/insBase' },
    { name: 'vndr69a', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/vndr69a' },
    { name: '557', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/557' },
    { name: 'CICSIA', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/CICSIA' },
    { name: 'liberty_servers', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/liberty_servers' },
    { name: 'was', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/was' },
    { name: 'WebSphere', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/WebSphere' },
    { name: 'applications', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/applications' },
    { name: '.ssh', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/.ssh' },
    { name: 'temp', mode: 'drwxrwxrwx', size: 384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/temp' },
    { name: 'bundles', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/bundles' },
    { name: 'ZOS111', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ZOS111' },
    { name: 'itbld', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/itbld' },
    // { name: 'àà¢ î á+î', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/àà¢ î á+î' },
    //    { name: 'àà¢ë&àáâíå', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/àà¢ë&àáâíå' },
    { name: 'RAA', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/RAA' },
    { name: 'db2', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/db2' },
    { name: 'rtehome', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/rtehome' },
    { name: 'liberty', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/liberty' },
    { name: 'ims12', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ims12' },
    { name: 'ims13', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/ims13' },
    { name: 'atlas', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/atlas' },
    { name: 'DD:STDOUT', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/DD:STDOUT' },
    { name: 'RTCV502', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/RTCV502' },
    { name: 'jenkins', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/jenkins' },
];

export const largeDataResponse = {
    items: USSFetchChildrenLargeData,
};

export const receivedLargeUSSChildrenAction = {
    type: treeTyes.RECEIVE_USS_TREE_CHILDREN,
    USSPath: '/u/jcain',
    childData: USSFetchChildrenLargeData,
};

export const noDataResponse = {
    items: [],
};

export const receivedNoUSSChildrenAction = {
    type: treeTyes.RECEIVE_USS_TREE_CHILDREN,
    USSPath: '/u/jcain',
    childData: [],
};

export const fetchUSSChildrenErrorResponse = {
    status: 'INTERNAL_SERVER_ERROR',
    message: 'Error',
};

export const deleteUSSErrorResponse = {
    category: 8,
    rc: -1,
    reason: 96141420,
    message: 'lstat() error',
    details: ['EDC5129I No such file or directory. (errno2=0x053B006C)'],
};
