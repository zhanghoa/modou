var rule = {
    title: 'CloudFront-界面调试版',
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
            // 在变量中保存调试信息，供后续使用
            rule.debugInfo = '检测到的域名: ' + rule.realHost;
        } catch(e) {
            rule.debugInfo = '域名检测失败: ' + e.message;
        }
    `,
    
    // 分类链接
    url: '/topic/17521/fyclass/fypage/', 
    
    // 分类名与分类ID
    class_name: '调试',
    class_url: 'debug', 

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
    play_parse: false, // 关闭解析以直接使用直链
    lazy: '', 
    limit: 6,

    // 推荐（首页）、一级（列表）、搜索（保持你最初能正常加载出列表的版本）
    推荐: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',
    一级: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',
    搜索: '.section-content__item:has(a[data-type="0"]); h3&&Text; .item-cover img&&data-src; .cover-duration&&Text; a&&href',

    // 【核心二】二级（详情页）：界面调试版本
    二级: {
        "title": "js:VOD.title || '调试标题'",
        "img": "",
        "desc": "js:'域名: ' + rule.realHost + '\\n\\n' + rule.debugInfo",
        "content": "js:'页面长度: ' + html.length + ' 字符'",
        "tabs": "js:TABS=['播放地址']",
        "lists": `js:
            // 显示调试信息
            console.log('开始解析二级页面...');
            
            try {
                // 查找path变量
                var pathMatch = html.match(/const path = ["']([^"']+)["']/);
                if(pathMatch) {
                    var path = pathMatch[1];
                    path = path.split('\\\\u0026').join('&').split('\\\\/').join('/');
                    
                    // 构造播放地址
                    var playUrl = rule.realHost + '/h5/m3u8/' + path;
                    
                    // 更新内容显示更多信息
                    VOD.content = '页面长度: ' + html.length + ' 字符\\n\\n' +
                                  '域名: ' + rule.realHost + '\\n\\n' +
                                  '提取的Path: ' + path + '\\n\\n' +
                                  '播放地址: ' + playUrl;
                    
                    // 创建播放列表，将地址显示在标签中
                    var displayUrl = playUrl.length > 40 ? playUrl.substring(0, 40) + '...' : playUrl;
                    LISTS = [['地址: ' + displayUrl + '$' + playUrl]];
                } else {
                    // 如果没找到path，显示页面中可能的链接
                    var debugLists = [];
                    var m3u8Matches = html.match(/https?:\\/\\/[^"'\\s]*\\.m3u8[^"'\\s]*/g);
                    if(m3u8Matches) {
                        for(var i = 0; i < m3u8Matches.length; i++) {
                            var url = m3u8Matches[i];
                            var dispUrl = url.length > 40 ? url.substring(0, 40) + '...' : url;
                            debugLists.push(['M3U8-' + (i+1) + ': ' + dispUrl + '$' + url]);
                        }
                    } else {
                        // 如果连m3u8都没找到，至少显示一些调试信息
                        debugLists.push(['解析失败-无地址$' + VOD.vod_id]);
                    }
                    
                    // 更新内容显示调试信息
                    VOD.content = '页面长度: ' + html.length + ' 字符\\n\\n' +
                                  '域名: ' + rule.realHost + '\\n\\n' +
                                  '未找到path变量，正在搜索其他可能的链接...';
                    
                    LISTS = debugLists;
                }
            } catch(e) {
                // 发生错误时，显示错误信息
                VOD.content = '解析错误: ' + e.message + '\\n\\n' +
                              '页面长度: ' + html.length + ' 字符\\n\\n' +
                              '域名: ' + rule.realHost;
                LISTS = [['错误: ' + e.message + '$' + VOD.vod_id]];
            }
        `
    }
};
