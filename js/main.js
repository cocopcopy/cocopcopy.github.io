
var namespace = {
    node_info: {},
    ecd_iter: {},
    dynmoga_iter: {},
    ecd_fitness: {},
    dynmoga_fitness: {},
    NMI: {},
    ecd_modularity: {},
    ecd_NMI: {},
    file: ['expand', 'merge'],
    select_index: 0,
    time_step: 0,
    iter: 0,
    expand_node_info: {},
    merge_node_info: {},
    expand_ecd_iter: {},
    expand_dynmoga_iter: {},
    merge_ecd_iter: {},
    merge_dynmoga_iter: {},
    expand_ecd_fitness: {},
    expand_dynmoga_fitness: {},
    merge_ecd_fitness: {},
    merge_dynmoga_fitness: {},
    expand_NMI: {},
    merge_NMI: {}
};

var graph = [
    echarts.init(document.getElementById('truth0')),
    echarts.init(document.getElementById('truth1')),
    echarts.init(document.getElementById('ecd0')),
    echarts.init(document.getElementById('ecd1')),
    echarts.init(document.getElementById('base0')),
    echarts.init(document.getElementById('base1')),
    echarts.init(document.getElementById('NMI_iter')),
    echarts.init(document.getElementById('Q_iter')),
    echarts.init(document.getElementById('NMI_step')),
    echarts.init(document.getElementById('scatter0')),
    echarts.init(document.getElementById('scatter1'))
];

var t = {};

select_click();
sliderChange();
sliderIterChange();
animationControl();
choseClick();

function select_click() {
    $('#select div').click(function () {
        var click_index = $(this).index();
        if (click_index != namespace.select_index) {
            $('#select').children('div').eq(namespace.select_index).removeClass('active');
            $(this).addClass('active');
            namespace.select_index = click_index;
            node_data_init();
            namespace.time_step = 0;
            namespace.iter = 0;
            $('#iterslider').val(0);
            $('#iter_time span').text(0);
            $('#slider').val(1);
            $('#amount').val(1)
        }
    });
}

function sliderChange() {
    var slider = document.getElementById('slider');
    slider.onchange = e => {
        var value = e.target.value;
        document.getElementById('amount').value = value;
        namespace.time_step = value - 1;
        namespace.iter = 0;
        allChartInit(parseInt(value));
        $('#iterslider').val(0);
        $('#iter_time span').text(0);
        lineStepDraw(graph[8], namespace.NMI[0].slice(0, namespace.time_step), namespace.NMI[1].slice(0, namespace.time_step));
    }
    slider.oninput = e => {
        var value = e.target.value;
        document.getElementById('amount').value = value;
    }
}

function animationControl() {
    var start = document.getElementById('start_buttom');
    start.onclick = function () {
        iterStartAnimation();
    }
    var pause = document.getElementById('pause_buttom');
    pause.onclick = function () {
        clearInterval(t);
        console.log(namespace.iter);
    }
    var done = document.getElementById('done_buttom');
    done.onclick = function () {
        clearInterval(t);
        namespace.iter = 99;
        var i = namespace.iter;
        // console.log(i);
        $('#iter_time span').text(i + 1);
        $('#iterslider').val(i + 1);
        iterDraw(i);
        lineStepDraw(graph[8], namespace.NMI[0].slice(0, namespace.time_step + 1), namespace.NMI[1].slice(0, namespace.time_step + 1));
    }
}

function iterStartAnimation() {
    if (namespace.iter < 99) {
        var time = document.getElementById('anitime').value;
        t = setInterval(function () {

            var i = namespace.iter;
            // console.log(i);
            $('#iter_time span').text(i + 1);
            $('#iterslider').val(i + 1);
            iterDraw(i);

            if (i == 99) {
                clearInterval(t);
                lineStepDraw(graph[8], namespace.NMI[0].slice(0, namespace.time_step + 1), namespace.NMI[1].slice(0, namespace.time_step + 1));
                console.log('finished');
            }
            namespace.iter++;
        }, parseInt(time));
    }
}

function sliderIterChange() {
    var slider = document.getElementById('iterslider');
    slider.onchange = e => {
        // console.log('iterslider');
        var value = e.target.value;
        $('#iter_time span').text(value);
        namespace.iter = value - 1;
        iterDraw(value - 1);
    }
    slider.oninput = e => {
        var value = e.target.value;
        $('#iter_time span').text(value);
    }
}


var files = [];
files.push(
    d3.json('../data/node/flnode_expand.1.json'),
    d3.json('../data/node/flnode_merge.1.json'),
    d3.json('../data/node/expand_ecd_iter.json'),
    d3.json('../data/node/expand_dynmoga_iter.json'),
    d3.json('../data/node/merge_ecd_iter.json'),
    d3.json('../data/node/merge_dynmoga_iter.json'),
    d3.json('../data/node/expand_ecd_fitness.json'),
    d3.json('../data/node/expand_dynmoga_fitness.json'),
    d3.json('../data/node/merge_ecd_fitness.json'),
    d3.json('../data/node/merge_dynmoga_fitness.json'),
    d3.csv('../data/expand/ECD/fitness_value/t_NMI.csv', d => d.NMI),
    d3.csv('../data/expand/DYNMOGA/fitness_value/t_NMI.csv', d => d.NMI),
    d3.csv('../data/merge/ECD/fitness_value/t_NMI.csv', d => d.NMI),
    d3.csv('../data/merge/DYNMOGA/fitness_value/t_NMI.csv', d => d.NMI),
    d3.json('../data/node/expand_ecd_modularity.json'),
    d3.json('../data/node/expand_ecd_NMI.json')
);

Promise.all(
    files
).then(result => {
    console.log(result.length);
    with (namespace) {
        expand_node_info = result[0];
        merge_node_info = result[1];
        expand_ecd_iter = result[2];
        expand_dynmoga_iter = result[3];
        merge_ecd_iter = result[4];
        merge_dynmoga_iter = result[5];
        expand_ecd_fitness = result[6];
        expand_dynmoga_fitness = result[7];
        merge_ecd_fitness = result[8];
        merge_dynmoga_fitness = result[9];
        expand_NMI = [
            result[10], result[11]
        ],
            merge_NMI = [
                result[12], result[13]
            ],


            ecd_modularity = result[14],
            ecd_NMI = result[15]
    }
    node_data_init();
})

function node_data_init() {
    with (namespace) {
        if (select_index == 0) {
            node_info = expand_node_info;
            ecd_iter = expand_ecd_iter;
            dynmoga_iter = expand_dynmoga_iter;
            ecd_fitness = expand_ecd_fitness;
            dynmoga_fitness = expand_dynmoga_fitness;
            NMI = expand_NMI;
        }
        else {
            node_info = merge_node_info;
            ecd_iter = merge_ecd_iter;
            dynmoga_iter = merge_dynmoga_iter;
            ecd_fitness = merge_ecd_fitness;
            dynmoga_fitness = merge_dynmoga_fitness;
            NMI = merge_NMI;
        }
    }
    allChartInit(1);
}

function choseClick() {
    var chose = document.getElementById('box');
    chose.onclick = function () {
        var text = $('#chosetext a').text();
        // console.log(text);
        if (text == 'overview') {
            // $('#right_item1').css('display', 'none');
            // $('#right_item2').css('display', 'block');
            $('#chosetext a').text('detail').attr('href', '#right_item2');
        }
        else {
            // $('#right_item1').css('display', 'block');
            // $('#right_item2').css('display', 'none');
            $('#chosetext a').text('overview').attr('href', '#right_item1');
        }
    }
}