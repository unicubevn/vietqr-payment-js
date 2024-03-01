//---------------------------------------------------------------------
//
// VietQR Generator for JavaScript
//
// Copyright (c) 2023 The UniCube
//
// Maintainer: Jean Nguyen
//
// URL: https://unicube.vn
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
//---------------------------------------------------------------------
function include(file) {
 
    let script = document.createElement('script');
    script.src = file;
    script.type = 'module';
    script.defer = true;
 
    document.getElementsByTagName('head').item(0).appendChild(script);
 
}
include('https://cdn.jsdelivr.net/gh/unicubevn/vietqr-payment-js@main/index.js')
include('https://cdn.jsdelivr.net/gh/unicubevn/vietqr-payment-js@main/qrcode.js')
