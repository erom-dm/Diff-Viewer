
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
            const hasNoChildren = (Object.entries(obj[key]).length === 0 && obj[key].constructor === Object)
                                || (Object.entries(obj[key]).length === 1 && Object.entries(obj[key])[0][0] === 'status');

            // General case for objects
            if(typeof obj[key] === 'object' && obj[key] !== null && key !== 'elements'){
                arr.push({
                    'name': key,
                    'status': status,
                    'parents': parentName,
                });
                // Add array with child nodes only if children are present
                if (!hasNoChildren){
                    arr[arr.length - 1]['children'] = JSONtoArray(obj[key], parents);
                }
            // Special case for 'elements' array
            } else if (key === 'elements'){
                for (const el in obj[key]){
                    if(obj[key].hasOwnProperty(el)){
                        arr.push({
                            'name': obj[key][el]['name'],
                            'status': obj[key][el]['status'],
                            'parents': parentName,
                        });
                    }
                }
            // General case for non-objects
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