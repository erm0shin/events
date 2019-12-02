'use strict';

function feelSchedule() {
    fetch('https://api.jsonbin.io/b/5de5139afb2d842b08a41bd3', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'secret-key': '$2b$10$vIMrDrpZuVK.SQ/nO8xXPu39Pd24doQz3aW5IeH7i3nuaa29pg/ly'
        },
    })
        .then(response => {
            let json = response.json();
            if (+response.status >= 400) {
                return json.then(err => {
                    throw err;
                });
            }
            return json;
        })
        .then(list => {
            let schedule = document.getElementsByClassName("schedule_table")[0];
            list.forEach((event, index) => {
                if (index == 0) {
                    schedule.appendChild(drawTableTop());
                }
                schedule.appendChild(drawTableRow(event));
            });
        })
        .catch(err => {
            throw err.error;
        });
}

function drawTableTop() {
    let tableTop = document.createElement('div');
    tableTop.classList.add('schedule_table_row');

    let name = drawCell('schedule_table_header', 'text_align_left', 'Название')
    tableTop.appendChild(name);

    let date = drawCell('schedule_table_header', 'text_align_right', 'Дата проведения')
    tableTop.appendChild(date);

    let place = drawCell('schedule_table_header', 'text_align_right', 'Место проведения')
    tableTop.appendChild(place);

    let countTotal = drawCell('schedule_table_header', 'text_align_right', 'Количество мест')
    tableTop.appendChild(countTotal);

    let countLeft = drawCell('schedule_table_header', 'text_align_right', 'Осталось мест')
    tableTop.appendChild(countLeft);

    let registerLink = drawCell('schedule_table_header', 'text_align_right', '')
    tableTop.appendChild(registerLink);

    return tableTop;
}

function drawTableRow(event) {
    let row = document.createElement('div');
    row.classList.add('schedule_table_row');

    let name = drawCell('schedule_table_cell', 'text_align_left', event.name)
    row.appendChild(name);

    let date = drawCell('schedule_table_cell', 'text_align_right', event.date)
    row.appendChild(date);

    let place = drawCell('schedule_table_cell', 'text_align_right', event.place)
    row.appendChild(place);

    let countTotal = drawCell('schedule_table_cell', 'text_align_right', event.countTotal)
    row.appendChild(countTotal);

    let countLeft = drawCell('schedule_table_cell', 'text_align_right', event.countLeft)
    row.appendChild(countLeft);

    let registerLink = document.createElement('div');
    registerLink.classList.add('schedule_table_cell');
    registerLink.classList.add('text_align_right');
    registerLink.classList.add('active_link');
    registerLink.innerText = 'Регистрация';
    row.appendChild(registerLink);

    return row;
}

function drawCell(cellType, contentDisposition, cellContent) {
    let cell = document.createElement('div');
    cell.classList.add(cellType);
    cell.classList.add(contentDisposition);
    cell.innerText = cellContent;
    return cell;
}

feelSchedule();