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
        'Referer': 'https://madou.com/'
    },
    // 手动分类：确保菜单秒出。分类ID基于你提供的 topic 地址提取
    // 分类名称（显示在顶部的文字）
class_name: '精选好片&MSD系列&淫欲中国风&SM调教&情趣综艺&女优试镜&爱豆传媒&皇家华人&星空传媒&精东影业&天美传媒&蜜桃传媒&兔子先生&果冻传媒&91fans&91制片厂&辣椒原创&大象传媒&福利姬网黄&乱伦大神&探花大神&绿帽人妻&黑料泄密&原创投稿&双马尾萝莉&色控&禁忌乱伦&制服OL&巨乳女郎&FC2素人&无码中出&中文字幕&捷克搭讪&欧美网黄',

// 分类ID（对应URL里的编号）
class_url: '13678&13679&13682&13683&15091&13684&13687&13685&13686&13688&13931&13711&13690&13712&15811&15812&15813&15815&13713&13714&13715&15291&15153&14811&13717&13689&13719&13722&13724&13720&13725&13726&13728&13730',
    
    play_parse: true,
    // 一级列表：解析 dataJson。使用了更强力的正则和字符替换
    一级: "js: var items = []; var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/'); try { var data = JSON.parse(raw).data; var list = data.videoInfos || data.videoInfosList; if (list) { list.forEach(function(it) { if (it.id > 0) { items.push({ title: it.title, img: it.coverImg, desc: it.creatorName || '麻豆', url: '/archives/' + it.id + '/' }); } }); } } catch(e) { items.push({title: '解析异常', img: '', desc: e.message, url: input}); } } setResult(items);",
    
    // 二级详情：提取播放地址
    二级: "js: var html = request(input); var m = html.match(/var dataJson = '(.*?)';/); if (m) { var raw = m[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u002f/g, '/'); var data = JSON.parse(raw).data; var vInfo = data.videoInfos ? data.videoInfos[0] : data.videoInfo; var m3u8 = vInfo.video.url; if (m3u8.indexOf('http') === -1) { m3u8 = 'https://madou.com/' + m3u8; } VOD = { vod_name: vInfo.title, vod_pic: vInfo.coverImg, vod_content: vInfo.desc || '', vod_play_from: '麻豆官方', vod_play_url: '立即播放$' + m3u8 }; }",
    
    lazy: "js: input = { jx: 0, url: input.split('$')[1], parse: 0 };"
};
