
function modifyParentName(parents){
    switch (parents) {
        case 'storage':
            return '-storages-';
        case 'interfaces':
            return '-snmp-interfaces-';
        case 'elements':
            return '';
        default:
            return parents;
    }
}

export default function JSONtoArray(obj, parentName = ''){
    const arr = [];

    // Iterate through all keys in JSON
    for (const key in obj){
        if(obj.hasOwnProperty(key)){
            const parents = parentName.concat(modifyParentName(key));
            const status = obj[key]['status'] ? obj[key]['status'] : 'unchanged';

            // If node has children
            if(typeof obj[key] === 'object' && obj[key] !== null && key !== 'elements'){
                arr.push({
                    'name': key,
                    'status': status,
                    'parents': parentName,
                    'children': JSONtoArray(obj[key], parents)
                })
            } else if (key === 'elements'){
                for (const el in obj[key]){
                    if(obj[key].hasOwnProperty(el)){
                        // Inside 'elements' array, push items as strings with status concatenated in front
                        arr.push({
                            'name': obj[key][el]['name'],
                            'status': obj[key][el]['status'],
                            'parents': parentName,
                            'children':[]
                        });
                    }
                }
            } else {
                // do not include status nodes for parents
                if (key !== 'status'){
                    arr.push({
                        'name': obj[key],
                        'parents': parentName,
                        'status': status
                    });
                }
            }
        }
    }

    return arr
}