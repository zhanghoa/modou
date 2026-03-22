var rule = {
    title: '麻豆官方-暴力修复版',
    host: 'https://madou.com',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(!m){m=html.match(/dataJson\\s*=\\s*\"(.*?)\"/)}; if(m){ try { var jsonStr = m[1]; /* 这里的逻辑是直接将Unicode转义字符转为正常字符 */ var raw = JSON.parse('\"' + jsonStr + '\"'); var res = JSON.parse(raw); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){ items.push({title: '解析出错', desc: e.message}); } } else { items.push({title: '未匹配到变量', desc: '请检查VPN'}); } setResult(items);",
    
    二级: "js: var html=request(input); var VOD={}; try { var m_json=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(!m_json){m_json=html.match(/dataJson\\s*=\\s*\"(.*?)\"/)}; if(m_json){ var jsonStr = m_json[1]; var raw = JSON.parse('\"' + jsonStr + '\"'); var res = JSON.parse(raw); var info = res.data.videoInfo || (res.data.videoInfos ? res.data.videoInfos[0] : res.data); VOD.vod_name = info.title; VOD.vod_pic = info.coverImg; VOD.vod_content = info.desc || '暂无简介'; var playPath = ''; if(info.video && info.video.url){ playPath = info.video.url; } else { var m_path = html.match(/path\\s*=\\s*\"(.*?)\"/); if(m_path) playPath = m_path[1]; } if(playPath){ playPath = playPath.replace(/\\\\u0026/g, '&'); VOD.vod_play_from = '高速CDN线'; VOD.vod_play_url = '播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + playPath.replace(/^\\//, ''); } } } catch(e){ VOD.vod_content = '二级报错'; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
