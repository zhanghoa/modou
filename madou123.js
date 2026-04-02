var rule = {
    title: '域名结尾测试',
    host: 'https://gnrre.com/', 
    
    预处理: `js:
        try {
            rule.realHost = rule.host; 
            var res = req(rule.host, { headers: rule.headers, redirect: 0 });
            
            // 兼容大小写获取 Location
            var location = res.headers && (res.headers.Location || res.headers.location);
            var targetUrl = location ? location : res.url;
            
            if (targetUrl) {
                // 如果是绝对路径跳转才进行正则匹配获取域名
                if (targetUrl.startsWith('http')) {
                    var match = targetUrl.match(/(https?:\\/\\/[^\\/]+)/);
                    if (match) {
                        rule.realHost = match[1]; // 正则已经天然去掉了末尾的 /
                    }
                }
            }
            
            // 兜底：确保一定没有末尾的 /
            if(rule.realHost.endsWith('/')) {
                rule.realHost = rule.realHost.slice(0, -1);
            }
            
            // 【关键修复】同步给框架全局的 rule.host，确保后续请求和 url 拼接正确
            rule.host = rule.realHost;
            rule.headers['Referer'] = rule.host + '/';
            
            console.log('=== 预处理结果 ===');
            console.log('最终使用的合法域名:', rule.host);
            
        } catch(e) {
            console.log('域名处理异常:', e);
            // 异常兜底也要去斜杠
            if(rule.host.endsWith('/')) {
                rule.host = rule.host.slice(0, -1);
            }
            rule.realHost = rule.host;
        }
    `,
    
    url: '/topic/17521/fyclass/fypage/', 
    class_name: '测试',
    class_url: 'test', 

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
        "desc": "js:'域名测试结果:\\n原始域名: ' + (VOD.vod_id.match(/https?:\\/\\/[^\\/]+/) || ['未获取'])[0]",
        "content": "js:'实际使用的域名: ' + rule.realHost + '\\n\\n是否以/结尾: ' + String(rule.realHost.endsWith('/'))",
        "tabs": "js:TABS=['测试信息']",
        
        "lists": `js:
            console.log('=== 二级列表域名信息 ===');
            console.log('实际域名:', rule.realHost);
            LISTS = [['域名测试$' + rule.realHost]];
        `
    }
};
