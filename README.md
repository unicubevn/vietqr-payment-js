# VietQR Generation Library

This is a VietQR generation library.

This library will help you to generate the VietQR Data String which align with VietQR Specification announced on 05/10/2022
## VietQR Library specification:
- **The detail "VietQR fields" :**
    -  `is_dynamic_qr`:
        - 'False' for static QR
        - 'True' for dynamic QR
    - `merchant_category`: defined by ISO 18245 and assigned by Payment Instituation.
    - `postal_code`: Postal code, **Ex**: postcode = 70000 for Vietnam
    - `currency`: defined by ISO 4217, for Vietnam: `currency = 704`
    - `country_code`: defined by ISO ISO 3166-1 alpha 2, for Vietnam: `country_code = VN`
    - `amount`: Total amount (including TIP) of bill
    - `acq`: Acquirer bank code defined by Vietname State Bank.
    - `service_code`: VietQR service code as following
        - `QRPUSH`: Payment service code by QR
        - `QRIBFTTC`: Inter-Bank Fund Transfer 24/7 to Card service code by QR
        - `QRIBFTTA`: Inter-Bank Fund Transfer 24/7 to Account service code by QR
    - `merchant_id`:  as following
        - for QRPUSH: Merchant ID will be provided by Acquirer bank.
        - for QRIBFTTC: Merchant ID will be your ATM card number which started with '9704...'.
        - for QRIBFTTA: Merchant ID will be your bank account.
    - `purpose_txn`: payment/transfer purpose
    - Other extended and optional variable
        - `bill_number`: Your bill number
        - `terminal_label`: Your terminal ID
        - `store_label`: Your store name
        - `mobile_number`: Your customer mobile phonenumber
        - `loyalty_number`: Your customer loyalty numbeer
        - `customer_label`: Your customer ID
        - `ref_label`: Your reference info

## To use this library, do as following
- Import the VietQR and QRcode libraries: 
  > const { VIETQR, CURRENCY, SERVICE_CODE} = require('vietqr-js');
  > 
  > const QRCODE = require('vietqr-js/qrcode');
- Generate the VietQR data string:

    - **Example for "Money transfer" VietQR**:
  > let vietQRdata = new VIETQR() 
  > 
  > vietQRdata.fields.is_dynamic_qr = true;
  > 
  > vietQRdata.fields.merchant_category = "9999"
  > 
  > vietQRdata.fields.amount = "10000";
  > 
  > vietQRdata.fields.acq = "970441";
  > 
  > vietQRdata.fields.merchant_id = "660704060000129";
  > 
  > vietQRdata.fields.service_code = SERVICE_CODE.TO_ACCOUNT;
  > 
  > vietQRdata.fields.purpose_txn = "Thanh toán bill 12/12 cho Jean";
  >
  > vietQRData = vietQRdata.builder()
  >
    - **The result**: 00020101021238590010A0000007270129000697044101156607040600001290208QRIBFTTA5204999953037045405100005802VN62390835THANH TOAN BILL 12-12 CHO JEAN6304F6B3
  - Then you can use  **QRcode** library to generate the VietQR :
  > let qrcode = new QRCODE(0,"M")
  > 
  > qrcode.addData(vietQRData.builder(),"Byte")
  > 
  > qrcode.make()
  > 
  > console.log(qrcode.createImgTag())
  - Then the result for create VietQR Image Tag as following:
    
   `<img src="data:image/gif;base64,R0lGODdhegB6AIAAAAAAAP///ywAAAAAegB6AAAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27qsC8kzTiozYh84DRu3bBX9B3W12BAIpSuUxhxTiAj2ikTrEWrPQabcZlXgX4+/3WhZCGdOqNJteT+Jqchi7rD/1iXZ0jMbVJ+jg5wZWdEe0ZZjIeNe4t4j3R9jQ6PfYk4aZmEkZuCWpBeo451kpStr5KDf5umop95lHx4ZKmxq7CQnnOytbl+smhmsaydek6UQKe3s1WRu8Jx3de1aJ+OlsB72rW1yImlRz6/r2PF46yv5g+03uDcupiE7ZOijOpJ1r7R/7rx/AgcO07eMX8JjChAwJLvyGiAQgZtvuNbNHJ5RFGP/nlA1URa+iGWH1QHTSSG9kPDDpVHGLeOHktYvzSpbySM4lzZs2IfDqqI6b0HwWkQGrmPKU0YtLM06DB/WoqZdPRxJj+hClOqfY/nnd6TPbVKwJJ1oTmazcx7XvzEEV2NSgHaluze5sO/dt1qA85ZHdSNRuUgveeFUjGfKp3Zp5lmEoLPbwWUF+gQJtzJPwQ7pRu9XTeHlsUrzUxk4+fUmtyru+kFI2XWEiaKJUf6Z1TLLrB9kzRyWOK1Wrbg5wVa9bi4+xWq6Dij/eG+jQ69kemVvdHHM5P5uucYLFaEwa2oOR5ZbGNjsnRIrgYvOtbpw6dNEzBf/6rg8w/Oj3G17/FZ5bgBp4p5NzrA1VIHbIkBYBgfrtRRWCD361YFXu0Bfheu3INNl4fJyjWU0ZskIbYtrh8451p3D2X3jl8WYZW58xE6KJIN0Hk3fyUTgjZpqNZslSdb0mDkKemTTjUELmNZhnMKlHHI4nlsgbZmgtZmNzPa1o4pX99SWlb0QCltwGXnpZ5mrDHQecQwyep+WIxqn5RpUK2YdaMTLBx1mH7F2H15MZGCaXfYayhNWSK1XGJYgOoSYdnHnqtaGFGQJT1lawuZbgjZXug6KLAuFW0JCQRfphg8b4iSqpdwa5qpaj4pdapQ6S6KiHcl5Kq1u5IhrcmJjWGtimX4IKZpOh/y66XadOmufeMpCtVNt2tilpraVZDitZZsROGlamjuY3rYaJzkklX+G6eWy0RU3pV5OlmrurPQNqKp2KIlJ6XL06hSMjlLKy59S1xfo57oU8CoyedgWLNSTCqQIMY531tdvnuQbP+6aAD1qJIbHyiRfmu+S1ei6deIKXsIQGh3UYlvyJqdy+vh5Jpqr8cXhbyhYDejGjHa9J8o4+l0losPkhexXQiTVs542cbttrsR4mHafFO+Mb8qRDp7vuykv7XKG+u2F8sMc3V1w2rBI53FvWp/YitskTlvhjeQm/3O/dbL8nrM6twbslkOpN3aLM2iYYc+FjPh2w3c5KGLHktP/+1rW3yv7FsML8ujxde3aiCTbOACvXOOJb6pl5QV8rzqfliro3daavT8k4rIfGbnOAW9+e+OAtdflnz9zSjS7MLqKuuy6Ql3b1xc/xHPWzX/2b5cPDTu921iqLPjiAqx2a983Yz927jsYqjj2y4HqrfLezpgNylBnjFj/uj16ovgkVQxq3hX0LOQcawf/0giUBrs1Y7SgStKq3LN9xR29/qZ1SHhi+DO5rdlhbWQJVRa4eoeuAABwfdnp3OiaJsFzn05QJr8c5LjWOTtIS1QRrKLVmuWuG9hoYoXxEPNtka3HmigujUtgiB7IvOxHcmv1YNrGfGW+HhCOagmIVQkFd1SxnWXSeBiWoNM8ZKTTtGyDN2ESjj3kRZdH74LoWGCqQVY9Eqhse5Z7FuyjiD40LJFlovlbDpl0ujd36I8TSckSOKHKRjGykIx8JyUhKcpKUrKQlL4nJTGpSAgUAADs=" width="128" height="128"/>`


## Supporting
- Any questions please send us a comment via email: **community@thebeanfamily.org**.
  