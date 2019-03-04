

export default function JSONtoArray(obj){
    const arr = [];

    // Iterate through all keys in JSON
    for (const key in obj){
        if(obj.hasOwnProperty(key)){

            const status = obj[key]['status'] ? obj[key]['status'] : 'unchanged';

            if(typeof obj[key] === 'object' && obj[key] !== null && key !== 'elements'){
                // If node has children
                arr.push({'name': key, 'status': status, 'children': JSONtoArray(obj[key])})
            } else if (key === 'elements'){
                for (const el in obj[key]){
                    if(obj[key].hasOwnProperty(el)){
                        // Inside 'elements' array, push items as strings with status concatenated in front
                        arr.push({'name': obj[key][el]['name'], 'status': obj[key][el]['status'], 'children':[]});
                    }
                }
            } else {
                // do not include status nodes for parents
                if (key !== 'status'){
                    arr.push({'name': obj[key], 'status': status});
                }
            }
        }
    }

    return arr
}