const getNamespaces = async (APISession) => {
    const response = await APISession.api.v1.namespaces.get();
    const namespaces = response.body.items;

    let final = [];

    for (let i = 0; i < namespaces.length; i++) {
        const namespace = namespaces[i];
        final.push({
            name: namespace.metadata.name,
            info: {
                uid: namespace.metadata.uid,
                creationDate: namespace.metadata.creationTimestamp,
                labels: namespace.metadata.labels,
                annotations: namespace.metadata.annotations,
            },
            status: namespace.status,
        });
    }

    return final;
};

module.exports = { getNamespaces };
