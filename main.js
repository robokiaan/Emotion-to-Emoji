Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
})

var img;

jQuery(document).ready(function () {
    Webcam.attach(jQuery('#webcam-view'))
})

function capture_img() {
    Webcam.snap(function (data_url) {
        jQuery('#webcam-picture').html(`<img id='selfie_img' src='${data_url}'>`)
        img = jQuery('#selfie_img')
    })
    }

console.log(ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/23uhfybZ1/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded')
}

function identify_img() {
    classifier.classify(img, gotresult)
}

function gotresult(error, results) {
    console.log('runs')
    if (error == true) {
        console.error(error)
    } else {
        console.log(results)
        jQuery('#result-emotion-name1').html(results[0].label)
        jQuery('#result-emotion-name2').html(results[1].label)
        var speech_text = 'you are feeling ' + results[0].label + ' or ' + results[1].label
        speak(speech_text)
    }
    if (String(results[0].label).toLowerCase() == 'happy') {
        jQuery('#update-emoji1').text('😀')
    } else if (String(results[0].label).toLowerCase() == 'sad') {
        jQuery('#update-emoji1').text('😥')
    } else if (String(results[0].label).toLowerCase() == 'angry') {
        jQuery('#update-emoji1').text('😠')
    }

    if (String(results[1].label).toLowerCase() == 'happy') {
        jQuery('#update-emoji2').text('😀')
    } else if (String(results[1].label).toLowerCase() == 'sad') {
        jQuery('#update-emoji2').text('😥')
    } else if (String(results[1].label).toLowerCase() == 'angry') {
        jQuery('#update-emoji2').text('😠')
    }
}

function speak(speak_text) {
    var SS = window.speechSynthesis

    var speak_data = speak_text

    var Utter_this = new SpeechSynthesisUtterance(speak_data);
    SS.speak(Utter_this)
}