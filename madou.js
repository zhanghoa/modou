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
    // 【核心改动】全动态分类解析
    class_parse: "js: var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u/g, '%u'); var data = JSON.parse(unescape(raw)).data; var clist = data.translations.categoryList; var classes = []; clist.forEach(function(c) { if (c.translationList.length > 0) { c.translationList.forEach(function(sub) { var cid = sub.urlValue.match(/\\/(\\d+)\\//); if (cid) { classes.push({type_name: sub.name, type_id: cid[1]}); } }); } }); input = classes; }",
    
    一级: "js: var items = []; var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u/g, '%u'); var jsonText = unescape(raw); var data = JSON.parse(jsonText).data; var list = data.videoInfos; if (list) { list.forEach(function(it) { if (it.id > 0) { items.push({ title: it.title, img: it.coverImg, desc: it.creatorName || 'HD', url: '/archives/' + it.id + '/' }); } }); } } setResult(items);",
    
    二级: "js: var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u/g, '%u'); var jsonText = unescape(raw); var data = JSON.parse(jsonText).data; var vInfo = data.videoInfos ? data.videoInfos[0] : data.videoInfo; var m3u8 = vInfo.video.url; if (m3u8.indexOf('http') === -1) { m3u8 = 'https://madou.com/' + m3u8; } VOD = { vod_name: vInfo.title, vod_pic: vInfo.coverImg, vod_content: vInfo.desc || '', vod_play_from: '麻豆官方', vod_play_url: '播放$' + m3u8 }; }",
    
    lazy: "js: input = { jx: 0, url: input.split('$')[1], parse: 0 };"
};
