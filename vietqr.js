function include(file) {
 
    let script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
 
    document.getElementsByTagName('head').item(0).appendChild(script);
 
}
include('https://cdn.jsdelivr.net/gh/beanfamily/vietqr-payment-js@main/index.js')
include('https://cdn.jsdelivr.net/gh/beanfamily/vietqr-payment-js@main/qrcode.js')
