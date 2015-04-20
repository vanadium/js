// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var domready = require('domready');
var mercury = require('mercury');
var settings = require('../components/settings');
if (typeof window !== 'undefined') {
  window.debug = require('debug');
}

domready(function() {
  chrome.runtime.getBackgroundPage(function(bpWindow) {
    // Use the state object from the background page, so options and background
    // stay in sync.
    var state = bpWindow.bp.state;
    mercury.app(document.body, state, render);
  });
});

function render(state, _diff) {
  return settings.render(state.settings);
}