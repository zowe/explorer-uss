/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2018, 2020
 */

// After being mangled
export const fetchDirectoryChildrenDataPost = [
    {
        name: '.sh_history', mode: '-rwxrwxrwx', type: 'FILE', size: 1276, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/.sh_history',
    },
    {
        name: 'test', mode: 'drwxrwxrwx', type: 'DIRECTORY', size: 8192, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/test',
    },
    {
        name: 'hello.txt', mode: '-rwxrwxrwx', type: 'FILE', size: 57, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/hello.txt',
    },
    {
        name: 'test2', mode: 'drwxrwxrwx', type: 'DIRECTORY', size: 8192, link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u/jcain/test2',
    },
];

// How it appears from zosmf
export const fetchDirectoryChildrenDataResponse = {
    items: fetchDirectoryChildrenDataPost,
};

export const fetchDirectoryChildrenRootDataPost = [
    {
        name: '.', mode: 'drwxr-xr-x', size: 2351, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/.sh_history',
    },
    {
        name: '..', mode: 'drwxr-xr-x', size: 2351, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/.sh_history',
    },
    {
        name: '.sh_history', mode: '-rwxrwxrwx', size: 2351, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/.sh_history',
    },
    {
        name: '$SYSNAME', mode: 'drwxrwxrwx', size: 576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/$SYSNAME',
    },
    {
        name: '$VERSION', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/$VERSION',
    },
    {
        name: 'bin', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/bin',
    },
    {
        name: 'dev', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/dev',
    },
    {
        name: 'etc', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/etc',
    },
    {
        name: 'lib', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/lib',
    },
    {
        name: 'opt', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/opt',
    },
    {
        name: 'samples', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/samples',
    },
    {
        name: 'tmp', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/tmp',
    },
    {
        name: 'usr', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/usr',
    },
    {
        name: 'var', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/var',
    },
    {
        name: '...', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/...',
    },
    {
        name: 'mqm', mode: 'drwxrwxrwx', size: 352, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/mqm',
    },
    {
        name: 'shr', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/shr',
    },
    {
        name: 'tools', mode: 'drwxrwxrwx', size: 24576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/tools',
    },
    {
        name: 'u', mode: 'drwxrwxrwx', size: 0, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/u',
    },
    {
        name: 'MV2E', mode: 'drwxrwxrwx', size: 576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/MV2E',
    },
    {
        name: 'MV2F', mode: 'drwxrwxrwx', size: 608, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/MV2F',
    },
    {
        name: 'ZOS112', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS112',
    },
    {
        name: 'ZOS170', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS170',
    },
    {
        name: 'ZOS180', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS180',
    },
    {
        name: 'cics', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/cics',
    },
    {
        name: 'ZOS190', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS190',
    },
    {
        name: 'java', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/java',
    },
    {
        name: 'cicsts', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/cicsts',
    },
    {
        name: 'dead.letter', mode: '-rwxrwxrwx', size: 22157, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/dead.letter',
    },
    {
        name: 'ZOS113', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS113',
    },
    {
        name: 'ing', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ing',
    },
    {
        name: 'netview', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/netview',
    },
    {
        name: 'ZOS201', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS201',
    },
    {
        name: 'insBase', mode: 'drwxrwxrwx', size: 0, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/insBase',
    },
    {
        name: 'vndr69a', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/vndr69a',
    },
    {
        name: '557', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/557',
    },
    {
        name: 'CICSIA', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/CICSIA',
    },
    {
        name: 'liberty_servers', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/liberty_servers',
    },
    {
        name: 'was', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/was',
    },
    {
        name: 'WebSphere', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/WebSphere',
    },
    {
        name: 'applications', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/applications',
    },
    {
        name: '.ssh', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/.ssh',
    },
    {
        name: 'temp', mode: 'drwxrwxrwx', size: 384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/temp',
    },
    {
        name: 'bundles', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/bundles',
    },
    {
        name: 'ZOS111', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ZOS111',
    },
    {
        name: 'itbld', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/itbld',
    },
    // { name: 'àà¢ î á+î', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/àà¢ î á+î' },
    //    { name: 'àà¢ë&àáâíå', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/àà¢ë&àáâíå' },
    {
        name: 'RAA', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/RAA',
    },
    {
        name: 'db2', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/db2',
    },
    {
        name: 'rtehome', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/rtehome',
    },
    {
        name: 'liberty', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/liberty',
    },
    {
        name: 'ims12', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ims12',
    },
    {
        name: 'ims13', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/ims13',
    },
    {
        name: 'atlas', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/atlas',
    },
    {
        name: 'DD:STDOUT', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/DD:STDOUT',
    },
    {
        name: 'RTCV502', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/RTCV502',
    },
    {
        name: 'jenkins', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/ibmzosmf/api/v1/zosmf/restfiles/fs/jenkins',
    },
];

export const fetchDirectoryChildrenRootDataResponse = {
    items: fetchDirectoryChildrenRootDataPost,
};

export const fetchDirectoryChildrenErrorResponse = {
    status: 'INTERNAL_SERVER_ERROR',
    message: 'Error',
};
