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
        'Cookie': 'isAgeModalShownKey=true'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,
    
    // 一级：参考你的代码，但加入了对 Unicode 的深度解码
    一级: "js: var items = []; var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/'); try { var data = JSON.parse(raw).data; var list = data.videoInfos || data.videoInfosList || []; list.forEach(function(it) { if (it.id > 0) { items.push({ title: it.title, img: it.coverImg, desc: it.creatorName || '麻豆', url: '/archives/' + it.id + '/' }); } }); } catch(e) {} } setResult(items);",
    
    // 二级：核心修复。使用 JSON 解析 + 强制指向高速 CDN 域名
    二级: "js: var html = request(input); var VOD = { vod_name: '视频详情' }; var m_json = html.match(/var dataJson = '(.*?)';/); if (m_json) { try { /* 1. 清洗数据并解析JSON */ var raw = m_json[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/').replace(/\\\\u0026/g, '&'); var res = JSON.parse(raw); var info = res.data.videoInfo || (res.data.videoInfos ? res.data.videoInfos[0] : res.data); if (info) { VOD.vod_name = info.title; VOD.vod_pic = info.coverImg; VOD.vod_content = info.desc || info.intro || '暂无简介'; VOD.vod_remarks = info.creatorName || '官方源'; /* 2. 获取并拼接播放地址：强制使用高速CDN域名 */ var purl = ''; if (info.video && info.video.url) { purl = info.video.url; } else { var m_path = html.match(/const path = \"(.*?)\";/); if (m_path) purl = m_path[1].replace(/\\\\u0026/g, '&'); } if (purl) { VOD.vod_play_from = '高速CDN线'; VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + purl.replace(/^\\//, ''); } } } catch(e) { VOD.vod_content = '解析异常:' + e.message; } } setResult(VOD);",
    
    lazy: "js: input = { jx: 0, url: input.split('$')[1], parse: 0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
