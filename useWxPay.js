/**
 * @desc 微信支付-h5
 */
import {showToast} from "vant";
import {useRouter} from "vue-router";

export default function useWxPay() {
    const router = useRouter()

    // 判断是否是微信环境
    function isWeChat() {
        // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        let ua = window.navigator.userAgent.toLowerCase();
        // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    // 获取微信支付信息(调用后台接口返回拉起支付所需参数)
    function requestPayment(wxPay) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!isWeChat()) {
                    return reject('请到微信公众号充值')
                }
                // 拉起支付
                onBridgeReady(wxPay)
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }


    // 这个是调起微信支付密码窗口，输完密码后会微信后台会给到你回调，这时候你就完成了本次支付
    function onBridgeReady(wxPay) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": wxPay.appId, // 公众号ID，由商户传入
            "timeStamp": wxPay.timeStamp, // 时间戳，自1970年以来的秒数
            "nonceStr": wxPay.nonceStr,  // 随机串
            "package": wxPay.package, // 下单接口返回的prepay_id
            "signType": wxPay.signType,// wxPay.signType,  // 微信签名方式,默认为RSA
            "paySign": wxPay.paySign, // 微信签名
        }, function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                showToast({message: '支付成功', type: 'success'})
                router.back()
            }
        });
    }


    return {
        requestPayment
    }
}
