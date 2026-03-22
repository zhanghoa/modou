var rule = {
    title: '麻豆官方-高速直连版',
    // 使用高速域名作为基准
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=0'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    // 一级列表：解析视频墙
    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(m){ try { var raw = JSON.parse('\"' + m[1] + '\"'); var res = JSON.parse(raw); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    // 二级详情：根据你提供的源码，精准提取简介和播放地址
    二级: "js: var html=request(input); var VOD={vod_name:'视频播放', vod_remarks:'高速线路'}; try { \
        /* 1. 提取简介：优先从meta标签拿，最稳 */ \
        var m_desc = html.match(/meta name=\"description\" content=\"(.*?)\"/); \
        VOD.vod_content = m_desc ? m_desc[1] : '暂无介绍'; \
        \
        /* 2. 提取标题和图片 */ \
        var m_title = html.match(/<title>(.*?)<\\/title>/); \
        if(m_title) VOD.vod_name = m_title[1].split('｜')[0]; \
        \
        /* 3. 核心：提取播放地址 path */ \
        var m_path = html.match(/const path = \"(.*?)\";/); \
        if(m_path){ \
            var playPath = m_path[1].replace(/\\\\u0026/g, '&'); \
            VOD.vod_play_from = 'Cloudfront高速线'; \
            var finalUrl = 'https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + playPath.replace(/^\\//, ''); \
            VOD.vod_play_url = '立即播放$' + finalUrl; \
        } \
        \
        /* 4. 补全封面图（从dataJson解析） */ \
        var m_json = html.match(/dataJson\\s*=\\s*'(.*?)'/); \
        if(m_json){ \
            var raw = JSON.parse('\"' + m_json[1] + '\"'); \
            var res = JSON.parse(raw); \
            var info = res.data.video || res.data.videoInfo || res.data; \
            VOD.vod_pic = info.coverImg || ''; \
        } \
    } catch(e){ VOD.vod_content = '解析异常:' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
