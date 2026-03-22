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
    
    二级: "js: var html = request(input); var VOD = {vod_name: '解析中', vod_content: '等待数据...'}; try { \
        /* 1. 先把整个 dataJson 字符串抠出来 */ \
        var m = html.match(/dataJson\\s*=\\s*'(.*?)'/); \
        if (m) { \
            var raw = m[1]; \
            \
            /* 2. 暴力提取汉字简介 (匹配 \\u0022desc\\u0022 之后的内容) */ \
            var descMatch = raw.match(/\\\\u0022desc\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
            if (descMatch) { \
                var content = descMatch[1].replace(/\\\\u([0-9a-fA-F]{4})/g, function(match, grp) { \
                    return String.fromCharCode(parseInt(grp, 16)); \
                }); \
                VOD.vod_content = content; \
            } \
            \
            /* 3. 暴力提取播放地址 (匹配 \\u0022url\\u0022 之后的内容) */ \
            /* 注意：我们要找的是那个长长的 .m3u8 链接 */ \
            var urlMatch = raw.match(/\\\\u0022url\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
            if (urlMatch) { \
                var path = urlMatch[1].replace(/\\\\\\\\/g, '').replace(/\\\\u0026/g, '&'); \
                VOD.vod_play_from = 'Cloudfront高速线'; \
                VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + path.replace(/^\\//, ''); \
            } \
            \
            /* 4. 提取标题 */ \
            var titleMatch = raw.match(/\\\\u0022title\\\\u0022:\\\\u0022(.*?)\\\\u0022/); \
            if (titleMatch) { \
                VOD.vod_name = titleMatch[1].replace(/\\\\u([0-9a-fA-F]{4})/g, function(match, grp) { \
                    return String.fromCharCode(parseInt(grp, 16)); \
                }); \
            } \
        } else { \
            VOD.vod_content = '错误：未能匹配到 dataJson，源码长度：' + html.length + '。预览：' + html.substring(0, 100); \
        } \
    } catch(e) { VOD.vod_content = '致命解析错误: ' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
