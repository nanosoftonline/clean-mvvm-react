const COLLECTION = "PRODUCTS"

/**
 * 
 * @returns {Promise<{error: Error?, result: {id:string, name: string, price:number}[]?}>}
 */
export function getAll() {
    try {
        let data = [];
        let dataString = window.localStorage.getItem(COLLECTION)
        if (dataString) {
            data = JSON.parse(dataString)
        }
        return Promise.resolve({ error: null, result: data })

    } catch (err) {
        return Promise.resolve({ error: err.message, result: null })
    }
}
/**
 * 
 * @param {string} id 
 * @returns {Promise<{error: Error?, result: {id:string, name: string, price:number}?}>}
 */
export function getOne(id) {
    try {
        let data = [];
        let dataString = window.localStorage.getItem(COLLECTION)
        if (dataString) {
            data = JSON.parse(dataString)
        }
        let filteredData = data.filter(item => item.id === id)

        return Promise.resolve({ error: null, result: filteredData.length > 0 ? filteredData[0] : null })

    } catch (err) {
        return Promise.resolve({ error: err, result: null })
    }
}
/**
 * 
 * @param {{name:string, price: number, id: string}} productData 
 * @returns {Promise<{error: Error?, result: boolean?}>}
 */
export async function create(productData) {
    let { error, result } = await getAll()
    let data = result || [];
    productData.id = (new Date().getTime()).toString()
    data.push(productData)
    window.localStorage.setItem(COLLECTION, JSON.stringify(data))
    return Promise.resolve({ error: null, result: true })
}


/**
 * 
 * @param {string} id 
 * @returns {Promise<{error: Error?, result: boolean}>}
 */
export async function deleteOne(id) {
    let { error, result } = await getAll()
    let data = result || [];
    let deleteIndex = data.indexOf(item => item.id === id)
    data.splice(deleteIndex, 1)
    window.localStorage.setItem(COLLECTION, JSON.stringify(data))
    return Promise.resolve({ error: null, result: true })
}

export async function update(id, productData) {
    let { error, result } = await getAll()
    let data = result || [];

    data.forEach(item => {
        if (item.id === id) {
            item.name = productData.name;
            item.price = productData.price;
        }
    })
    window.localStorage.setItem(COLLECTION, JSON.stringify(data))
    return Promise.resolve({ error: null, result: true })
}
