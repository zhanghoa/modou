/*
 * 测试获取的域名是否以/结尾
 */

var rule = {
    title: '域名结尾测试',
    host: 'https://gnrre.com/', // 初始跳板入口
    
    预处理: `js:
        try {
            rule.realHost = rule.host; // 设置默认值
            let res = req(rule.host, { headers: rule.headers, redirect: 0 });
            let targetUrl = (res.headers && res.headers.Location) ? res.headers.Location : res.url;
            
            if (targetUrl) {
                let match = targetUrl.match(/(https?:\\/\\/[^\\/]+)/);
                if (match) {
                    rule.realHost = match[1]; // 保存跳转后的实际域名
                    rule.headers['Referer'] = rule.realHost + '/';
                }
            }
            
            // 测试域名是否以/结尾
            console.log('原始解析的域名:', rule.realHost);
            console.log('域名是否以/结尾:', rule.realHost.endsWith('/'));
            console.log('域名长度:', rule.realHost.length);
            
            // 如果以/结尾，则移除
            if(rule.realHost.endsWith('/')) {
                rule.realHost = rule.realHost.slice(0, -1);
                console.log('修正后域名:', rule.realHost);
            }
            
        } catch(e) {
            console.log('域名跳转失败:', e);
            rule.realHost = rule.host;
            if(rule.realHost.endsWith('/')) {
                rule.realHost = rule.realHost.slice(0, -1);
            }
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
            console.log('=== 域名测试信息 ===');
            console.log('实际域名:', rule.realHost);
            console.log('域名是否以/结尾:', rule.realHost.endsWith('/'));
            
            // 简单的播放列表测试
            LISTS = [['域名测试$' + rule.realHost]];
        `
    }
};
