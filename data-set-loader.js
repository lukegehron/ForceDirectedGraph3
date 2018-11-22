function getGraphDataSets() {

    const loadConnection12 = function(Graph) {
        Graph
            .numDimensions(2)
            .cooldownTicks(200)
            .nodeLabel('id')
            .nodeAutoColorBy('group')
            .forceEngine('ngraph')
            .jsonUrl('connections.json');
    };
    loadConnection12.description = ": In Project Team Interactions - Nodes";

    //.backgroundColor('#000000')

    const loadConnection10 = function(Graph) {
        Graph
            .cooldownTicks(200)
            .nodeLabel('id')
            .nodeAutoColorBy('group')
            .forceEngine('ngraph')
            .jsonUrl('connections.json');
    };
    loadConnection10.description = ": In Project Team Interactions - Nodes";

    //


    const loadConnection11 = function(Graph) {
      // Graph.d3Force('charge').strength(-150);
      Graph
        .cooldownTicks(200)
        .jsonUrl('connections.json')
        .nodeAutoColorBy('group')
        .forceEngine('ngraph')
        .nodeLabel('id')
        .nodeThreeObject(node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 6;
          return sprite;
        });
      };

    loadConnection11.description = ": In Project Team Interactions - Names";

    //

    const loadConnection20 = function(Graph) {
        Graph
            .cooldownTicks(200)
            .nodeLabel('id')
            .nodeAutoColorBy('group')
            .forceEngine('ngraph')
            .jsonUrl('connections2.json');
    };
    loadConnection20.description = ": Out of Project Team Interactions - Nodes";

    //


    const loadConnection21 = function(Graph) {
      // Graph.d3Force('charge').strength(-150);
      Graph
        .cooldownTicks(200)
        .jsonUrl('connections2.json')
        .nodeAutoColorBy('group')
        .forceEngine('ngraph')
        .nodeLabel('id')
        .nodeThreeObject(node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 6;
          return sprite;
        });
      };

    loadConnection21.description = ": Out of Project Team Interactions - Names";

    // .backgroundColor('#000000')

    const loadConnection30 = function(Graph) {
        Graph
            .cooldownTicks(200)
            .nodeLabel('id')
            .nodeAutoColorBy('group')
            .forceEngine('ngraph')
            .jsonUrl('connections3.json');
    };
    loadConnection30.description = ": All Coworker Interactions - Nodes";

    //


    const loadConnection31 = function(Graph) {
      // Graph.d3Force('charge').strength(-150);
      Graph
        .cooldownTicks(200)
        .jsonUrl('connections3.json')
        .nodeAutoColorBy('group')
        .forceEngine('d3')
        .nodeLabel('id')
        .nodeThreeObject(node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 6;
          return sprite;
        });
      };

    loadConnection31.description = ": All Coworker Interactions - Names";


    const loadBlocks = function(Graph) {
        qwest.get('blocks.json').then((_, data) => {
            data.nodes.forEach(node => { node.name = `${node.user?node.user+': ':''}${node.description || node.id}` });

            Graph
                .cooldownTicks(300)
                .cooldownTime(20000)
                .nodeAutoColorBy('user')
                .forceEngine('ngraph')
                .graphData(data);
        });
    };
    loadBlocks.description = "<em>Blocks</em> data (<a href='https://bl.ocks.org/mbostock/afecf1ce04644ad9036ca146d2084895'>afecf1ce04644ad9036ca146d2084895</a>)";

    //

    const loadD3Dependencies = function(Graph) {
        qwest.get('.d3.csv').then((_, csvData) => {
            const { data: [, ...data] } = Papa.parse(csvData); // Parse csv
            data.pop(); // Remove last empty row

            const nodes = [], links = [];
            data.forEach(([size, path]) => {
                const levels = path.split('/'),
                    module = levels.length > 1 ? levels[1] : null,
                    leaf = levels.pop(),
                    parent = levels.join('/');

                nodes.push({
                    path,
                    leaf,
                    module,
                    size: +size || 1
                });

                if (parent) {
                    links.push({ source: parent, target: path});
                }
            });

            Graph
                .cooldownTicks(300)
                .nodeRelSize(0.5)
                .nodeId('path')
                .nodeVal('size')
                .nodeLabel('path')
                .nodeAutoColorBy('module')
                .forceEngine('ngraph')
                .graphData({ nodes: nodes, links: links });
        });
    };
    loadD3Dependencies.description = "<em>D3 dependencies</em> data (<a href='https://bl.ocks.org/mbostock/9a8124ccde3a4e9625bc413b48f14b30'>9a8124ccde3a4e9625bc413b48f14b30</a>)";

    const tunnel = function(Graph) {

        const perimeter = 12, length = 30;

        const getId = (col, row) => `${col},${row}`;

        let nodes = [], links = [];
        for (let colIdx=0; colIdx<perimeter; colIdx++) {
            for (let rowIdx=0; rowIdx<length; rowIdx++) {
                const id = getId(colIdx, rowIdx);
                nodes.push({id});

                // Link vertically
                if (rowIdx>0) {
                    links.push({ source: getId(colIdx, rowIdx-1), target: id });
                }

                // Link horizontally
                links.push({ source: getId((colIdx || perimeter) - 1, rowIdx), target: id });
            }
        }

        Graph
            .cooldownTicks(300)
            .forceEngine('ngraph')
            .graphData({ nodes: nodes, links: links });
    };
    tunnel.description = "fabric data for a cylindrical tunnel shape";

    //, loadBlocks, loadD3Dependencies, tunnel loadConnection12, 

    return [loadConnection10, loadConnection11, loadConnection20, loadConnection21, loadConnection30, loadConnection31];
}
