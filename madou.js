var rule = {
    title: '麻豆官方',
    host: 'https://madou.com',
    url: '/topic/0/fyclass/0/fypage/',
    searchUrl: '/searchvideo/**/fypage/',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://madou.com/'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,
    // 一级：解析 dataJson 并处理 Unicode 编码
    一级: "js: var items = []; var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u/g, '%u'); var jsonText = unescape(raw); var data = JSON.parse(jsonText).data; var list = data.videoInfos; if (list) { list.forEach(function(it) { if (it.id > 0) { items.push({ title: it.title, img: it.coverImg, desc: it.creatorName || 'HD', url: '/archives/' + it.id + '/' }); } }); } } setResult(items);",
    // 二级：同样逻辑解析详情页数据
    二级: "js: var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u/g, '%u'); var jsonText = unescape(raw); var data = JSON.parse(jsonText).data; var vInfo = data.videoInfos ? data.videoInfos[0] : data.videoInfo; var m3u8 = vInfo.video.url; if (m3u8.indexOf('http') === -1) { m3u8 = 'https://madou.com/' + m3u8; } VOD = { vod_name: vInfo.title, vod_pic: vInfo.coverImg, vod_content: vInfo.desc || '', vod_play_from: '麻豆官方', vod_play_url: '播放$' + m3u8 }; }",
    lazy: "js: input = { jx: 0, url: input.split('$')[1], parse: 0 };"
};
