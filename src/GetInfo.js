import getXiaChenDaoLuData from "./js/localdata/xiachendaolu";
import getZhenJiDaoLuData from "./js/localdata/zhenjidaolu";
import getQuGuanDaoLuData from "./js/localdata/quguandaolu";
import getWeiYiJiaoData from "./js/localdata/weiyijiao";
import getHeDaoData from "./js/localdata/hedao";
import getLvHuaData from "./js/localdata/lvhua";

export default getDataInfo;

function getDataInfo(category, cb) {
  let jsonFile = '';
  switch(category) {
    case "XiaChenDaoLu":
    jsonFile = "./xiachendaolu.json";
    break;
    case "ZhenJiDaoLu":
    jsonFile = "./zhenjidaolu.json";
    break;
    case "QuGuanDaoLu":
    jsonFile = "./quguandaolu.json";
    break;
    case "WeiYiJiao":
    jsonFile = "./weiyijiao.json";
    break;
    case "HeDao":
    jsonFile = "./hedao.json";
    break;
    case "LvHua":
    jsonFile = "./lvhua.json";
    break;
    default:
    break;
  }
  fetch(jsonFile)
  .then((res) => {
    console.log("GetInfo::fetch data from config files.");
    res.json().then(json => {
      console.log(json.roads.length);
      if (cb) {
        cb(json.roads.length);
      }
    });
  }, () => {
    console.log("GetInfo::fetch data from array.");
    let arr = {};
    switch(category) {
      case "XiaChenDaoLu":
      arr = getXiaChenDaoLuData();
      break;
      case "ZhenJiDaoLu":
      arr = getZhenJiDaoLuData();
      break;
      case "QuGuanDaoLu":
      arr = getQuGuanDaoLuData();
      break;
      case "WeiYiJiao":
      arr = getWeiYiJiaoData();
      break;
      case "HeDao":
      arr = getHeDaoData();
      break;
      case "LvHua":
      arr = getLvHuaData();
      break;
    }
    if (cb) {
      cb(arr.roads.length);
    }
  });
}

