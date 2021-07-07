const getNodes = async (APISession) => {
    const response = await APISession.api.v1.nodes.get();
    const nodes = response.body.items;

    let final = [];

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        final.push({
            name: node.metadata.name,
            info: {
                uid: node.metadata.uid,
                creationDate: node.metadata.creationTimestamp,
                labels: node.metadata.labels,
                annotations: node.metadata.annotations,
            },
            stats: {
                capacity: node.status.capacity,
                allocatable: node.status.allocatable,
                nodeInfo: node.status.nodeInfo,
                images: node.status.images,
                volumes: {
                    inUse: node.status.volumesInUse,
                    attached: node.status.volumesAttached,
                },
            },
        });
    }

    return final;
};

module.exports = { getNodes };
