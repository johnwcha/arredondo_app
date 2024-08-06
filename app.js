let arreObj
let video_list
let topIntent

// The following function creates an <iframe> and Panopto player
// var embedApi
// var embedApi_encouraging
// var embedApi_no_answer

let convs = []
// < { type: 'arredondo', time: '', msg: '' }
// < { type: 'user', time: '', msg: '' }
/*
const waiting_vid = '1cb96a40-6b26-4b75-b491-b15d00022565'

const arre_encouragement = [
    '0bf04012-8ba7-43cc-9049-b1a9016e83f8', '09566bc3-8fe8-4910-b414-b1a9016e96ac', 'd7bf18ba-48d8-441c-acef-b1a9016eaf4a', 'b29b499c-a259-469c-9728-b1a9016dfecf', 'af970424-d2c5-4125-8cdc-b1a9016dfe9d',
    '65575eaa-d464-45c5-9002-b1a9016dff01', 'b9f0eb55-01e0-4819-a721-b1a9016dff2b', '0c2f7e20-72c4-480f-aade-b1a9016e0533', 'f4a181e7-3691-4fa1-b68b-b1a9016e0b46', '2af4d91e-3147-491b-9226-b1a9016e0ec3',
    '17d432e5-74d2-4ff3-93cf-b1a9016e0eed', '3537b3f6-117d-472a-9a5c-b1a9016e15cb', 'e39ae14e-a814-42f6-bb22-b1a9016e1600', '12a64d89-b2de-4c4a-bf4e-b1a9016e1cd9', 'f6a96576-276a-4d77-8c4c-b1a9016e209e',
    '1ec3bc5a-3279-4315-905e-b1a9016e250c', 'd22adee0-d4cb-4084-ba63-b1a9016e2634', '72edfdce-b296-46a4-a506-b1a9016e3571', 'ccf7508b-05db-47be-b9b7-b1a9016e4f42', '4ade7937-2937-480d-bf8a-b1a9016e644d'
]
const arre_inspiring = [
    '01306d40-d3bc-4d1b-8f52-b15d00021561', 'e52d13f7-fa0e-4786-be7d-b1aa0000dcc8', '6d347bdf-a358-40a1-9c58-b1a9018b0ecf', '53279b8b-09d2-47fa-9183-b1a9018b0f34', '29923f1a-d799-4ffb-b259-b1a9018b0f60', 
    '1067d80e-d338-4fd3-b5a6-b1a9018b0efd', '7cbe0a2a-ad94-4561-b359-b1a9018b1643', '804d0f33-089a-4cc2-a59e-b1a9018b2f5d', 'b799f8a7-2145-4fb6-8d73-b1a9018b45eb', 'eab3cfcd-6a62-4c8c-bfd1-b1a9018b5e26', 
    'bca01f2e-9dc4-496d-b1cb-b1a9018b727b', '1d5857fd-69d1-40cd-9f04-b1aa0000091c', 'a04e6ad7-e2fc-4c6e-817b-b1aa00002280', '0e79bcf4-d9b6-47bc-b9e4-b1aa0000399d', 'b7e66207-c884-459f-b9a4-b1aa00004eca', 
    'bc11dbcb-3d30-4cea-82f5-b1aa0000688b', '3b617d2e-a499-422a-9b1c-b1aa0000807a', 'f81f83f9-f1cc-47fe-8f23-b1aa00009675', '5fde9be8-d6d2-44cd-ba1b-b1aa0000afd3', '0f00dd7d-90e7-4a8b-b6a5-b1aa0000c4f6'
]
const arre_noanswer = [
    '5321f631-f4ae-4bb8-8c76-b15d00021d4a', 'fe9084b5-65d5-4ec3-a9fe-b1af0184816a', '412db663-912d-4724-b6d4-b1af0184819d', '40a17362-453f-4dd3-857f-b1af018481f0', 'f4ab3cb2-8117-4e71-8dfd-b1af018481c7', 
    'b84afbda-f1a7-4046-8fb0-b1af01848808', 'aa604b6c-a960-44bf-8072-b1af01848c83', 'c3a9279a-c392-45fd-8598-b1af0184928f', '7677b0c7-1a0d-4e98-9dbb-b1af0184983e', 'b27fc004-eb37-4791-9dc8-b1af01849bbc', 
    'c7932beb-a68c-4b21-bb12-b1af0184a0f3', '768f67e5-8d13-4a20-bb5a-b1af0184a172', 'b86d30f3-7538-49e0-b430-b1af0184a7fd', 'e99d5a01-15e9-4dd8-872e-b1af0184aa5e', 'b9dc8bd0-8206-46f6-a884-b1af0184af90', 
    '4f2c4bcd-c216-4867-ae1d-b1af0184bfef', 'ed2d3657-388e-4a78-be48-b1af0184d87d', '928dca7e-899b-40d4-9d4d-b1af0184f199', 'e1216ddb-ae31-4325-9b6d-b1af01850424', '055c338d-7e98-482a-9f41-b1af01851f27'
]
*/

let arredondo_base64
let user_base64

const intro_vid_url = 'https://storage.googleapis.com/arredondo_videos/arredondo_intro_edit.mp4'

const createDotFlashing = () => {
    const dfContainer = document.createElement('div');
    dfContainer.classList.add('mb-2', 'flex', 'justify-start', 'dotFlashing');
    const html = 
        '<img src="https://storage.googleapis.com/arredondo_videos/arredondo_icon.png" class="w-10 h-10 mr-2">' +
        '<div class="bg-white rounded-tl-full rounded-tr-full rounded-br-full w-16">' +
        '<div class="dot-flashing ms-6 mt-4">  </div>' +
        '</div>'
    dfContainer.innerHTML = html

    return dfContainer
}
const createUserInput = (input) => {
    // < { type: 'user', time: '', msg: '' }
    var time = new Date().toLocaleTimeString();
    convs.push( { type: 'user', time: time, msg: input } )

    const userSpeech = document.createElement('div')
    userSpeech.classList.add('flex', 'justify-end', 'mb-2')
    userSpeech.innerHTML = 
    '<div class="mb-2 flex max-w-80 items-end">' +
        '<div class="bg-gray-100 opacity-80 md:opacity-100 text-gray-700 user-bubble-radius py-2 px-4 inline-block">' + input + '</div>' +
        '<img src="https://storage.googleapis.com/arredondo_videos/wcu_icon_1.png" class="w-10 h-10 ml-2" >' +
    '</div>'
    return userSpeech
}
const createArrResponse = (obj) => {
    // console.log( obj )
    const parentElement = $('#chatbox')
    if (parentElement.children(':last-child').hasClass('dotFlashing')) {
        // Remove the last child element
        parentElement.children(':last-child').remove();
    }
    
    var time = new Date().toLocaleTimeString();

    const arrSpeech = document.createElement('div')
    arrSpeech.classList.add('flex', 'justify-start', 'mb-2')
    if (obj.type === 'link') {
        convs.push( { type: 'arredondo', time: time, msg: obj.msg.part, link: obj.url } )

        arrSpeech.innerHTML = '<div class="mb-2 flex max-w-80 items-end">' +
            '<img src="https://storage.googleapis.com/arredondo_videos/arredondo_icon.png" class="w-10 h-10 mr-2">' +
            '<div class="bg-gray-100 opacity-80 md:opacity-100 text-slate-950 sm:text-gray-700 arredondo-bubble-radius py-2 px-4 inline-block">' +
                obj.msg.part[0] + '<a href="' + obj.url + '" target="_blank" class="underline">' + obj.msg.part[1] + '</a>' + obj.msg.part[2] +
            '</div>' +
        '</div>'
    }
    else if (obj.type === 'text') {
        convs.push( { type: 'arredondo', time: time, msg: obj.text } )

        arrSpeech.innerHTML = '<div class="mb-2 flex max-w-80 items-end">' +
            '<img src="https://storage.googleapis.com/arredondo_videos/arredondo_icon.png" class="w-10 h-10 mr-2">' +
            '<div class="bg-gray-100 opacity-80 md:opacity-100 text-slate-950 sm:text-gray-700 arredondo-bubble-radius py-2 px-4 inline-block">' +
                obj.text +
            '</div>' +
        '</div>'
    }
    return arrSpeech
}
const addPromptItem = (item, id="") => {
    const prompt = document.createElement('div')
    if (id !== "") {
        prompt.id = id
    }
    prompt.classList.add('bg-[#004F59]', 'ml-10', 'mr-4', 'opacity-70', 'cursor-pointer')
    prompt.classList.add('mb-2', 'px-2', 'py-1', 'rounded-full', 'text-center')
    prompt.innerHTML = '<div class="px-3 py-1 text-white font-bold"> ' + item + '</div>'
    prompt.addEventListener('click', (event) => {
        console.log( item )
        $('#chatbox').append( createUserInput( item ) )
        setTimeout(()=>{
            $('#chatbox').append( createDotFlashing() )
            $('#user-input').val('')
            setTimeout(() => {
                // console.log('scroll event')
                document.getElementById('chatbox').scrollTo({
                    top: document.getElementById('chatbox').scrollHeight,
                    // left: 100,
                    behavior: "smooth",
                })
            }, 300);
        }, 300)

        ask( item )
    })
    return prompt
}

const createPrompt = () => {
    document.getElementById('chatbox').appendChild( addPromptItem('Evolution of counseling') )
    document.getElementById('chatbox').appendChild( addPromptItem('Changes in the counseling profession') )
    document.getElementById('chatbox').appendChild( addPromptItem('Misconceptions & stereotypes', 'prompt3') )
}

// < section
$('#section_div').click(function(event){
    // event.pageX and event.pageY give the mouse pointer's current coordinates relative to the document
    // var mouseX = event.pageX;
    // var mouseY = event.pageY;

    // Log the mouse coordinates
    // console.log('Mouse X:', mouseX, 'Mouse Y:', mouseY);

    // document.getElementById('intro').muted = false
    // document.getElementById('intro').play()
})
// < speaker
document.getElementById('speaker').addEventListener('click', () => {
    document.getElementById('intro').muted = false
    document.getElementById('intro').play();
})
/*
function end_intro(){
    console.log('intro video ENDED')
    document.getElementById('intro_div').classList.add("hidden")
    document.getElementById('waiting_div').classList.remove("hidden")

    document.getElementById("status").innerHTML = 'playing video: Waiting'
    console.log('waiting video playing ...')
    document.getElementById('waiting').play()
    document.getElementById("chat-container").classList.remove("hidden")
    document.getElementById("chat-container").classList.add("animate-fade-in")
    // document.getElementById("seal").classList.add("opacity-40")
    document.getElementById("seal").classList.remove("hidden")
    document.getElementById("seal").classList.add("animate-fade-in")
    // document.getElementById("seal").classList.remove("opacity-0")

    $('#speaker').hide(1000);
    $('#skip_arrow').hide(1000);
} */
// < reset videos
function reset_videos(){
    // console.log( embedApi )
    // console.log( topIntent )
    // console.log( 'arredondo object ::: ', arreObj[topIntent] )
    // console.log( 'sessionId ::: ', arreObj[topIntent].url)
    $('#no-answer').css('display', 'none')
    $('#encouraging').css('display', 'none')

    // < remove iframe instance
    const player = document.getElementById('pplayer')
    player.style.display = ''
    var iframe = player.querySelector("iframe");
    // iframe.src = "https://google.com"
    console.log( iframe.src)
    const sessionId = arreObj[topIntent].url
    const src = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=' + sessionId + '&remoteEmbed=true&remoteHost=http%3A%2F%2Flocalhost%3A5173&embedApiId=pplayer&interactivity=none&showtitle=false'
    iframe.src = src;
}
// * ------------------------
// *    query dialogflow API
// * ------------------------
async function queryAPI_DF(userMessage) {
    const response = await fetch('https://us-west2-classbot-336213.cloudfunctions.net/arredondo-detect-intent-1?input=' + userMessage);
    const result = await response.json();
    console.log(result)
    if (result.queryResult.match.matchType === 'INTENT') {
        const vid = result.queryResult.responseMessages[0].payload.fields.arredondo.structValue.fields.recordset.listValue.values[0].structValue.fields.url.stringValue
        // console.log( vid )
        const player = document.getElementById('pplayer')
        player.style.display = ''
        var iframe = player.querySelector("iframe");
        // iframe.src = "https://google.com"
        // console.log( iframe.src)
        const sessionId = vid
        const src = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=' + sessionId + '&remoteEmbed=true&remoteHost=http%3A%2F%2Flocalhost%3A5173&embedApiId=pplayer&interactivity=none&showtitle=false'
        iframe.src = src;

        const vid_url = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=' + arreObj[topIntent].url
        $('#chatbox').append( createArrResponse({ 
            type: 'link', 
            url: vid_url, 
            msg: {part: ['You can also view this video using ', 'this link', '.']}
        }) )    
    } else if (result.queryResult.match.matchType === 'NO_MATCH') {
        // play_noanswer()
        console.log( 'NO_MATCH' )
        console.log( arre_noanswer )
        const msg = "That's a good question, but I'm not entirely sure."
        $('#chatbox').append( createArrResponse({ type: 'text', text: msg }) )  

        $('#pplayer').css('display', "none")
        $('#inspiring').css('display', "none")
        $('#waiting').css('display', "none")
        // $('#').css('display', "none")

        embedApi.stopVideo()
        embedApi_inspiring.stopVideo()
        // const no_answer = document.getElementById("no-answer")
        // no_answer.style.display = ''
        $('#no-answer').css('display', '')
        embedApi_no_answer.playVideo()
    }
}
// * --------------------
// *    query Azure API
// * --------------------
async function queryAPI_Azure(userMessage) {
    $('#speaker').hide(1000);
    $('#skip_arrow').hide(1000);
    // const url = 'http://localhost:7071/api/detect-intent-2'
    const url = 'https://arredondo.azurewebsites.net/api/detect-intent-2'
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            text: userMessage
        })
    })
    const data = await response.json();
    console.log( '::: top intent ::: ', data.result.prediction.topIntent )
    topIntent = data.result.prediction.topIntent
    // console.log( 'sessionId ::: ', arreObj[topIntent].url)
    
    // console.log( result.recordset )
    if (data.result.prediction.topIntent === 'None') {
        // reset_videos();
        // document.getElementById('waiting').pause()
        // document.getElementById('ask').pause()
        const msg = "That's a good question, but I'm not entirely sure."
        $('#chatbox').append( createArrResponse({ type: 'text', text: msg }) )    

        console.log( 'sessionId ::: ', arreObj[topIntent].url)
        // < remove iframe instance
        /*
        const player = document.getElementById('pplayer')
        var iframe = player.querySelector("iframe");
        // iframe.src = "https://google.com"
        console.log( iframe.src)
        const sessionId = arreObj[topIntent].url
        const src = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=' + sessionId + '&remoteEmbed=true&remoteHost=http%3A%2F%2Flocalhost%3A5173&embedApiId=pplayer&interactivity=none&showtitle=false'
        iframe.src = src; */

        // const pplayer = document.getElementById('pplayer')
        // pplayer.style.display = "none"
        $('#pplayer').css('display', "none")
        embedApi.stopVideo()
        // const no_answer = document.getElementById("no-answer")
        // no_answer.style.display = ''
        $('#no-answer').css('display', '')
        // embedApi_no_answer.stopVideo()
        // embedApi_no_answer.loadVideo()
        // embedApi_no_answer.playVideo()
    
    } else {
        reset_videos();
        // $('#answer_div').removeClass('hidden')
        // $('#answer').attr('src', vid_url)
        const vid_url = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=' + arreObj[topIntent].url
        $('#chatbox').append( createArrResponse({ 
            type: 'link', 
            url: vid_url, 
            msg: {part: ['You can also view this video using ', 'this link', '.']}
        }) )    
    }
    return true
}

// *************************************************************************************************
async function ask(input){

    await queryAPI_DF( input )

    // const result = await queryAPI_Azure( input )
    // const result = await queryAPI( input )
    // console.log( 'detect intent: ', result )

    const parentElement = $('#chatbox');
    // Check if the last child of the parent element contains the class 'dotFlashing'
    if (parentElement.children(':last-child').hasClass('dotFlashing')) {
        // Remove the last child element
        parentElement.children(':last-child').remove();
    }
    setTimeout(() => {
        // console.log('scroll event')
        document.getElementById('chatbox').scrollTo({
            top: document.getElementById('chatbox').scrollHeight,
            // left: 100,
            behavior: "smooth",
        })
    }, 300);
}
// *************************************************************************************************
function follow_chat_input(){
    const info = document.getElementById('chat_input');
    const rect = info.getBoundingClientRect();
    // console.log( 'info button ::: ', rect.top, rect.left)   // < 849 919
    const bubble = document.getElementById('bubble4')
    // console.log( bubble )
    bubble.style.top  = rect.top-245 + 'px'
    bubble.style.left = rect.left-435 + 'px'
}
function follow_prompts(){
    const info = document.getElementById('prompt3');
    const rect = info.getBoundingClientRect();
    console.log( 'prompt 3 ::: ', rect.top, rect.left)   // < 849 919
    const bubble = document.getElementById('bubble3')
    // console.log( bubble )
    bubble.style.top  = rect.top+45 + 'px'
    bubble.style.left = rect.left-425 + 'px'
}
function follow_download_btn(){
    const info = document.getElementById('info_btn');
    const rect = info.getBoundingClientRect();
    // console.log( 'info button ::: ', rect.top, rect.left)   // < 849 919
    const bubble = document.getElementById('bubble2')
    // console.log( bubble )
    bubble.style.top  = rect.top-150 + 'px'
    bubble.style.left = rect.left-465 + 'px'
}
function follow_info_icon(){
    const info = document.getElementById('info_btn');
    const rect = info.getBoundingClientRect();
    // console.log( 'info button ::: ', rect.top, rect.left)   // < 849 919
    const bubble = document.getElementById('bubble1')
    // console.log( bubble )
    bubble.style.top  = rect.top-150 + 'px'
    bubble.style.left = rect.left-505 + 'px'

    const mask1 = document.getElementById('overlay')
    mask1.style.top  = rect.top-79 + 'px'    // < === 770
    mask1.style.left = rect.left-20 + 'px'   // < === 900
}
function set_prompt_overlay(){
    const info = document.getElementById('prompt3');
    const rect = info.getBoundingClientRect();
    // console.log( 'mask button ::: ', rect.top, rect.left)
    const mask1 = document.getElementById('overlay')
    // console.log( mask1 )
    mask1.style.top  = rect.top-129 + 'px'    // < === 770
    mask1.style.left = rect.left-20 + 'px'   // < === 900
    mask1.style.width = '325px'
    mask1.style.height = '180px'
    mask1.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0.5) inset, 0px 0px 0px 2000px rgba(0,0,0,0.5)'
    mask1.classList.add('overlay')
}
function set_info_overlay(){
    const info = document.getElementById('info_btn');
    const rect = info.getBoundingClientRect();
    // console.log( 'mask button ::: ', rect.top, rect.left)
    const mask1 = document.getElementById('overlay')
    // console.log( mask1 )
    mask1.style.top  = rect.top-79 + 'px'    // < === 770
    mask1.style.left = rect.left-20 + 'px'   // < === 900
    mask1.style.width = '375px'
    mask1.style.height = '120px'
    mask1.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0.5) inset, 0px 0px 0px 2000px rgba(0,0,0,0.5)'
    mask1.classList.add('overlay')
}
function set_overlay(){
    const mask1 = document.getElementById('overlay')
    // console.log( mask1 )
    mask1.style.boxShadow = '0px 0px 0px 0px rgba(0,0,0,0.5) inset, 0px 0px 0px 2000px rgba(0,0,0,0.5)'
    mask1.classList.add('overlay')
}
function hide_bubble0(){
    const el = document.getElementById('bubble0')
    el.classList.add('hidden')
}
function hide_overlay(){
    const overlay = document.getElementById('overlay')
    overlay.classList.add('hidden')
}
function show_bubble1(){
    const el = document.getElementById('bubble1')
    el.classList.remove('hidden')
}
function hide_bubble1(){
    const el = document.getElementById('bubble1')
    el.classList.add('hidden')
}
function show_bubble2(){
    const el = document.getElementById('bubble2')
    el.classList.remove('hidden')
}
function hide_bubble2(){
    const el = document.getElementById('bubble2')
    el.classList.add('hidden')
}
function show_bubble3(){
    const el = document.getElementById('bubble3')
    el.classList.remove('hidden')
}
function hide_bubble3(){
    const el = document.getElementById('bubble3')
    el.classList.add('hidden')
}
function show_bubble4(){
    const el = document.getElementById('bubble4')
    el.classList.remove('hidden')
}
function hide_bubble4(){
    const el = document.getElementById('bubble4')
    el.classList.add('hidden')
}
function cancel_all(){
    hide_overlay()
    hide_bubble0()
    hide_bubble1()
    hide_bubble2()
    hide_bubble3()
    hide_bubble4()
}

function calculate_iframe_scale(){
    // console.log('re-calculate scale factor')
    //< re-calculate scale factor
    var container = document.getElementById("pplayer");
    container.style.width = window.innerWidth + "px"
    container.style.height = window.innerHeight + "px"
    // // Get the iframe inside the div using querySelector
    var iframe = container.querySelector("iframe");
    iframe.style.width = window.innerWidth + "px"
    iframe.style.height = window.innerHeight + "px"
    let scale_factor = 1
    const ar = window.innerWidth/window.innerHeight
    // console.log( 'AR :: ', ar);

    if ( ar < 1.77) {
      const video_height = window.innerWidth / 1.77 // 738
      const fullscreen_height = window.innerHeight
      scale_factor = fullscreen_height / video_height + 0.01
    //   console.log('scale factor ::: ', scale_factor)
    } else {
        // console.info('AR > 1.77')
        const video_width = window.innerHeight * 1.77
        const fullscreen_width = window.innerWidth
        scale_factor = fullscreen_width / video_width + 0.01  
    }
    
    // iframe.style.transform = 'scale(' + scale_factor + ')'
}

function calculate_iframe_dim(){
    var container = document.getElementById("pplayer");
    var iframe = container.querySelector("iframe");
    const ar = window.innerWidth/window.innerHeight
    console.log('AR : ', ar)

    if ( ar < 1.778 ) {
      const adjusted_height = Math.floor( iframe.width / 1.778 )
      iframe.style.height = adjusted_height + 'px'
      console.log( 'adjusted height: ', adjusted_height)
    } else {
      const adjusted_width = Math.floor( iframe.height * 1.778 )
      iframe.style.width = adjusted_width + 'px'
    }
}

async function fetchData() {
    try {
        // const arredb_url = 'http://localhost:7071/api/arredondo_db_crud'
        const arredb_url = 'https://arredondo.azurewebsites.net/api/arredondo_db_crud'
        const data = { action: 'init' }
        video_list = await $.ajax({
            url: arredb_url, // Replace with your API endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
        // return response;
        console.log( video_list )
        const byTag = (stored, current) => ({ ...stored, [current.tag]:current})
        arreObj = video_list.reduce(byTag, {})
        console.log( arreObj )
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


$(document).ready(function() {
    // Your code here
    console.log('jquery ready')


    createPrompt();
    $('#end_btn').click(() => {
        cancel_all()
    })
    $('#back4').click(() => {
        hide_bubble4()
        follow_chat_input()
        set_prompt_overlay()

        show_bubble3()
    })
    $('#back3').click(() => {
        hide_bubble3()
        set_info_overlay()
        follow_info_icon()
        show_bubble2()
    })
    $('#next3').click(() => {
        hide_bubble3()
        follow_chat_input()
        set_info_overlay()
        show_bubble4()
    })
    $('#next2').click(() => {
        hide_bubble2()
        follow_prompts()
        set_prompt_overlay()
        show_bubble3()
    })
    $('#back2').click(() => {
        hide_bubble2()
        follow_download_btn()
        show_bubble1()
    })
    $('#next1').click(() => {
        hide_bubble1()
        follow_download_btn()
        show_bubble2()
    })
    $('#back1').click(() => {
        hide_bubble1()
        //< show bubble 0
        const el = document.getElementById('bubble0')
        el.classList.remove("hidden")
        //< remove overlay rectangle
        const overlay = document.getElementById("overlay")
        overlay.classList.remove("overlay")
        overlay.style.cssText = '';
        // overlay1.classList.remove("hidden")
        set_overlay()
        console.log('back 1 clicked')
    })
    $('#lets_go').click(() => {
        hide_bubble0()
        set_info_overlay()
        show_bubble1()
    })
    $('#show_me_later').click(() => {
        console.log('bubble 0 clicked')
        hide_bubble0()
        hide_overlay()
    })

    $('#download_btn').click(() => {

        console.log('download transcript')
        let docDefinition = { content:[], images: {
            arredondo: arredondo_base64,
            user: user_base64
        } }

        // < Name
        const name = {text: 'Name: ', fontsize: 24, bold: true }
        docDefinition.content.push( name )

        // < Date
        const date = new Date();
        // Options for date formatting
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        // Format the date
        var formattedDate = date.toLocaleDateString('en-US', options);
        const date_obj = {text: 'Date: ' + formattedDate, fontsize: 24, bold: true }
        docDefinition.content.push( date_obj )
        docDefinition.content.push( "\n" )

        // < Title
        const title = {text: 'Chat with Dr. Arredondo', fontsize: 24, bold: true, alignment: 'center' }
        docDefinition.content.push( title )
        docDefinition.content.push( "\n" )

        // var time = new Date().toLocaleTimeString();
        convs.forEach(item => {
            if (item.link) {
                console.log( item )
                const content = {
                    columns: [
                      {width: 40, image: item.type },
                      {width: 60, text: item.time },
                      {width: '*', text: [ item.msg[0], {
                                            text: item.msg[1],
                                            link: item.link,
                                            decoration: 'underline'
                                        }, item.msg[2]]
                        }
                    ]
                }
                docDefinition.content.push( content )        
            } else {
                const content = {
                    columns: [
                      {width: 40, image: item.type },
                      {width: 60, text: item.time },
                      {width: '*', text: item.msg }
                    ]
                }
                docDefinition.content.push( content )        
            }
        })

        console.log( convs )

        pdfMake.createPdf(docDefinition).open()

    })

    $('#skip_arrow').click(() => {
        document.getElementById('intro').src = ''
        // end_intro();
    });

    $(window).resize(function() {
        // Code to execute when the window is resized
        follow_info_icon();
        // calculate_iframe_scale();
        calculate_iframe_dim();

        // console.log("Window height: ", $(window).height());
        if ( $(window).height() < 580 ) {
            $('#chat-container').removeClass('top-1/2')
            $('#chat-container').removeClass('lg:top-40')
            $('#chat-container').addClass('top-5')
        } else {
            $('#chat-container').addClass('top-1/2')
            $('#chat-container').addClass('lg:top-40')
            $('#chat-container').removeClass('top-5')
        }
    });

    $('#user-send').click(() => {
        // console.log('Image clicked!');
        console.log( $('#user-input').val() );
        const input = $('#user-input').val()
        $('#chatbox').append( createUserInput( input ) )
        setTimeout(()=>{
            $('#chatbox').append( createDotFlashing() )
            $('#user-input').val('')
            setTimeout(() => {
                // console.log('scroll event')
                document.getElementById('chatbox').scrollTo({
                    top: document.getElementById('chatbox').scrollHeight,
                    // left: 100,
                    behavior: "smooth",
                })
            }, 300);
        }, 300)
        ask(input)
    })
    $('#user-input').keydown(async function (event) {
        // Check if the key pressed is Enter (key code 13)
        if(event.which == 13){
            // Call a function or execute code when Enter is pressed
            console.log( $(this).val() );
            const input = $(this).val()
            $('#chatbox').append( createUserInput( input ) )
            setTimeout(()=>{
                $('#chatbox').append( createDotFlashing() )
                $(this).val('')
                setTimeout(() => {
                    // console.log('scroll event')
                    document.getElementById('chatbox').scrollTo({
                        top: document.getElementById('chatbox').scrollHeight,
                        // left: 100,
                        behavior: "smooth",
                    })
                }, 300);
            }, 300)
            ask(input)
        }
    })

    // URL of the image you want to convert to Base64
    const arredondo_url = 'https://storage.googleapis.com/arredondo_videos/arredondo_icon.png';
    // Fetch the image
    fetch(arredondo_url)
    .then(response => response.blob())
    .then(blob => {
        // Convert the image blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            // Base64 string of the image
            arredondo_base64 = reader.result;
            // console.log('Base64 string:', arredondo_base64);
        };
    })
    .catch(error => console.error('Error fetching image:', error));
    
    const user_url = 'https://storage.googleapis.com/arredondo_videos/wcu_icon_1.png';
    // Fetch the image
    fetch(user_url)
    .then(response => response.blob())
    .then(blob => {
        // Convert the image blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            // Base64 string of the image
            user_base64 = reader.result;
            // console.log('Base64 string:', arredondo_base64);
        };
    })
    .catch(error => console.error('Error fetching image:', error));
    
    // < set_overlay()
    set_overlay();
    // < bubble1 to follow <info>
    follow_info_icon();
    // < set overlay css position & box-shadow
    // set_info_overlay();

    // window.addEventListener('resize', follow_info_icon);
    $('#x1').click(() => { cancel_all() })
    $('#x2').click(() => { cancel_all() })
    $('#x3').click(() => { cancel_all() })
    $('#x4').click(() => { cancel_all() })

    fetchData();
});

// console.log('app.js loaded')
//< 2nd canvas integration
//< h5p for interactive videos

//< training phrases upload
//< ? prompting

//< WCU seal up to 20% transparency
//< review knowledge base articles for new intents
//< WCU SASTRC for Students: https://helpdesk.westcoastuniversity.edu/support/solutions/48000455125

//< email Jen for training phrases update
//< work study to help test training phrases

//! On start:  
// <    Autoplay introduction  
// <    Autoplay waiting  
// <    Autoplay "ask me a question"

//! After learner prompted video play:  
// <    "Waiting"  
// <    "Ask me a question"

// "E_XX" files are "encouragement" clips. These may be played before or after a question response to encourage students. 
// "IE_XX" files are "inspiring enquiry" (ask me) clips. These may be played after the learner has been idle or a few seconds after a response to keep the questions coming. 
// "NA_XX" files are "no answer" clips. These may be played in response to a question that needs a better answer. 

 

