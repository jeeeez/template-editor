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


const npmPackageName = '@shuyun-ep-team/template-editor';

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
    console.log('上次发布版本：', colors.yellow(version));
    console.log('当前发布版本：', colors.green(packageJson.version));
    if (compareVersions(version, packageJson.version) > 0) {
        throw new Error('当前发布版本必须大于上次发布版本');
    }
}

function build() {
    try {
        console.log('正在构建代码...'.yellow);

        const child = spawnSync('npm',
            [
                'run',
                'build'
            ], {
                stdio: 'inherit'
            });

        if (child.status === 0) {
            console.log('构建成功'.green);
        } else {
            process.exit();
            console.log('构建失败'.red);
        }

    } catch (err) {
        throw err;
    }
}

async function publishToNPM() {
    try {
        console.log('正在发布...'.yellow);

        fs.copyFileSync(
            resolvePath('../README.md'),
            resolvePath('../dist/README.md')
        );

        // 发布至 npm
        const child = spawnSync('npm', [
            'publish',
            '--access',
            'public',
            resolvePath('../dist')
        ], {
                stdio: 'inherit'
            });

        if (child.status === 0) {
            console.log('发布成功'.green);
        } else {
            process.exit();
            console.log('发布失败'.red);
        }


        // 同步淘宝镜像
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
