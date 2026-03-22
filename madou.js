var rule = {
    title: '麻豆官方-汉字穿透版',
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

    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); if(m){ try { var raw = JSON.parse('\"' + m[1] + '\"'); var res = JSON.parse(raw); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    二级: "js: var html=request(input); var VOD={vod_name:'视频播放', vod_remarks:'高速直连'}; try { \
        /* 1. 提取标题 (直接找title标签里的汉字) */ \
        var m_title = html.match(/<title>(.*?)<\\/title>/); \
        VOD.vod_name = m_title ? m_title[1].split('｜')[0].trim() : '视频播放'; \
        \
        /* 2. 【核心】直接匹配长段汉字简介 (匹配包含“麻豆”或“剧情”且长度超过50个字符的段落) */ \
        /* 这种方法不依赖 class，只要源码里有这段话就能抓到 */ \
        var m_desc = html.match(/content=\"([^\"]{50,})\"/); \
        if(!m_desc) m_desc = html.match(/>([^<]{50,})</); \
        VOD.vod_content = m_desc ? m_desc[1].replace(/\\\\u/g, '%u') : '暂无详细介绍'; \
        /* 解码可能存在的Unicode */ \
        if(VOD.vod_content.indexOf('%u')!==-1) VOD.vod_content = unescape(VOD.vod_content); \
        \
        /* 3. 提取播放地址 (锁定 const path) */ \
        var m_path = html.match(/const\\s+path\\s*=\\s*[\"'](.*?)[\"']/); \
        if(m_path){ \
            var p = m_path[1].replace(/\\\\u0026/g, '&').replace(/\\\\/g, '').replace(/^\\//, ''); \
            VOD.vod_play_from = 'Cloudfront高速线'; \
            VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + p; \
        } \
        \
        /* 4. 提取图片 (从 dataJson 补全) */ \
        var m_json = html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); \
        if(m_json){ \
            var res = JSON.parse(JSON.parse('\"' + m_json[1] + '\"')); \
            var info = res.data.video || res.data.videoInfo || (res.data.videoInfos?res.data.videoInfos[0]:res.data); \
            VOD.vod_pic = info.coverImg || ''; \
            if(VOD.vod_content.length < 10) VOD.vod_content = info.desc || info.intro || VOD.vod_content; \
        } \
    } catch(e){ VOD.vod_content = '解析异常:' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
