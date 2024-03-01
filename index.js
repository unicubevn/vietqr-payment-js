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

'use strict';
//Contants and tools
const SERVICE_CODE = {
    PAYMENT: "QRPUSH",
    TO_CARD: "QRIBFTTC",
    TO_ACCOUNT: "QRIBFTTA"
};
const NAPAS_GUID = "A000000727";
const CURRENCY = {
    VND: "704",
    USD: "840"
}
var FIELDS = {
    is_dynamic_qr: false,
    merchant_category: "",
    merchant_name: "",
    merchant_city: "",
    postal_code: "",
    currency: "704",
    country_code: "VN",
    amount: "0",
    acq: "970403",
    merchant_id: "",
    service_code: SERVICE_CODE.TO_ACCOUNT,
    bill_number: "",
    mobile_number: "",
    store_label: "",
    loyalty_number: "",
    ref_label: "",
    customer_label: "",
    terminal_label: "",
    purpose_txn: "",
    additional_data: "",
    lang_ref: "",
    local_merchant_name: "",
    local_merchant_city: "",
    uuid: "",
    ipn_url: "",
    app_package_name: "",
    custom_data:"",
}

const CRC = {
    stringToUtf8ByteArray(str) {
        // TODO(user): Use native implementations if/when available
        var out = [], p = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            } else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            } else if (
                ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
                ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
                // Surrogate Pair
                c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            } else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return out;
    },

    /**
     * Function này phải dùng stringToUtf8ByteArray để convert về Byte[]
     * @param {*} str
     * @param {*} offset
     * @returns
     */

    getCrc16(str, offset = 0) {
        let data = this.stringToUtf8ByteArray(str);
        if (data == null || offset < 0 || offset > data.length - 1 || offset + length > data.length) {
            return 0;
        }

        let crc = 0xFFFF;
        for (let i = 0; i < str.length; ++i) {
            crc ^= data[offset + i] << 8;
            for (let j = 0; j < 8; ++j) {
                crc = (crc & 0x8000) > 0 ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return (crc & 0xFFFF).toString(16).toUpperCase();
    },


    /**
     * Function này không dùng stringToUtf8ByteArray để convert về Byte[]
     * @param {Chuỗi cần check CRC} text
     * @param {true hoặc false, mặc định là true} hex_output
     * @returns {Chuỗi CRC}
     */

    getCrc16_array(text, hex_output = true) {
        // adapted from https://github.com/damonlear/CRC16-CCITT
        // by https://stackoverflow.com/users/13045193/doubleunary
        // for https://stackoverflow.com/q/68235740/13045193
        // Example: http://www.ip33.com/crc.html
        if (!Array.isArray(text))
            text = [[text]];
        const polynomial = 0x1021;
        let result = text.map(row => row.map(string => {
            if (!string.length)
                return null;
            const bytes = Array.from(String(string))
                .map(char => char.charCodeAt(0) & 0xff); // gives 8 bits; higher bits get discarded
            let crc = 0xffff;
            bytes.forEach(byte => {
                for (let i = 0; i < 8; i++) {
                    let bit = 1 === (byte >> (7 - i) & 1);
                    let c15 = 1 === (crc >> 15 & 1);
                    crc <<= 1;
                    if (c15 ^ bit)
                        crc ^= polynomial;
                }
            });
            crc &= 0xffff;
            return hex_output ? crc.toString(16).toUpperCase() : crc;
        }));
        return result.toString();
    },


    /**
     * This function is used for replace special character and Vietnamese Utf-8 character to ASCII character
     * @param {*} str
     * @returns
     */
    nonAccentVietnamese(str) {
        str = str.toLowerCase();
        str = str.replace(new RegExp('/', 'g'), '-')
//     We can also use this instead of from line 11 to line 17
//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
//     str = str.replace(/\u0111/g, "d");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str.toUpperCase().trim();
    }
}

class TLV {
    constructor(id = 0, name = "", length = 99, is_fixed = true, presense = "O", value = "" || []) {
        this.tagId = id;
        this.tagName = name;
        if (is_fixed) {
            this.tagLength = length;
        } else {
            this.tagLength = name.length;
        }
        this.tagValue = value;
        this.presense = presense;

    }

    toString() {
        let value = ""
        if (Array.isArray(this.tagValue)) {
            for (let de = 0; de < this.tagValue.length; de++) {
                if (this.tagValue[de] instanceof TLV) {
                    // console.log(`    subtag ${de}: ${this.tagValue[de]}`);
                    if (this.tagValue[de].tagValue !== "") {

                        // console.log(this.tagValue[de].toString())
                        value += this.tagValue[de].toString()
                    }
                }
            }
        } else {
            value = this.tagValue
        }
        if (value === "") {
            return ""
        } else {
            this.tagLength = value.length
            return `${this.tagId >= 10 ? `${this.tagId}` : `0${this.tagId}`}${this.tagLength >= 10 ? `${this.tagLength}` : `0${this.tagLength}`}${value}`
        }
    }
}

//Classes
class VIETQR {
    constructor() {
        this.data = []
        this.fields = FIELDS
    }

    toString() {
        let str = ""
        // console.log(`Data: ${this.data.length}`)
        for (let de = 0; de < this.data.length; de++) {
            if (this.data[de] instanceof TLV) {
                // console.log(`tag ${de}: ${this.data[de].toString()}`)
                str += this.data[de].toString()
            }
        }
        let semi_vietqr = `${str}6304`
        let crc_value = CRC.getCrc16_array(semi_vietqr)
        return `${semi_vietqr}${crc_value}`
    }

    builder() {

        this.data[0] = new TLV(0, "Payload Format Indicator", 2, true, "M", "01")
        this.data[1] = new TLV(1, "QR Type", 2, true, "M", this.fields.is_dynamic_qr ? "12" : "11")
        this.data[38] = new TLV(38, "QR code service on NAPAS system", 99, false, "M", [
            new TLV(0, "Global Unique Identifier - GUID", 10, true, "M", NAPAS_GUID),
            new TLV(1, "Payment network specific", 32, false, "M", [
                new TLV(0, "Acquier ID/BNB ID", 6, true, "M", this.fields.acq),
                new TLV(1, "Merchant ID/Consumer ID", 19, false, "M", this.fields.merchant_id),
            ]),
            new TLV(2, "Service Code", 10, false, "C", this.fields.service_code),
        ])
        this.data[52] = new TLV(52, "Merchant Category Code", 4, true, "O", this.fields.merchant_category)
        this.data[53] = new TLV(53, "Transaction Currency", 3, true, "M", this.fields.currency)
        this.data[54] = new TLV(54, "Transaction Amount", 13, false, "C", this.fields.is_dynamic_qr?this.fields.amount:"")
        this.data[55] = new TLV(55, "Tip or Convenience Indicator", 2, true, "O")
        this.data[56] = new TLV(56, "Value of Convenience Fee Fixed", 13, false, "O")
        this.data[57] = new TLV(57, "Value of Convenience Fee Percentage", 5, false, "O")
        this.data[58] = new TLV(58, "Country Code", 2, true, "M", this.fields.country_code)
        this.data[59] = new TLV(59, "Merchant Name", 25, false, "O", this.fields.merchant_name)
        this.data[60] = new TLV(60, "Merchant City", 15, false, "O", this.fields.merchant_city)
        this.data[61] = new TLV(61, "Postal Code", 10, false, "O", this.fields.postal_code)
        this.data[62] = new TLV(62, "Additional Data Field Template", 99, true, "O", [
            null,
            new TLV(1, "Bill Number", 25, false, "C", this.fields.bill_number),
            new TLV(2, "Mobile Number", 25, false, "C", this.fields.mobile_number),
            new TLV(3, "Store Label", 25, false, "O", this.fields.store_label),
            new TLV(4, "Loyalty Number", 25, false, "O", this.fields.loyalty_number),
            new TLV(5, "Reference Label", 25, false, "C", this.fields.ref_label),
            new TLV(6, "Customer Label", 25, false, "C", this.fields.customer_label),
            new TLV(7, "Terminal Label", 25, false, "O", this.fields.terminal_label),
            new TLV(8, "Purpose of Transaction", 25, false, "C", CRC.nonAccentVietnamese(this.fields.purpose_txn)),
            new TLV(9, "Additional Consumer Data Request", 3, false, "O", this.fields.additional_data)
        ])
        this.data[63] = new TLV(63, "CRC (Cyclic Redundancy Check)", 4, true, "M")
        this.data[64] = new TLV(64, "Merchant Information - Language Template", 2, true, "O", [
            new TLV(0, "Language Preference", 2, true, "M", this.fields.lang_ref),
            new TLV(1, "Merchant Name - Alternate Language", 25, false, "M", this.fields.local_merchant_name),
            new TLV(2, "Merchant City - Alternate Language", 15, false, "O", this.fields.local_merchant_city),
        ])
        this.data[80] = new TLV(80,"UniCube data",99,false,"0",[
            new TLV(0, "uuid", 16, false, "O", this.fields.uuid),
            new TLV(1, "custom data", 83, false, "O", this.fields.custom_data),
        ])
        return this.toString()
    }

}


//Create VIETQR object for export
module.exports = {
    VIETQR, SERVICE_CODE, CURRENCY
};
