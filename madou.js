var rule = {
    title: '麻豆源码直采-终极版',
    host: 'https://d2r1iw2cxonh4q.cloudfront.net',
    url: '/topic/0/fyclass/fypage/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://madou.com/',
        'Cookie': 'isAgeModalShownKey=true'
    },
    class_name: '精选好片&MSD系列&淫欲中国&传媒片商&国产视频&日本AV&欧美中字',
    class_url: '13678&13679&13682&30521&30526&30522&13726',
    play_parse: true,

    // 一级：提取海报墙和详情页地址
    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); if(m){ try { var raw=m[1].replace(/\\\\u0022/g, '\"'); var res=JSON.parse(raw); var list=res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title:it.title, img:it.coverImg, desc:it.creatorName, url:'/archives/'+it.id+'/'}); } }); } catch(e){} } setResult(items);",
    
    // 二级：提取汉字简介和播放连接
    二级: "js: var html=request(input); var VOD={}; try { \
        var m = html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); \
        if(m){ \
            /* 1. 深度清洗：将源码中的 \\u0022 换成引号，将 \\u0026 换成 &，还原斜杠 */ \
            var cleanStr = m[1].replace(/\\\\u0022/g, '\"').replace(/\\\\u0026/g, '&').replace(/\\\\\\//g, '/'); \
            var res = JSON.parse(cleanStr); \
            var d = res.data.video; \
            \
            /* 2. 提取信息 */ \
            VOD.vod_name = d.title; \
            VOD.vod_pic = d.coverImg; \
            VOD.vod_remarks = d.bango || '官方源'; \
            \
            /* 3. 提取汉字简介 (关键点：d.desc) */ \
            VOD.vod_content = d.desc || '暂无简介'; \
            \
            /* 4. 提取播放地址 (关键点：d.video.url) */ \
            var purl = d.video.url; \
            if(purl){ \
                VOD.vod_play_from = 'Cloudfront高速'; \
                /* 拼接确认可用的公式 */ \
                var finalUrl = 'https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + purl.replace(/^\\//, ''); \
                VOD.vod_play_url = '立即播放$' + finalUrl; \
            } \
        } else { \
            VOD.vod_content = '未能在源码中匹配到dataJson变量'; \
        } \
    } catch(e){ VOD.vod_content = '详情页提取失败:' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
