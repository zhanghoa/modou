// 1. 初始化动态 Host (使用你源码中最新的 CloudFront 节点)
var dynamicHost = 'https://hwa0v.com/';
try {
    // 尝试获取重定向后的最新网址，防止当前节点被封
    var response = request(dynamicHost, { withHeader: true, redirect: true, timeout: 3000 });
    var finalUrl = response.url.split('?')[0];
    if (finalUrl && finalUrl.startsWith('http')) {
        dynamicHost = finalUrl.replace(/\/$/, ""); 
    }
} catch (e) {
    // 请求超时则继续使用默认的 dynamicHost
}

var rule = {
    title: '麻豆CloudFront(自动更新版)',
    host: dynamicHost,
    
    // 分类链接
    url: '/topic/17521/fyclass/fypage/', 
    
    // 分类名与分类ID
    class_name: '精选好片&麻豆出品&女优试镜&爱豆传媒&星空传媒&精东影业&天美传媒&果冻传媒&91制片厂&大象传媒&福利姬&探花大神&黑料吃瓜&日本禁忌&制服OL&无码中出&中文字幕&欧美经典',
    class_url: '13678&13679&13684&13687&13686&13688&13931&13712&15812&15815&13713&13715&15153&13719&13722&13725&13726&13731', 

    // 搜索接口
    searchUrl: '/searchvideo/**', 
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        // 让 Referer 跟随动态 Host 变化，防止报 403 盗链错误
        'Referer': dynamicHost + '/' 
    },
    
    // 开启解析作为最后一道防线
    play_parse: true,
    lazy: '', 
    limit: 6,

    推荐: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',
    一级: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',
    搜索: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',

    二级: {
        "title": "h1&&Text",
        "img": "",
        "desc": ".related-gls__content h5&&Text; .vd-infos p:eq(0)&&Text; ; .vd-infos p:eq(1)&&Text; ", 
        "content": ".vd-infos__desc&&Text",
        "tabs": "js:TABS=['直链秒播']",
        // 核心修改：动态获取 Host 拼接，增强了清洗正则
        "lists": "js:try{var match=html.match(/const\\s+path\\s*=\\s*[\"'](.*?)[\"']/);if(match){var path=match[1].replace(/\\\\u0026/g,'&').replace(/\\\\\\//g,'/').replace(/\\\\/g,'');var playUrl=rule.host+'/h5/m3u8/'+path;LISTS=[['秒播源$'+playUrl]]}else{LISTS=[['网页嗅探$'+VOD.vod_id]]}}catch(e){LISTS=[['解析出错$'+VOD.vod_id]]}"
    }
};
