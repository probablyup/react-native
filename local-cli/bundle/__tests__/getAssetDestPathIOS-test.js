/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

jest.dontMock('../getAssetDestPathIOS');

const getAssetDestPathIOS = require('../getAssetDestPathIOS');

describe('getAssetDestPathIOS', () => {
  const platform = process.platform;

  beforeEach(() => process.platform = 'linux');
  afterEach(() => process.platform = platform);

  it('should build correct path (posix)', () => {
    const asset = {
      name: 'icon',
      type: 'png',
      httpServerLocation: '/assets/test',
    };

    expect(getAssetDestPathIOS(asset, 1)).toBe('assets/test/icon.png');
  });

  it('should build correct path (win32)', () => {
    process.platform = 'win32';
    const asset = {
      name: 'icon',
      type: 'png',
      httpServerLocation: '/assets/test',
    };

    expect(getAssetDestPathIOS(asset, 1)).toBe('assets\\test\\icon.png');
  });

  it('should consider scale (posix)', () => {
    const asset = {
      name: 'icon',
      type: 'png',
      httpServerLocation: '/assets/test',
    };

    expect(getAssetDestPathIOS(asset, 2)).toBe('assets/test/icon@2x.png');
    expect(getAssetDestPathIOS(asset, 3)).toBe('assets/test/icon@3x.png');
  });

  it('should consider scale (win32)', () => {
    process.platform = 'win32';
    const asset = {
      name: 'icon',
      type: 'png',
      httpServerLocation: '/assets/test',
    };

    expect(getAssetDestPathIOS(asset, 2)).toBe('assets\\test\\icon@2x.png');
    expect(getAssetDestPathIOS(asset, 3)).toBe('assets\\test\\icon@3x.png');
  });
});
