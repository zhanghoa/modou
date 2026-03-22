var rule = {
    title: '麻豆官方-全修复版',
    host: 'https://madou.com',
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

    // 一级列表：确保海报墙能刷出来
    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(m){ try { var raw = JSON.parse('\"' + m[1] + '\"'); var res = JSON.parse(raw); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName || '麻豆', url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    // 二级详情：修复图片、简介、多线路播放
    二级: "js: var html=request(input); var VOD={}; try { var m_json=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(m_json){ var raw=JSON.parse('\"' + m_json[1] + '\"'); var res=JSON.parse(raw); var info=res.data.video || res.data.videoInfo || res.data; VOD.vod_name = info.title || '视频播放'; VOD.vod_pic = info.coverImg || ''; VOD.vod_content = info.desc || info.intro || '暂无详细介绍'; VOD.vod_remarks = info.creatorName || '高速资源'; /* 提取播放核心 path */ var playPath = ''; var m_path = html.match(/const path = \"(.*?)\";/); if(m_path){ playPath = m_path[1].replace(/\\\\u0026/g, '&'); } else if(info.video && info.video.url){ playPath = info.video.url; } if(playPath){ VOD.vod_play_from = '高速CDN节点$$$备用官方线'; var finalUrl = 'https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + playPath.replace(/^\\//, ''); VOD.vod_play_url = '播放$' + finalUrl + '$$$播放$' + finalUrl; } } } catch(e){ VOD.vod_content = '详情解析失败:' + e.message; } setResult(VOD);",
    
    // 强制给播放器注入Referer，防止“正在加载中”
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
