var rule = {
    title: '麻豆CloudFront',
    host: 'https://gnrre.com/', // 初始跳板入口
    
    // 预处理：自动拦截 301 跳转，动态更新最新域名
    预处理: `js:
        try {
            let res = req(rule.host, { 
                headers: rule.headers,
                redirect: 0 
            });
            
            let realHost = '';
            if (res.headers && res.headers.Location) {
                realHost = res.headers.Location;
            } else if (res.url && res.url !== rule.host) {
                realHost = res.url;
            }

            if (realHost) {
                let match = realHost.match(/(https?:\\/\\/[^\\/]+)/);
                if (match) {
                    rule.host = match[1]; // 全局替换为主站最新域名
                }
            }
        } catch(e) {
            // 静默容错
        }
    `,
    
    // 分类链接
    url: '/topic/17521/fyclass/fypage/', 
    
    class_name: '精选好片&麻豆出品&女优试镜&爱豆传媒&星空传媒&精东影业&天美传媒&果冻传媒&91制片厂&大象传媒&福利姬&探花大神&黑料吃瓜&日本禁忌&制服OL&无码中出&中文字幕&欧美经典',
    class_url: '13678&13679&13684&13687&13686&13688&13931&13712&15812&15815&13713&13715&15153&13719&13722&13725&13726&13731', 

    searchUrl: '/searchvideo/**', 
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Referer': 'https://d2r1iw2cxonh4q.cloudfront.net/'
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
        // 【已退回原版提取逻辑】完全使用你原来的正则和单行写法，仅将原网址替换为动态的 '+rule.host+'
        "lists": "js:try{var path=html.match(/const path = [\"']([^\"']+)[\"']/)[1];path=path.split('\\\\u0026').join('&').split('\\\\/').join('/');path=path.startsWith('/')?path.substring(1):path;LISTS=[['正片$'+rule.host+'/h5/m3u8/'+path]]}catch(e){LISTS=[['嗅探播放$'+VOD.vod_id]]}"
    }
};
