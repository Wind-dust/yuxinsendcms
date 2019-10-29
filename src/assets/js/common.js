function downloadIamge(imgsrc, name = 'photo') { //下载图片地址和图片名
    if (!imgsrc) return
    let image = new Image();
    // 解决跨域 Canvas 污染问题
    console.log(imgsrc)
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
}

let tableToExcel = function(head = [], Data = []) {
    let str = '<tr>'
    for (let item in head) { //增加\t为了不让表格显示科学计数法或者其他格式   
        str += `<td>${ head[item] + '\t'}</td>`;
    }
    str += '</tr>'
    for (let i = 0, len = Data.length; i < len; i++) {
        str += '<tr>';
        for (let item in Data[i]) {
            str += `<td>${ Data[i][item] + '\t'}</td>`;
        }
        str += '</tr>';
    } //Worksheet名      
    let worksheet = 'Sheet1'
    let uri = 'data:application/vnd.ms-excel;base64,'; //下载的表格模板数据     
    var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"       xmlns:x="urn:schemas-microsoft-com:office:excel"       xmlns="http://www.w3.org/TR/REC-html40">    <head><meta charset="UTF-8">  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>        <x:Name>${worksheet}</x:Name>        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->        </head><body><table>${str}</table></body></html>`; //下载模板    
    window.location.href = uri + window.btoa(unescape(encodeURIComponent(template)))
}

function getStype(n) {
    let text = ''
    switch (parseInt(n)) {
        case 1:
            text = '商票'
            break;
        case 2:
            text = '佣金'
            break;
        case 3:
            text = '积分'
            break;
    }
    return text
}

function getIdentity(n) {
    let text = ''
    switch (parseInt(n)) {
        case 1:
            text = '普通会员'
            break;
        case 2:
            text = '钻石会员'
            break;
        case 3:
            text = '创业店主'
            break;
        case 4:
            text = '合伙人'
            break;
    }
    return text
}

function getStatus(n) {
    let text = ''
    switch (parseInt(n)) {
        case 1:
            text = '待审核'
            break;
        case 2:
            text = '审核通过'
            break;
        case 3:
            text = '审核不通过'
            break;
    }
    return text
}

function getSexText(n) {
    let text = ''
    switch (parseInt(n)) {
        case 1:
            text = '男'
            break;
        case 2:
            text = '女'
            break;
    }
    return text
}

function getShopApplyStatus(n) {
    let text = ''
    switch (parseInt(n)) {
        case 1:
            text = '提交申请中'
            break;
        case 2:
            text = '财务审核通过'
            break;
        case 3:
            text = '经理审核通过'
            break;
        case 4:
            text = '审核不通过'
            break;
    }
    return text
}

function imageDeal(files, returnBase64) {
    //获取file，转成base64	
    let that = this
    var file = files;
    //取传入的第一个文件
    //如果未找到文件，结束函数，跳出			
    if (undefined == file) return;

    if (file.size <= 1048576) {
        returnBase64(file)
        return
    }
    var r = new FileReader();
    r.readAsDataURL(file);
    r.onload = function(e) {
        var base64 = e.target.result;
        var bili = 1.5;
        console.log("压缩前：" + base64.length);
        suofang(base64, bili, returnBase64);
    }
}

function suofang(base64, bili, callback) {
    console.log("执行缩放程序,bili=" + bili); //处理缩放，转格式	
    var _img = new Image();
    let that = this;
    _img.src = base64;
    _img.onload = function() {
        var _canvas = document.createElement("canvas");
        var w = this.width / bili;
        var h = this.height / bili;
        _canvas.setAttribute("width", w);
        _canvas.setAttribute("height", h);
        _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        var base64 = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob(function(blob) {
            if (blob.size > 1024 * 1024) {
                suofang(base64, bili, callback);
            } else {
                let m = parseInt(Math.random() * 100000)
                let file = dataURLtoFile(base64, m + '.jpg')
                callback(blob, file);
            }
        }, "image/jpeg");
    }
}

function dataURLtoFile(dataurl, filename) { //将base64转换为文件
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export {
    downloadIamge,
    tableToExcel,
    getStype,
    getIdentity,
    getStatus,
    getSexText,
    getShopApplyStatus,
    imageDeal
}