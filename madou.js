var rule = {
    title: '麻豆官方-兼容修复版',
    // host 必须用这个，因为它是入口，CDN域名通常不给直接爬列表
    host: 'https://lmdi048.com', 
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true; is_mobile=0'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(!m){m=html.match(/dataJson\\s*=\\s*\"(.*?)\"/)}; if(m){ var raw=m[1].replace(/\\\\u0022/g,'\"').replace(/\\\\u002f/g,'/').replace(/\\\\u0026/g,'&'); try { var res=JSON.parse(raw); var list=res.data.videoInfos||res.data.videoInfosList||[]; list.forEach(function(it){ if(it.id>0){ var img = it.coverImg; if(img.indexOf('http')===-1) img = 'https://d2r1iw2cxonh4q.cloudfront.net/' + img.replace(/^\\//, ''); items.push({title:it.title, img:img, desc:it.creatorName||'麻豆', url:'/archives/'+it.id+'/'}); } }); } catch(e){} } if(items.length===0){ items.push({title:'⚠️ 请检查VPN或清理缓存', img:'', desc:'无数据返回', url:input}); } setResult(items);",
    
    二级: "js: var html=request(input); var VOD={vod_name:'视频详情',vod_remarks:'高速CDN'}; try { var m_json=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(!m_json){m_json=html.match(/dataJson\\s*=\\s*\"(.*?)\"/)}; if(m_json){ var raw=m_json[1].replace(/\\\\u0022/g,'\"').replace(/\\\\u002f/g,'/').replace(/\\\\u0026/g,'&'); var res=JSON.parse(raw); var info=res.data.videoInfo||(res.data.videoInfos?res.data.videoInfos[0]:res.data); VOD.vod_name=info.title; var pic = info.coverImg; if(pic.indexOf('http')===-1) pic = 'https://d2r1iw2cxonh4q.cloudfront.net/' + pic.replace(/^\\//, ''); VOD.vod_pic=pic; VOD.vod_content=info.desc||'暂无简介'; var playPath=''; if(info.video&&info.video.url){ playPath=info.video.url; } else { var m_path=html.match(/path\\s*=\\s*\"(.*?)\"/); if(m_path) playPath=m_path[1].replace(/\\\\u0026/g,'&'); } if(playPath){ var finalUrl = 'https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/'+playPath.replace(/^\\//, ''); VOD.vod_play_from='高速CDN线'; VOD.vod_play_url='播放$'+finalUrl; } } } catch(e){ VOD.vod_content='二级报错:'+e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header:JSON.stringify(rule.headers)};"
};
