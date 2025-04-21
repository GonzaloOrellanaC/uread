export const dateTranslate = (date: Date, type: 'Nombre Día, Fecha ["Día" de "Mes"]' | 'DD/MM/AAAA' = 'Nombre Día, Fecha ["Día" de "Mes"]' ) => {
    const day = date.getDay() + 1
    const dateNumber = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    let newDay = ''
    let newDateNumber = ''
    let newMonth = ''
    let newMonthName = ''
    let newYear = ''

    if (day === 1) {
        newDay = 'Lunes'
    } else if (day === 2) {
        newDay = 'Martes'
    } else if (day === 3) {
        newDay = 'Miércoles'
    } else if (day === 4) {
        newDay = 'Jueves'
    } else if (day === 5) {
        newDay = 'Viernes'
    } else if (day === 6) {
        newDay = 'Sabado'
    } else {
        newDay = 'Domingo'
    }

    if (dateNumber < 10) {
        newDateNumber = `0${dateNumber}`
    } else {
        newDateNumber = `${dateNumber}`
    }

    if (month < 10) {
        newMonth = `0${month}`
    } else {
        newMonth = `${month}`
    }

    if (newMonth === '01') {
        newMonthName = 'Enero'
    } else if (newMonth === '02') {
        newMonthName = 'Febrero'
    } else if (newMonth === '03') {
        newMonthName = 'Marzo'
    } else if (newMonth === '04') {
        newMonthName = 'Abril'
    } else if (newMonth === '05') {
        newMonthName = 'Mayo'
    } else if (newMonth === '06') {
        newMonthName = 'Junio'
    } else if (newMonth === '07') {
        newMonthName = 'Julio'
    } else if (newMonth === '08') {
        newMonthName = 'Agosto'
    } else if (newMonth === '09') {
        newMonthName = 'Septiembre'
    } else if (newMonth === '10') {
        newMonthName = 'Octubre'
    } else if (newMonth === '11') {
        newMonthName = 'Noviembre'
    } else {
        newMonthName = 'Diciembre'
    }

    newYear = `${year}`

    if (type === 'Nombre Día, Fecha ["Día" de "Mes"]') {
        return `${newDay}, ${newDateNumber} de ${newMonthName}`
    } else if (type === 'DD/MM/AAAA') {
        return `${newDateNumber}/${newMonth}/${newYear}`
    }
}