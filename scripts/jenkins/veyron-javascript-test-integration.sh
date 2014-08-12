#!/bin/bash

set -e

readonly OUTDIR="/var/www/jscov/integration"
export TMPDIR="/var/veyron/tmp/veyron-javascript-test-integration"
mkdir -p "${TMPDIR}"

readonly REPO_ROOT="$(git rev-parse --show-toplevel)"
"${VEYRON_ROOT}/veyron/scripts/build/go" install veyron/... veyron2/...
cd "${REPO_ROOT}"
make test_out/veyron.test.integration.js
xvfb-run -a -s "-screen -0 800x600x24" ./vgrunt jenkins_tests --tests integration

rm -rf "${OUTDIR}"
cp -r "${REPO_ROOT}/dist/test/coverage/integration" "${OUTDIR}"
