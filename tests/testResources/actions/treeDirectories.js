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
    { name: '.sh_history', mode: '-rwxrwxrwx', type: 'FILE', size: 1276, link: 'https://tester.test.com:7443/api/v1/unixfiles/u/jcain/.sh_history' },
    { name: 'test', mode: 'drwxrwxrwx', type: 'DIRECTORY', size: 8192, link: 'https://tester.test.com:7443/api/v1/unixfiles/u/jcain/test' },
    { name: 'hello.txt', mode: '-rwxrwxrwx', type: 'FILE', size: 57, link: 'https://tester.test.com:7443/api/v1/unixfiles/u/jcain/hello.txt' },
    { name: 'test2', mode: 'drwxrwxrwx', type: 'DIRECTORY', size: 8192, link: 'https://tester.test.com:7443/api/v1/unixfiles/u/jcain/test2' },
];

    // How it appears from zosmf
export const fetchDirectoryChildrenDataResponse = {
    children: fetchDirectoryChildrenDataPost,
};

export const fetchDirectoryChildrenRootDataPost = [
    { name: '.sh_history', mode: '-rwxrwxrwx', size: 2351, type: 'FILE', link: 'https://tester.test.com:7443/api/v1/unixfiles/.sh_history' },
    { name: '$SYSNAME', mode: 'drwxrwxrwx', size: 576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/$SYSNAME' },
    { name: '$VERSION', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/$VERSION' },
    { name: 'bin', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/bin' },
    { name: 'dev', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/dev' },
    { name: 'etc', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/etc' },
    { name: 'lib', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/lib' },
    { name: 'opt', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/opt' },
    { name: 'samples', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/samples' },
    { name: 'tmp', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/tmp' },
    { name: 'usr', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/usr' },
    { name: 'var', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/var' },
    { name: '...', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/...' },
    { name: 'mqm', mode: 'drwxrwxrwx', size: 352, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/mqm' },
    { name: 'shr', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/shr' },
    { name: 'tools', mode: 'drwxrwxrwx', size: 24576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/tools' },
    { name: 'u', mode: 'drwxrwxrwx', size: 0, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/u' },
    { name: 'MV2E', mode: 'drwxrwxrwx', size: 576, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/MV2E' },
    { name: 'MV2F', mode: 'drwxrwxrwx', size: 608, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/MV2F' },
    { name: 'ZOS112', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS112' },
    { name: 'ZOS170', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS170' },
    { name: 'ZOS180', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS180' },
    { name: 'cics', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/cics' },
    { name: 'ZOS190', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS190' },
    { name: 'java', mode: 'drwxrwxrwx', size: 16384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/java' },
    { name: 'cicsts', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/cicsts' },
    { name: 'dead.letter', mode: '-rwxrwxrwx', size: 22157, type: 'FILE', link: 'https://tester.test.com:7443/api/v1/unixfiles/dead.letter' },
    { name: 'ZOS113', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS113' },
    { name: 'ing', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ing' },
    { name: 'netview', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/netview' },
    { name: 'ZOS201', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS201' },
    { name: 'insBase', mode: 'drwxrwxrwx', size: 0, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/insBase' },
    { name: 'vndr69a', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/vndr69a' },
    { name: '557', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/557' },
    { name: 'CICSIA', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/CICSIA' },
    { name: 'liberty_servers', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/liberty_servers' },
    { name: 'was', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/was' },
    { name: 'WebSphere', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/WebSphere' },
    { name: 'applications', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/applications' },
    { name: '.ssh', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/.ssh' },
    { name: 'temp', mode: 'drwxrwxrwx', size: 384, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/temp' },
    { name: 'bundles', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/bundles' },
    { name: 'ZOS111', mode: 'drwxrwxrwx', size: 256, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ZOS111' },
    { name: 'itbld', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/itbld' },
    // { name: 'àà¢ î á+î', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/api/v1/unixfiles/àà¢ î á+î' },
    //    { name: 'àà¢ë&àáâíå', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/api/v1/unixfiles/àà¢ë&àáâíå' },
    { name: 'RAA', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/RAA' },
    { name: 'db2', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/db2' },
    { name: 'rtehome', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/rtehome' },
    { name: 'liberty', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/liberty' },
    { name: 'ims12', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ims12' },
    { name: 'ims13', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/ims13' },
    { name: 'atlas', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/atlas' },
    { name: 'DD:STDOUT', mode: '-rwxrwxrwx', size: 0, type: 'FILE', link: 'https://tester.test.com:7443/api/v1/unixfiles/DD:STDOUT' },
    { name: 'RTCV502', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/RTCV502' },
    { name: 'jenkins', mode: 'drwxrwxrwx', size: 8192, type: 'DIRECTORY', link: 'https://tester.test.com:7443/api/v1/unixfiles/jenkins' },
];

export const fetchDirectoryChildrenRootDataResponse = {
    children: fetchDirectoryChildrenRootDataPost,
};

export const fetchDirectoryChildrenErrorResponse = {
    status: 'INTERNAL_SERVER_ERROR',
    message: 'Error',
};
