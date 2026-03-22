var rule = {
    title: '麻豆官方-修复详情版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net/',
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

    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(m){ var raw=m[1].replace(/\\\\u0022/g,'\"').replace(/\\\\u002f/g,'/').replace(/\\\\u0026/g,'&'); try { var data=JSON.parse(raw).data; var list=data.videoInfos||data.videoInfosList||[]; list.forEach(function(it){ if(it.id>0){ items.push({title:it.title, img:it.coverImg, desc:it.creatorName, url:'/archives/'+it.id+'/'}); } }); } catch(e){} } setResult(items);",
    
    二级: "js: var html=request(input); var VOD={vod_name:'视频详情',vod_remarks:'高速CDN'}; try { var m_json=html.match(/dataJson\\s*=\\s*'(.*?)'/); if(m_json){ var raw=m_json[1].replace(/\\\\u0022/g,'\"').replace(/\\\\u002f/g,'/').replace(/\\\\u0026/g,'&'); var res=JSON.parse(raw); var info=res.data.videoInfo || (res.data.videoInfos?res.data.videoInfos[0]:res.data); VOD.vod_name=info.title; VOD.vod_pic=info.coverImg; VOD.vod_content=info.desc||info.intro||'暂无简介'; VOD.vod_remarks=info.creatorName||'麻豆官方'; var playPath=''; if(info.video && info.video.url){ playPath=info.video.url; } else { var m_path=html.match(/path\\s*=\\s*\"(.*?)\"/); if(m_path) playPath=m_path[1].replace(/\\\\u0026/g,'&'); } if(playPath){ VOD.vod_play_from='高速节点1$$$备用节点2'; var finalUrl='https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/'+playPath.replace(/^\\//,''); VOD.vod_play_url='立即播放$'+finalUrl+'$$$立即播放$'+finalUrl; } } } catch(e){ VOD.vod_content='解析错误:'+e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent':rule.headers['User-Agent'], 'Referer': 'https://madou.com/'}) };"
};
