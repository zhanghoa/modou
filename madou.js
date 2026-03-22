var rule = {
    title: '麻豆官方-强力直采版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; TV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=0'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); if(m){ try { var raw = m[1].replace(/\\\\u0022/g, '\"'); var res = JSON.parse(raw); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    二级: "js: var html = ''; \
    try { \
        /* 使用更复杂的 headers 模拟真实 Chrome 浏览器 */ \
        var config = { \
            headers: { \
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', \
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,hummingbird;q=0.8', \
                'Accept-Language': 'zh-CN,zh;q=0.9', \
                'Referer': 'https://madou.com/', \
                'Cookie': 'isAgeModalShownKey=true; is_mobile=0' \
            }, \
            timeout: 5000 \
        }; \
        html = request(input, config); \
        \
        var VOD = {}; \
        if (html && html.length > 500) { \
            var m = html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); \
            if (m) { \
                /* 暴力解码 Unicode 并抠出数据 */ \
                var raw = m[1]; \
                var descM = raw.match(/\\\\u0022desc\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
                VOD.vod_content = descM ? descM[1].replace(/\\\\u([0-9a-fA-F]{4})/g, function(match, grp) { \
                    return String.fromCharCode(parseInt(grp, 16)); \
                }) : '无法解析简介'; \
                \
                var urlM = raw.match(/\\\\u0022url\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
                if (urlM) { \
                    var p = urlM[1].replace(/\\\\\\\\/g, '').replace(/\\\\u0026/g, '&'); \
                    VOD.vod_play_from = '直连线路'; \
                    VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + p.replace(/^\\//, ''); \
                } \
                VOD.vod_name = '解析成功'; \
            } else { \
                VOD.vod_content = '❌ 源码内未找到 dataJson。源码开头：' + html.substring(0, 100); \
            } \
        } else { \
            VOD.vod_content = '❌ 网页请求返回空或被拦截。长度：' + (html?html.length:0); \
        } \
    } catch(e) { \
        VOD.vod_content = '❌ 请求过程发生崩溃: ' + e.message; \
    } \
    setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
