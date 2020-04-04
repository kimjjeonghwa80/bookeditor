'use strict';

const {dialog} = require('electron').remote;
const fs = require('fs');
const path = require('path');
const ui = require('./ui.js');
const BookEditor = require('./bookeditor');

let ebookConvertLocation = "/Applications/calibre.app/Contents/MacOS/ebook-convert";
let editor = null;

function init() {
    document.querySelector("#book_file").onclick = opendir;
    document.querySelector("#book_save").onclick = () => editorAction("save");
    document.querySelector("#merge_up").onclick = () => editorAction("merge_up");
    document.querySelector("#move_first").onclick = () => editorAction("move_first");
    document.querySelector("#move_last").onclick = () => editorAction("move_last");
    document.querySelector("#show_all").onclick = () => editorAction("show_all");
    check();
}

function editorAction(action) {
    if (!editor) {
        ui.message("Please select a file first");
        return;
    }
    editor.perform(action);
}

async function opendir() {
    let result = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });
    if (Array.isArray(result) && result.length > 0) {
        editor = new BookEditor(result[0]);
    }
}

async function savebook() {
    if (editor) {
    } else {
        ui.message("Please select a file first");
    }
}

function check() {
    if (!fs.existsSync(ebookConvertLocation)) {
        ui.message("No calibre app found", true);
    }
}

init()
