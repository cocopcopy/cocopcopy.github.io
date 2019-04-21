

// flnodeGet();
// allChartInit(1);
// function flnodeGet() {
//     $.getJSON('../data/node/flnode_merge.json', function (data) {
//         console.log(data.length);
//         namespace.node_info = data;
//         allChartInit(1);
//     })
// }

function allChartInit(i) {
    if (i == 1) {
        gtDraw(graph[0], i - 1);
        gtDraw(graph[1], i);
        ecdInitDraw(graph[2], i - 1);
        ecdInitDraw(graph[3], i);
        baseInitDraw(graph[4], i - 1);
        baseInitDraw(graph[5], i);
        lineChartDraw(graph[6], [], []);
        lineChartDraw(graph[7], [], []);
        lineStepDraw(graph[8], namespace.NMI[0].slice(0, namespace.time_step), namespace.NMI[1].slice(0, namespace.time_step));
        scatterDraw(graph[9], []);
        scatterDraw(graph[10], []);
    }
    else {
        i = i - 1;
        gtDraw(graph[0], i - 1);
        gtDraw(graph[1], i);
        graphIterDraw(graph[2], namespace.ecd_iter[i - 1][99], namespace.node_info[i - 1].links, namespace.node_info[i - 1].coordi, 100);
        ecdInitDraw(graph[3], i);
        graphIterDraw(graph[4], namespace.dynmoga_iter[i - 1][99], namespace.node_info[i - 1].links, namespace.node_info[i - 1].coordi, 100);
        baseInitDraw(graph[5], i);
        lineChartDraw(graph[6], [], []);
        lineChartDraw(graph[7], [], []);
        lineStepDraw(graph[8], namespace.NMI[0].slice(0, namespace.time_step), namespace.NMI[1].slice(0, namespace.time_step));
        scatterDraw(graph[9], []);
        scatterDraw(graph[10], []);
    }
    // else {
    //     gtDraw(graph[0], i - 1);
    //     graphClear(graph[1]);
    //     ecdInitDraw(graph[2], i - 1);
    //     graphClear(graph[3]);
    //     baseInitDraw(graph[4], i - 1);
    //     graphClear(graph[5]);
    //     lineChartDraw(graph[6], [], []);
    //     lineChartDraw(graph[7], [], []);
    //     lineStepDraw(graph[8], namespace.NMI[0].slice(0, namespace.time_step), namespace.NMI[1].slice(0, namespace.time_step));
    //     scatterDraw(graph[9], []);
    //     scatterDraw(graph[10], []);
    // }
}

function iterDraw(i) {
    if (i >= 0) {
        with (namespace) {
            // console.log(ecd_iter[time_step - 1]);
            if (time_step == 0) {
                graphIterDraw(graph[2], ecd_iter[time_step][i], node_info[time_step].links, node_info[time_step].coordi, i + 1);
                graphIterDraw(graph[4], dynmoga_iter[time_step][i], node_info[time_step].links, node_info[time_step].coordi, i + 1);
                lineChartDraw(graph[6], ecd_fitness[time_step].dyn_NMI.slice(0, i + 1), dynmoga_fitness[time_step].dyn_NMI.slice(0, i + 1));
                lineChartDraw(graph[7], ecd_fitness[time_step].dyn_Q.slice(0, i + 1), dynmoga_fitness[time_step].dyn_Q.slice(0, i + 1));
                scatterDataload(i);
            }
            else {
                graphIterDraw(graph[3], ecd_iter[time_step][i], node_info[time_step].links, node_info[time_step].coordi, i + 1);
                graphIterDraw(graph[5], dynmoga_iter[time_step][i], node_info[time_step].links, node_info[time_step].coordi, i + 1);
                lineChartDraw(graph[6], ecd_fitness[time_step].dyn_NMI.slice(0, i + 1), dynmoga_fitness[time_step].dyn_NMI.slice(0, i + 1));
                lineChartDraw(graph[7], ecd_fitness[time_step].dyn_Q.slice(0, i + 1), dynmoga_fitness[time_step].dyn_Q.slice(0, i + 1));
                scatterDataload(i);
            }
        }
    }
    // else{

    // }
}


function gtDraw(chart, i) {
    var data = namespace.node_info[i];
    graphDraw(chart, data.data, data.links, data.coordi, i);
}

function ecdInitDraw(chart, i) {
    var data = namespace.node_info[i];
    graphInitDraw(chart, data.data, data.links, data.coordi);
}

function baseInitDraw(chart, i) {
    var data = namespace.node_info[i];
    graphInitDraw(chart, data.data, data.links, data.coordi);
}



function graphDraw(chart, data, link, coordi, i) {
    chart.setOption({
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#1abc9c', '#3498db', '#84817a', '#f39c12', '#c0392b', '#7f8c8d', '#b71540', '#ff9ff3', '#00d2d3', '#ff6b6b', '#48dbfb', '#0c2461', '#341f97', '#6D214F', '#9AECDB', '#cd6133', '#227093'],
        title: {
            text: 'timestep:' + (i + 1)
        },
        series: [
            {
                name: 'ecd',
                type: 'graph',
                data: data.map(function (val, i) {
                    return {
                        name: val.name,
                        category: val.category,
                        x: coordi[i][0],
                        y: coordi[i][1]
                    }
                }),
                links: link,
                categories: data.map(i => i.category),
                roam: true
            }
        ]
    });
}

function graphInitDraw(chart, data, link, coordi) {
    chart.setOption({

        title: {
            text: 'iter:0'
        },
        series: [
            {
                name: 'ecd',
                type: 'graph',
                data: data.map(function (val, i) {
                    return {
                        name: val.name,
                        x: coordi[i][0],
                        y: coordi[i][1]
                    }
                }),
                links: link,
                roam: true,
            }
        ]
    });
}


function graphIterDraw(chart, data, link, coordi, i) {
    chart.setOption({
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#1abc9c', '#3498db', '#84817a', '#f39c12', '#c0392b', '#7f8c8d', '#b71540', '#ff9ff3', '#00d2d3', '#ff6b6b', '#48dbfb', '#0c2461', '#341f97', '#6D214F', '#9AECDB', '#cd6133', '#227093'],

        title: {
            text: 'iter:' + i,
        },
        series: [
            {
                name: 'ecd',
                type: 'graph',
                data: data.map(function (val, i) {
                    return {
                        name: val.name,
                        category: val.category,
                        x: coordi[i][0],
                        y: coordi[i][1]
                    }
                }),
                links: link,
                categories: data.map(i => i.category),
                roam: true,
            }
        ]
    });
}

function graphClear(chart) {
    chart.setOption({
        title: {
            text: ''
        },
        series: [{
            data: []
        }
        ]
    });
}

function lineChartDraw(chart, ecd, dynmoga) {
    chart.setOption({
        grid: {
            left: 40,
            bottom: 40,
            right: 15,
            top: 40
        },
        legend: {
            data: ['DEC', 'DYNMOGA']
        },
        xAxis: {
            type: 'category',
            data: new Array(100).fill().map((val, i) => i + 1),
            name: 'Generation',
            nameLocation: 'center',
            nameGap: 25
        },
        yAxis: {
            type: 'value',
            max: 1.0,
            min: 0
        },
        series: [
            {
                name: 'DEC',
                data: ecd,
                type: 'line'
            },
            {
                name: 'DYNMOGA',
                data: dynmoga,
                type: 'line'
            }
        ]
    })
}


function lineStepDraw(chart, ecd, dynmoga) {
    chart.setOption({
        grid: {
            left: 40,
            bottom: 40,
            right: 15,
            top: 40
        },
        legend: {
            data: ['DEC', 'DYNMOGA']
        },
        xAxis: {
            type: 'category',
            data: new Array(10).fill().map((val, i) => i + 1),
            boundaryGap: false,
            name: 'Timestep',
            nameLocation: 'center',
            nameGap: 25
        },
        yAxis: {
            type: 'value',
            max: 1.0,
            min: 0.9
        },
        series: [
            {
                name: 'DEC',
                data: ecd,
                type: 'line'
            },
            {
                name: 'DYNMOGA',
                data: dynmoga,
                type: 'line'
            }
        ]
    })
}

