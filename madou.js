// 初始化动态 Host
var dynamicHost = 'https://gnrre.com/';
try {
    // 访问当前域名，获取重定向后的最终 URL
    var response = request(dynamicHost, { withHeader: true, redirect: true });
    // split('?')[0] 是为了去掉可能存在的追踪参数，保证 host 干净
    var finalUrl = response.url.split('?')[0];
    if (finalUrl) {
        dynamicHost = finalUrl.replace(/\/$/, ""); // 去掉末尾的斜杠
    }
} catch (e) {
    // 如果请求失败，则保留原始 dynamicHost 
}

var rule = {
    title: '麻豆CloudFront(自动跳转版)',
    host: dynamicHost,
    
    // 分类链接
    url: '/topic/17521/fyclass/fypage/', 
    
    // 从导航栏提取的分类名与分类ID
    class_name: '精选好片&麻豆出品&女优试镜&爱豆传媒&星空传媒&精东影业&天美传媒&果冻传媒&91制片厂&大象传媒&福利姬&探花大神&黑料吃瓜&日本禁忌&制服OL&无码中出&中文字幕&欧美经典',
    class_url: '13678&13679&13684&13687&13686&13688&13931&13712&15812&15815&13713&13715&15153&13719&13722&13725&13726&13731', 

    // 搜索接口
    searchUrl: '/searchvideo/**', 
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Referer': dynamicHost + '/' // 动态同步 Referer
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
        // 这里的拼接也使用了 dynamicHost 确保地址对齐
        "lists": "js:try{var path=html.match(/const path = [\"']([^\"']+)[\"']/)[1];path=path.split('\\\\u0026').join('&').split('\\\\/').join('/');LISTS=[['正片$'+ dynamicHost + '/h5/m3u8/'+path]]}catch(e){LISTS=[['嗅探播放$'+VOD.vod_id]]}"
    }
};
