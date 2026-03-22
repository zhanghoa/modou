var rule = {
    title: '麻豆官方-修复版',
    host: 'https://madou.com',
    url: '/topic/0/fyclass/fypage/',
    searchUrl: '/searchvideo/**/fypage/',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=1'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    一级: "js: var items = []; var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/'); try { var data = JSON.parse(raw).data; var list = data.videoInfos || data.videoInfosList || []; list.forEach(function(it) { if (it.id > 0) { items.push({ title: it.title, img: it.coverImg, desc: it.creatorName || '麻豆', url: '/archives/' + it.id + '/' }); } }); } catch(e) {} } setResult(items);",
    
    二级: "js: var html = request(input); var VOD = { vod_name: '未知视频', vod_remarks: '多线路' }; \
        /* 1. 解析播放路径 */ \
        var m_path = html.match(/const path = \"(.*?)\";/); \
        if (m_path) { \
            var playUrl = m_path[1].replace(/\\\\u0026/g, '&'); \
            VOD.vod_play_from = '官方线路A$$$优化线路B'; \
            var urlA = 'https://madou.com/h5/m3u8/' + playUrl; \
            var urlB = 'https://lmdi048.com/h5/m3u8/' + playUrl; \
            VOD.vod_play_url = '播放$' + urlA + '$$$播放$' + urlB; \
        } \
        /* 2. 解析详情数据（图片、简介、标题） */ \
        var m_json = html.match(/var dataJson = '(.*?)';/); \
        if (m_json) { \
            try { \
                var raw = m_json[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/'); \
                var res = JSON.parse(raw); \
                var info = res.data.videoInfo || res.data; \
                VOD.vod_name = info.title || ''; \
                VOD.vod_pic = info.coverImg || ''; \
                VOD.vod_content = info.desc || info.intro || '暂无简介'; \
                VOD.vod_director = info.creatorName || '麻豆'; \
                VOD.type_name = info.categoryName || ''; \
            } catch(e) { \
                log('二级解析错误: ' + e.message); \
            } \
        } \
        setResult(VOD);",

    lazy: "js: input = { jx: 0, url: input.split('$')[1], parse: 0, header: JSON.stringify(rule.headers) };"
};
