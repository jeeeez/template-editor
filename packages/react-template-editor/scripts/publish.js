const fs = require('fs');
const path = require('path');
const colors = require('colors');
const axios = require('axios').create();
const packageJson = require('../package.json');
const spawnSync = require('child_process').spawnSync;
const compareVersions = require('compare-versions');

function resolvePath(relativePath) {
    return path.resolve(__dirname, relativePath);
}


axios.interceptors.response.use(function (response) {
    return response.data;
}, function (response) {
    throw response;
});


const npmPackageName = '@template-editor/native';

// 获取最新版本号
function getCurrentVersion() {
    return axios.get(`https://registry.npmjs.org/${npmPackageName}`).then(function (res) {
        return res['dist-tags'].latest;
    }).catch(function (err) {
        throw err;
    });
}

async function prePublish() {
    const version = await getCurrentVersion();
    console.log('Latest Version:', colors.yellow(version));
    console.log('Current Version:', colors.green(packageJson.version));
    if (compareVersions(version, packageJson.version) > 0) {
        throw new Error('Current Version must great then ' + colors.yellow(version));
    }
}

function build() {
    try {
        console.log('building...'.yellow);

        const child = spawnSync('npm',
            [
                'run',
                'build'
            ], {
                stdio: 'inherit'
            });

        if (child.status === 0) {
            console.log('build success'.green);
        } else {
            process.exit();
            console.log('build failed'.red);
        }

    } catch (err) {
        throw err;
    }
}

async function publishToNPM() {
    try {
        console.log('publishing...'.yellow);

        fs.copyFileSync(
            resolvePath('../README.md'),
            resolvePath('../dist/README.md')
        );

        const child = spawnSync('npm', ['publish', '--access', 'public', resolvePath('../dist')], {
            stdio: 'inherit'
        });

        if (child.status === 0) {
            console.log('Publish success'.green);
        } else {
            process.exit();
            console.log('Publish failed'.red);
        }


        // sync taobao register
        spawnSync('curl', ['-X', 'PUT', `https://npm.taobao.org/sync/${npmPackageName}`]);
    } catch (err) {
        throw err;
    }
}


async function publish() {
    try {
        await prePublish();

        await build();

        await publishToNPM();
    } catch (err) {
        console.error(colors.red(err));
    }
}

publish();
