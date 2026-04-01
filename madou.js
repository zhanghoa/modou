// 1. 初始化动态 Host (尝试从发布页获取最新节点)
var dynamicHost = 'https://hwa0v.com/';
try {
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
    
    url: '/topic/17521/fyclass/fypage/', 
    
    class_name: '精选好片&麻豆出品&女优试镜&爱豆传媒&星空传媒&精东影业&天美传媒&果冻传媒&91制片厂&大象传媒&福利姬&探花大神&黑料吃瓜&日本禁忌&制服OL&无码中出&中文字幕&欧美经典',
    class_url: '13678&13679&13684&13687&13686&13688&13931&13712&15812&15815&13713&13715&15153&13719&13722&13725&13726&13731', 

    searchUrl: '/searchvideo/**', 
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Referer': dynamicHost + '/' 
    },
    
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
        // 【核心修复】：使用多行模板字符串，从 VOD.vod_id 提取真正的 Host，用 split 提取并清洗 path
        "lists": `js:
            try {
                // 1. 从当前视频详情页的真实链接中，安全地提取出域名部分
                var currentHost = VOD.vod_id.match(/https?:\\/\\/[^\\/]+/)[0];
                
                // 2. 用 split 切割出 path 变量的值，避开正则匹配带来的不确定性
                var pathStr = html.split('const path = "')[1].split('"')[0];
                
                // 3. 彻底清洗转义符：将 \\/ 变回 / ，将 \\u0026 变回 &
                pathStr = pathStr.split('\\\\/').join('/').split('\\\\u0026').join('&');
                
                // 4. 将动态域名和清洗后的路径组装成最终的秒播地址
                var playUrl = currentHost + '/h5/m3u8/' + pathStr;
                
                LISTS = [['正片$' + playUrl]];
            } catch(e) {
                // 如果网站源码大改导致上面提取失败，退回到内置嗅探模式兜底
                LISTS = [['嗅探播放$' + VOD.vod_id]];
            }
        `
    }
};
