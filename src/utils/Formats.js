const formatContent = {}

// const newDate = (date) => {
    // }
function DateFormat(date) {
    const dateJour = Date.now()
    const dateValues = [
        {
            'dureeMax' : 60,
            'diviseur' : 1,
            'unite' : 's'
        },
        {
            'dureeMax' : 3600,
            'diviseur' : 60,
            'unite' : 'm'
        },
        {
            'dureeMax' : 86400,
            'diviseur' : 3600,
            'unite' : 'h'
        },
        {
            'dureeMax' : 2592000,
            'diviseur' : 86400,
            'unite' : 'j'
        },
        {
            'dureeMax' : 31536000,
            'diviseur' : 2592000,
            'unite' : ' mois'
        },
        {
            'dureeMax' : 31536000000,
            'diviseur' : 31536000,
            'unite' : ' an'
        },
    ]
    let dateRendu = 0
    const dateFormat = new Date(date)
    const differenceMilli = (dateJour - dateFormat) / 1000
    for (date of dateValues) {
        if (differenceMilli < date.dureeMax) {
            dateRendu = ~~(differenceMilli/date.diviseur)
            return (`il y a ${dateRendu}${date.unite}`)
            break}
    }
}

export {DateFormat}