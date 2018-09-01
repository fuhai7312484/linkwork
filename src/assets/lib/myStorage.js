import axios from "axios";
//post接口请求公共调用

export function getPostInfo(url, obj) {
  let ipUrl = "http://39.107.254.60:8081/";
  var qs = require("qs");
  return axios.post(ipUrl + url, qs.stringify(obj));
}

//设置Cookie
export function setCookie(key, val, time) {
  if (time) {
    let iDate = new Date();
    iDate.setDate(iDate.getDate() + time);
    document.cookie = key + "=" + val + "; expires=" + iDate;
  } else {
    document.cookie = key + "=" + val;
  }
}
//获取Cookie
export function getCookie(key) {
  let str = document.cookie.split(";")[0].split("=")[1];
  return str;
}
//删除Cookie
export function rmCookie(name) {
  setCookie(name, "", -1);
}
//url接口获取数据
export function getDataArr(url) {
  let arrData = fetch("http://localhost:88/api/" + url).then(e => {
    return e.json();
  });
  return arrData;
}

//设置localStorage
export function setStorage(key, val, time) {
  localStorage.setItem(key, JSON.stringify(val));
}
//获取localStorage
export function getStorage(key) {
  var json = localStorage.getItem(key);
  let dataObj = JSON.parse(json);
  // console.log(json)
  if (dataObj) {
    if (dataObj.time) {
      let newDate = new Date().getTime();
      // console.log(dataObj.time,newDate,newDate-dataObj.time,(1000*60*60*24*7))
      // console.log(newDate-dataObj.time,(1000*60*60*24*7))
      // console.log(newDate-dataObj.time,(1000*60*60*24*7))
      if (newDate - dataObj.time > 3000) {
        console.log("信息已过期");
        stoRemove(key);
      } else {
        return dataObj;
      }
    } else {
      return dataObj;
    }
  }

  // if(json){
  //     return JSON.parse(json);
  // }
}

export function stoRemove(key) {
  localStorage.removeItem(key);
}
export function stClear() {
  localStorage.clear();
}

export function TipInfo(el, txt) {
  el.innerHTML = txt;
}
//设置react的key
export function getDealKey(arr) {
  let dataArr = [];
  for (let i = 0; i < arr.length; i++) {
    dataArr.push({ key: i + 1, ...arr[i] });
  }
  return dataArr;
}
//手机号验证正则表达式
export function PhoneReg(str) {
  var re = /^1\d{10}$/;
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}
//处理手机号显示
export function strPhone(phone) {
  if (phone) {
    let str = phone + "";
    return str.substr(0, 3) + "****" + str.substr(7, 11);
  } else {
    return;
  }
}
//时间戳转时间
export function getToTime(timeStamp, str) {
  if (!timeStamp) return;
  function toDou(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  str = str
    ? { dateY: str, dateM: str, dateD: " " }
    : { dateY: "年", dateM: "月", dateD: "日" };
  var date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + str.dateY;
  let M = toDou(date.getMonth() + 1) + str.dateM;
  let D = toDou(date.getDate()) + str.dateD;
  let h = toDou(date.getHours()) + ":";
  let m = toDou(date.getMinutes()) + ":";
  let s = toDou(date.getSeconds());
  return Y + M + D + h + m + s;
}

// 时间统一函数
export function transDate(time) {
  // var $time =document.getElementById("share-time");
 
  var date = time;

  var tt = new Date(parseInt(date));
  var days = parseInt((new Date().getTime() - date) / 86400000);
  var today = new Date().getDate();
  var year = tt.getFullYear();
  var mouth = tt.getMonth() + 1;
  var day = tt.getDate();
  var time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours();
  var min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes();
  var result, offset;
　　　　　　　offset = Math.abs(today - day);
　　　　if (days < 2&&offset<2) {
　　　　　　　if (offset === 0) {
      result = "今天" + time + ":" + min;
    } else if (offset === 1) {
      result = "昨天" + time + ":" + min;
    } 
  } else {
    result = year + "-" + mouth + "-" + day + " " + time + ":" + min;
  }
  return result;
}

//获取当前时间
export function getNewDataTime() {
  
  function toDou(n) {
    return n < 10 ? "0" + n : "" + n;
  }
 
  var date = new Date(); 
  let Y = date.getFullYear()
  let M = toDou(date.getMonth() + 1)
  let D = toDou(date.getDate()) 
  let h = toDou(date.getHours()) 
  let m = toDou(date.getMinutes()) 
  let s = toDou(date.getSeconds());
  return Y + M + D + h + m + s;
}
//获取当前时间的时间戳和过去3个月的时间戳
export function getTimestamp() {
  let date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  var newData = year + seperator1 + (month*1+3) + seperator1 + strDate
  let timeStampArr = [currentdate,newData];

  // let startTime = new Date();
  // let timeStampArr = [Date.parse(startTime)];
  // let endTime = startTime.setMonth(startTime.getMonth() + 3);
  // // let endTime = startTime.setTime(startTime.getTime() + 3600 * 1000 * 24 * 90);
  // timeStampArr.push(endTime);
  return timeStampArr;
}
export function character(index) {
  //  for(var i=0;i<25;i++){
  // console.log(index)
  index >= 25 ? (index = 0) : index;
  return String.fromCharCode(65 + index);

  // }
}

export function autodivheight() {
  //函数：获取尺寸
  //获取浏览器窗口高度
  var winHeight = 0;
  if (window.innerHeight) winHeight = window.innerHeight;
  else if (document.body && document.body.clientHeight)
    winHeight = document.body.clientHeight;
  //通过深入Document内部对body进行检测，获取浏览器窗口高度
  if (document.documentElement && document.documentElement.clientHeight)
    winHeight = document.documentElement.clientHeight;
  return winHeight;
  //DIV高度为浏览器窗口的高度
  //document.getElementById("test").style.height= winHeight +"px";
  //DIV高度为浏览器窗口高度的一半
  // document.getElementById(el).style.height= winHeight/2 +"px";
}

export function setKeyIndex(arr){
  arr.forEach((e,index) => {
    e.key = index;
  });
}


export function getFileType(str){
  // let imageType = "jpg" || "png" || "gif" || "bmp";
  // let videoType = "mp4";
  if(str=='jpg' || str=='png'){
    return 'img';
  }else if(str=='mp4'){
    return 'mv';
  }else if(str=='pdf' || str=='xls' || str=='zip'){

    return 'file'

  }


  
  // switch(str){
  //   case "jpg" || "png" || "gif" || "bmp":
  //   return 'img';
  //   break;
  //   case videoType:
  //   return 'mv'
  //   break;
  // }

  
}
export function setFileTyleImge(FileName){
  let fileType = FileName.split(".")[1]
  switch(fileType){
    case 'pdf':
    // return 'pdf'
    return require('../../assets/images/PDF.png');
    break;
    case 'xls':
    case 'xlsx':
    return require('../../assets/images/EXCEL.png');
    break;
    case 'ppt':
    case 'pptx':
    return require('../../assets/images/PPT.png');
    break;
    case 'doc':
    case 'docx':
    return require('../../assets/images/word.png');
    break;
    case 'txt':
    return require('../../assets/images/TXT.png');
    break;
    case 'psd':
    return require('../../assets/images/PS.png');
    break;
    case 'dwt':
    case 'dwg':
    return require('../../assets/images/CAD.png');
    break;
    case 'html':
    return require('../../assets/images/HTML.png');
    break;
    case 'zip':
    case 'rar':
    case '7z':
    case 'jar':
    case 'iso':
    return require('../../assets/images/ZIP.png');
    break;
    case 'mp3':
    return require('../../assets/images/mp3.png');
    break;
    case 'mp4':
    return require('../../assets/images/mp4.png');
    break;
    case 'max':
    return require('../../assets/images/MAX.png');
    break;
    default:
    return require('../../assets/images/Other.png');
  }


  console.log(fileType)


}

export function statusColor(isMyProject, status, uStatus){
  // console.log(isMyProject, status, uStatus)

   if (isMyProject != null && isMyProject === "Y") {
    if (status === "0") {
      switch (uStatus) {
        case "0":
          return { color: "#3db2ea" };
          break;
        case "1":
          return { color: "#676767" };
          break;
        case "2":
          return {
            color: "#a9a9a9",
            textDecoration: "line-through"
          };
          break;
      }
    } else if (status === "4") {
      return {
        color: "red"
      };
    }
  } else {
    switch (uStatus) {
      case "0":
        return { color: "#181818" };
        break;
      case "1":
        return { color: "#676767", fontWeight: "bold" };
        break;
      case "2":
        return {
          color: "#a9a9a9",
          textDecoration: "line-through"
        };
        break;
    }
  }

}