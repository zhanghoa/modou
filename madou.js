// 定义一个通用的纯 JS 列表解析规则，用于强制修正 URL 域名
var listRule = `js:
    let d = [];
    let html = request(input);
    let list = pdfa(html, '.section-content__item:has(a[data-type="0"])');
    list.forEach(it => {
        let url = pdfh(it, 'a&&href');
        
        // 【核心防御：修正二级地址拼接】
        // 1. 如果抓到的链接里包含老域名，强制替换为最新的 rule.host
        if (url.includes('gnrre.com')) {
            url = url.replace(/https?:\\/\\/[^\\/]+/, rule.host);
        } 
        // 2. 如果抓到的是相对路径 (不以 http 开头)，强制用最新的 rule.host 拼接绝对路径
        else if (!url.startsWith('http')) {
            url = rule.host + (url.startsWith('/') ? '' : '/') + url;
        }

        d.push({
            vod_name: pdfh(it, 'h3&&Text'),
            vod_pic: pdfh(it, '.item-cover img&&data-src'),
            vod_remarks: pdfh(it, '.cover-duration&&Text'),
            vod_id: url // 传给二级页面的最终安全链接
        });
    });
    setResult(d);
`;

var rule = {
    title: '麻豆CloudFront',
    host: 'https://gnrre.com/', // 初始跳板入口
    
    // 预处理：自动拦截 301 跳转，动态更新最新域名
    预处理: `js:
        try {
            let res = req(rule.host, { headers: rule.headers, redirect: 0 });
            let realHost = '';
            if (res.headers && res.headers.Location) {
                realHost = res.headers.Location;
            } else if (res.url && res.url !== rule.host) {
                realHost = res.url;
            }
            if (realHost) {
                let match = realHost.match(/(https?:\\/\\/[^\\/]+)/);
                if (match) {
                    rule.host = match[1]; 
                }
            }
        } catch(e) {}
    `,
    
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

    // 直接调用上面写好的 JS 逻辑
    推荐: listRule,
    一级: listRule,
    搜索: listRule,

    二级: {
        "title": "h1&&Text",
        "img": "", 
        "desc": ".related-gls__content h5&&Text; .vd-infos p:eq(0)&&Text; ; .vd-infos p:eq(1)&&Text; ", 
        "content": ".vd-infos__desc&&Text",
        "tabs": "js:TABS=['直链秒播']",
        // 播放地址依然使用你原版跑通的逻辑，外加动态域名拼接
        "lists": "js:try{var path=html.match(/const path = [\"']([^\"']+)[\"']/)[1];path=path.split('\\\\u0026').join('&').split('\\\\/').join('/');path=path.startsWith('/')?path.substring(1):path;LISTS=[['正片$'+rule.host+'/h5/m3u8/'+path]]}catch(e){LISTS=[['嗅探播放$'+VOD.vod_id]]}"
    }
};
