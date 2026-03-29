var rule = {
    title: '麻豆-终极抗封锁版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    
    // 开启嗅探引擎支持
    play_parse: true,

    // 一级：列表页提取 (使用最稳妥的单层正则 + JSON.parse)
    一级: "js: var items=[]; try { var html=request(input); var m=html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); if(m){ var raw=m[1].replace(/\\\\u0022/g, '\"'); var res=JSON.parse(raw); var list=res.data.videoInfos||res.data.videoInfosList||[]; list.forEach(function(it){ if(it.id>0){ items.push({title:it.title, img:it.coverImg, desc:it.creatorName, url:'/archives/'+it.id+'/'}); } }); } } catch(e){} setResult(items);",

    // 二级：双轨策略。能抓到就抓，抓不到就抛给嗅探器。
    二级: "js: \
        var VOD = {vod_name: '加载中...', vod_content: '正在获取数据...'}; \
        try { \
            var html = request(input); \
            /* 如果被 CDN 拦截，网页内容会非常短或为空 */ \
            if (!html || html.length < 500) { \
                VOD.vod_content = '⚠️ 提示：详情页被 CDN 防火墙拦截，无法提取文字简介。但底层嗅探器可能已捕获视频流，请直接点击【嗅探播放】尝试观看！'; \
                VOD.vod_play_from = '网页嗅探'; \
                VOD.vod_play_url = '嗅探播放$' + input; \
            } else { \
                /* 如果没有被拦截，使用最原始暴力的正则直接抠字符串，避开所有的层级嵌套报错 */ \
                var m = html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); \
                if (m) { \
                    var raw = m[1]; \
                    /* 提取标题 */ \
                    var tMatch = raw.match(/\\\\u0022title\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
                    if(tMatch) VOD.vod_name = tMatch[1].replace(/\\\\u([0-9a-fA-F]{4})/g, function(a,b){return String.fromCharCode(parseInt(b,16));}); \
                    \
                    /* 提取汉字简介 */ \
                    var dMatch = raw.match(/\\\\u0022desc\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
                    if(dMatch) VOD.vod_content = dMatch[1].replace(/\\\\u([0-9a-fA-F]{4})/g, function(a,b){return String.fromCharCode(parseInt(b,16));}); \
                    \
                    /* 提取播放地址 */ \
                    var uMatch = raw.match(/\\\\u0022url\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
                    if(uMatch) { \
                        var p = uMatch[1].replace(/\\\\\\\\/g, '').replace(/\\\\u0026/g, '&').replace(/^\\//, ''); \
                        VOD.vod_play_from = '官方直连'; \
                        VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + p; \
                    } else { \
                        /* 没找到地址，退回嗅探模式 */ \
                        VOD.vod_play_from = '网页嗅探'; \
                        VOD.vod_play_url = '嗅探播放$' + input; \
                    } \
                } \
            } \
        } catch(e) { \
            VOD.vod_content = '解析错误:' + e.message; \
            VOD.vod_play_from = '网页嗅探'; \
            VOD.vod_play_url = '嗅探播放$' + input; \
        } \
        setResult(VOD);",

    // 播放兜底逻辑：如果是直连 m3u8 就直接播，如果是网页就交给内核嗅探 (parse: 1)
    lazy: "js: \
        if (input.indexOf('.m3u8') !== -1) { \
            input = { jx: 0, url: input, parse: 0 }; \
        } else { \
            /* 启用底层 WebView 嗅探，利用你日志里成功的那个逻辑 */ \
            input = { jx: 0, url: input, parse: 1, header: JSON.stringify({'User-Agent': 'Mozilla/5.0'}) }; \
        }"
};
