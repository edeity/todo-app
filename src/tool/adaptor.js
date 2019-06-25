const OS_TYPE = {
    WIN: 'win',
    MAC: 'mac',
    LINUX: 'linux',
};

// 通过userAgent得到当前系统
function getOSType(){
    if(navigator.userAgent.indexOf("Window")>0){
        return OS_TYPE.WIN;
    }else if(navigator.userAgent.indexOf("Mac OS X")>0) {
        return OS_TYPE.MAC;
    }else {
        return OS_TYPE.LINUX;
    }
}

// 通知
const notify = (title, body) => {
    console.log('通知：', title, body);
    new Notification(title, {
        body,
    });
};

// 跳转URL
const goToUrl = (url, errCb) => {
    try {
        const { shell } = window.require('electron');
        shell.openExternal(url);
    } catch (e) {
        try {
            window.open(url, '_blank');
        } catch (e) {
            errCb && errCb();
        }
    }
};

export {OS_TYPE, getOSType, notify, goToUrl};