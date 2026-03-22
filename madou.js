var rule = {
    title: '麻豆官方-源码采集版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    searchUrl: '/searchvideo/**/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=0'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    // 一级解析：从列表页 dataJson 提取视频列表
    一级: "js: var items=[]; var html=request(input); var m=html.match(/var dataJson\\s*=\\s*'(.*?)'/); if(m){ try { var res = JSON.parse(JSON.parse('\"' + m[1] + '\"')); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    // 二级解析：严格对应你提供的 50267 详情页 JSON 层级
    二级: "js: var html=request(input); var VOD={}; try { \
        var m = html.match(/var dataJson\\s*=\\s*'(.*?)'/); \
        if(m){ \
            /* 1. 双重解析：彻底还原 Unicode 转义符 */ \
            var res = JSON.parse(JSON.parse('\"' + m[1] + '\"')); \
            var data = res.data; \
            /* 2. 定位元数据层级 (data.video) */ \
            var meta = data.video || {}; \
            \
            /* 3. 提取简介、标题、图片 */ \
            VOD.vod_name = meta.title || '视频播放'; \
            VOD.vod_pic = meta.coverImg || ''; \
            VOD.vod_content = meta.desc || '暂无详细介绍'; \
            VOD.vod_remarks = meta.bango || '官方正版'; \
            \
            /* 4. 定位流媒体层级 (data.video.video.url) */ \
            /* 这是你源码里最隐秘的嵌套层 */ \
            var stream = meta.video || {}; \
            var path = stream.url || ''; \
            \
            if(path){ \
                /* 清洗地址：还原 & 符号，去掉首位斜杠 */ \
                var cleanPath = path.replace(/\\\\u0026/g, '&').replace(/^\\//, ''); \
                VOD.vod_play_from = 'Cloudfront高速'; \
                var finalUrl = 'https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + cleanPath; \
                VOD.vod_play_url = '立即播放$' + finalUrl; \
            } \
        } \
    } catch(e){ VOD.vod_content = '层级解析错误:' + e.message; } setResult(VOD);",
    
    // 播放请求劫持
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
