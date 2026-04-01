var rule = {
    title: '麻豆CloudFront',
    host: 'https://gnrre.com/', // 初始跳板入口
    
    // 【核心一】预处理：自动拦截 301 跳转，记录最新域名，并动态更新防盗链 Referer
    预处理: `js:
        try {
            rule.realHost = rule.host; // 先设置一个默认值防错
            let res = req(rule.host, { headers: rule.headers, redirect: 0 });
            let targetUrl = (res.headers && res.headers.Location) ? res.headers.Location : res.url;
            
            if (targetUrl) {
                let match = targetUrl.match(/(https?:\\/\\/[^\\/]+)/);
                if (match) {
                    rule.realHost = match[1]; // 将最新域名记录到变量中
                    
                    // 动态更新全局请求头里的 Referer 为最新域名！(破解防盗链黑屏/403)
                    rule.headers['Referer'] = rule.realHost + '/';
                }
            }
        } catch(e) {}
    `,
    
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
        // 这里的 Referer 作为初始兜底，预处理执行完后会被上面的代码自动覆盖为最新的域名
        'Referer': 'https://d2r1iw2cxonh4q.cloudfront.net/'
    },
    
    // 开启解析，作为后备手段
    play_parse: true,
    lazy: '', 
    limit: 6,

    // 推荐（首页）、一级（列表）、搜索（保持你最初能正常加载出列表的版本）
    推荐: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',
    一级: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',
    搜索: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',

    // 【核心二】二级（详情页）：完全使用最初的原版代码，仅调用 rule.realHost 变量
    二级: {
        "title": "h1&&Text",
        "img": "", 
        "desc": ".related-gls__content h5&&Text; .vd-infos p:eq(0)&&Text; ; .vd-infos p:eq(1)&&Text; ", 
        "content": ".vd-infos__desc&&Text",
        "tabs": "js:TABS=['直链秒播']",
        // 调用预处理中存好的 rule.realHost 变量来拼接最终的 m3u8 地址
        "lists": "js:try{var path=html.match(/const path = [\"']([^\"']+)[\"']/)[1];path=path.split('\\\\u0026').join('&').split('\\\\/').join('/');LISTS=[['正片$'+rule.realHost+'/h5/m3u8/'+path]]}catch(e){LISTS=[['嗅探播放$'+VOD.vod_id]]}"
    }
};
