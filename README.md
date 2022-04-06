# explorer-uss

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=zowe_explorer-uss&metric=alert_status)](https://sonarcloud.io/dashboard?id=zowe_explorer-uss)

The issues for the USS explorer are tracked under the Zowe Zlux repository, https://github.com/zowe/zlux and tagged accordingly with the 'explorer-uss' label. Open issues tagged with 'explorer-uss' can be found [here](https://github.com/zowe/zlux/issues?q=is%3Aopen+is%3Aissue+label%3Aexplorer-uss).


# App Development Workflow 

### Install Dependencies

As following modules 
 `explorer-ui-server`, `orion-editor-component` and `explorer-fvt-utilities` are published on Zowe Artifactory.
 `.npmrc` file is pre-configured with registry value of `https://zowe.jfrog.io/zowe/api/npm/npm-release`
```
npm install
```

### Build for Development

Modify the host variable in WebContent/js/utilities/urlUtils.js to a host and port that has the Zowe Jobs API server available

```
npm run dev 
```

Then you can visit http://localhost:8080 to test.
When testing you may see errors with API calls do to CORS (Cross origin resource sharing), to work around this you may disable CORS checking in your browser for local development. 

### Run unit tests

```
npm run test
```

### Run fvt/selenium tests

See [README](/tests/FVTTests/README.md)

### Build for Production

```
npm run prod
```

### Prepare for commit (Run linting, tests and production build)
```
npm run preCommit
```

### Prepare PAX Packaging Workspace

```
./.pax/prepare-workspace.sh
```

## Start With explorer-ui-server

After preparing PAX workspace, you can serve the explorer UI with explorer-ui-server:

```
node .pax/ascii/server/src/index.js --config .pax/ascii/server/configs/config.json
```

## Run SonarQube Code Analysis

Install [SonarQube Scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner).

If you are using Mac, try install with [HomeBrew sonar-scanner formula](https://formulae.brew.sh/formula/sonar-scanner), then update the configuration of SonarQube server at `/usr/local/Cellar/sonar-scanner/<version>/libexec/conf/sonar-scanner.properties`.

Example scanner configurations:

```
sonar.host.url=https://jayne.zowe.org:9000
sonar.login=<hash>
```

Then you can run `sonar-scanner` to start code analysis.

Build pipeline has embedded the SonarQube code analysis stage.


## Build and install as plugin in local zlux development environment

Modify `explorer-uss/Webcontent/index.html`   
Change relative path for `iframe-adapter.js` & `logger.js` to absolute path.   
Append with your `API Gateway` `Hostname` and `Port`

For example:
```
  <script type="text/javascript" src="https://mymainframe.com:7554/zlux/ui/v1/lib/org.zowe.zlux.logger/0.9.0/logger.js"></script>
  <script type="text/javascript" src="https://mymainframe.com:7554/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/iframe-adapter.js"></script>
```

Build web folder
```
cd explorer-uss
# root folder
npm install
# This will create web folder
npm run build
```

Install as ZLUX App/Plugin
```
# install in zlux locally
cd zlux/zlux-app-server/bin
./install-app.sh <path-to-explorer-uss>
```
`explorer-uss` root already have sample `pluginDefinition.json` & will have `web` folder after `build`.


