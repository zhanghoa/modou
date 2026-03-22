var rule = {
    title: '麻豆官方-TVBox专用版',
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

    一级: "js: var items=[]; var html=request(input); var m=html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); if(m){ try { var res = JSON.parse(JSON.parse('\"' + m[1] + '\"')); var list = res.data.videoInfos || res.data.videoInfosList || []; list.forEach(function(it){ if(it.id > 0){ items.push({title: it.title, img: it.coverImg, desc: it.creatorName, url: '/archives/' + it.id + '/' }); } }); } catch(e){} } setResult(items);",
    
    二级: "js: var html=request(input); var VOD={}; try { \
        var m = html.match(/dataJson\\s*=\\s*['\"](.*?)['\"]/); \
        if(m){ \
            /* 双重解析：确保 TVBox 引擎能解开 Unicode 字符串 */ \
            var res = JSON.parse(JSON.parse('\"' + m[1] + '\"')); \
            var d = res.data.video; \
            \
            /* 提取信息 */ \
            VOD.vod_name = d.title; \
            VOD.vod_pic = d.coverImg; \
            VOD.vod_remarks = d.bango; \
            \
            /* 100% 提取汉字简介 */ \
            VOD.vod_content = d.desc || '暂无简介'; \
            \
            /* 100% 提取播放地址 (根据浏览器成功的 video.video.url 逻辑) */ \
            var purl = d.video.url; \
            if(purl){ \
                /* 特别处理 TVBox 的 & 符号转义问题 */ \
                purl = purl.replace(/\\\\u0026/g, '&').replace(/^\\//, ''); \
                VOD.vod_play_from = 'Cloudfront高速'; \
                VOD.vod_play_url = '立即播放$https://d2r1iw2cxonh4q.cloudfront.net/h5/m3u8/' + purl; \
            } \
        } \
    } catch(e){ VOD.vod_content = 'TVBox解析异常:' + e.message; } setResult(VOD);",
    
    lazy: "js: input = {jx:0, url:input.split('$')[1], parse:0, header: JSON.stringify({'User-Agent': 'Mozilla/5.0', 'Referer': 'https://madou.com/'}) };"
};
