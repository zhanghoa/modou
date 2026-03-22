var rule = {
    title: '麻豆官方',
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
    
    一级: "js: var items = []; var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/'); try { var data = JSON.parse(raw).data; var list = data.videoInfos || data.videoInfosList; if (list) { list.forEach(function(it) { if (it.id > 0) { items.push({ title: it.title, img: it.coverImg, desc: it.creatorName || '麻豆', url: '/archives/' + it.id + '/' }); } }); } } catch(e) {} } setResult(items);",
    
    二级: "js: var html = request(input); var VOD = { vod_name: '视频详情' }; \
        var m_path = html.match(/const path = \"(.*?)\";/); \
        if (m_path) { \
            var playUrl = m_path[1].replace(/\\\\u0026/g, '&'); \
            VOD.vod_play_from = '麻豆官方'; \
            VOD.vod_play_url = '立即播放$https://madou.com/h5/m3u8/' + playUrl; \
        }",
    
    // 【核心修正】在播放阶段强制带上 Referer，绕过防盗链
    lazy: "js: input = { jx: 0, url: input.split('$')[1], parse: 0, header: JSON.stringify(rule.headers) };"
};
