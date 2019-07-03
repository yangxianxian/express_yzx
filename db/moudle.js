class baseMoudle {
    constructor (data,message) {
        if(typeof data == 'String') {
            this.data = message
            data = null
            message = null
        }
        if(data) {
            this.data = data
        }
        if(message) {
            this.message = message
        }
    } 
}

class successMoudle extends baseMoudle {
    constructor(data,message) {
        super(data,message)
        this.code = 0
    }
}

class errorMoudle extends baseMoudle {
    constructor(data,message) {
        super(data,message)
        this.code = -1
    }
}

module.exports = {
    successMoudle,errorMoudle
}