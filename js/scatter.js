

function scatterDataload(item) {
    var t = namespace.time_step;
    var nmidata = namespace.ecd_NMI[t];
    var mordata = namespace.ecd_modularity[t];
    // console.log(nmidata, mordata);
    var ndata = nmidata[0];
    var mdata = mordata[0];
    for (var i = 1; i <= item; i++) {
        // console.log(i + ':' + nmidata[i]);
        ndata = ndata.concat(nmidata[i]);
        mdata = mdata.concat(mordata[i]);
    }
    scatterDraw(graph[9], ndata);
    scatterDraw(graph[10], mdata);

}

function scatterDraw(chart, data) {
    chart.setOption({
        color: ['rgba(194,53,49,0.05)'],
        dataZoom: [{
            type: 'inside',
            orient: 'vertical',
            // left: 10
        }
            // , {
            //     type: 'slider'
            // }
        ],
        xAxis: {
            type: 'value',
            max: 100,
            min: 1,
            // data: new Array(100).fill().map((val, i) => i + 1),
            // boundaryGap: false
            name: 'Generation',
            nameLocation: 'center',
            nameGap: 25
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1
        },
        series: [{
            symbolSize: 5,
            data: data,
            type: 'scatterGL',
            // itemstyle: {
            //     color: 'rgba(0, 0, 0, 0.2)'
            // }
        }]
    })
}