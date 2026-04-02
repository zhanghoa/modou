var rule = {
    title: '麻豆CloudFront-播放地址显示版',
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
            console.log('检测到的最新域名:', rule.realHost);
        } catch(e) {
            console.log('预处理错误:', e);
            // 如果预处理失败，使用原始host
            rule.realHost = rule.host;
        }
    `,
    
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
        'Referer': 'https://d2r1iw2cxonh4q.cloudfront.net/'
    },
    
    // 开启解析，作为后备手段
    play_parse: true,
    lazy: '', 
    limit: 6,

    // 推荐（首页）规则
    推荐: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',

    // 一级（分类列表页）规则
    一级: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',

    // 搜索结果页规则
    搜索: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',

    // 二级（详情页）规则：使用原始可用配置，确保视频介绍正常显示
    二级: {
        "title": "h1&&Text",
        "img": "", // 留空，TVBox会自动继承一级列表的封面图
        // desc 格式依次为：演员; 年代(发行日期); 地区; 状态(番号); 导演
        "desc": ".related-gls__content h5&&Text; .vd-infos p:eq(0)&&Text; ; .vd-infos p:eq(1)&&Text; ", 
        "content": ".vd-infos__desc&&Text",
        "tabs": "js:TABS=['播放地址']",
        // 核心魔法：使用 JS 正则直接从网页代码中抠出 const path = "..." 里的 m3u8 地址，清洗转义符后拼接成真实播放直链，并显示地址
        "lists": `js:
            try {
                var path = html.match(/const path = ["']([^"']+)["']/)[1];
                path = path.split('\\\\u0026').join('&').split('\\\\/').join('/');
                
                // 构造播放地址，使用动态获取的真实域名
                var playUrl = rule.realHost + '/h5/m3u8/' + path;
                
                // 在控制台显示播放地址
                console.log('提取的播放地址:', playUrl);
                
                // 在播放列表中显示地址信息
                var shortAddr = playUrl.length > 40 ? playUrl.substring(0, 40) + '...' : playUrl;
                LISTS = [['地址: ' + shortAddr + '$' + playUrl]];
            } catch(e) {
                console.log('解析播放地址失败:', e);
                // 即使解析失败，也要确保播放列表存在
                LISTS = [['嗅探播放$' + VOD.vod_id]];
            }
        `
    }
};
