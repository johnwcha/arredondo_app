let arreObj
let video_list
let topIntent

let convs = []
// < { type: 'arredondo', time: '', msg: '' }
// < { type: 'user', time: '', msg: '' }

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

// < speaker
document.getElementById('speaker').addEventListener('click', () => {
    document.getElementById('intro').muted = false
    document.getElementById('intro').play();
})

// * ------------------------
// *    query dialogflow API
// * ------------------------
async function queryAPI_DF(userMessage) {
    init_intro = false
    const response = await fetch('https://us-west2-classbot-336213.cloudfunctions.net/arredondo-detect-intent-1?input=' + userMessage + '&session=' + arre_session + '&sisId=' + arre_sis_id + '&email=' + arre_email + '&course=' + arre_course);
    const result = await response.json();
    console.log(result)
    if (result.queryResult.match.matchType === 'INTENT') {
        // * mute other videos
        if (embedApi.getState() === PlayerState.Playing) { embedApi.stopVideo() }
        if (embedApi_inspiring.getState() === PlayerState.Playing) { embedApi_inspiring.stopVideo() }
        if (embedApi_encouragement.getState() === PlayerState.Playing) { embedApi_encouragement.stopVideo() }
        if (embedApi_no_answer.getState() === PlayerState.Playing) { embedApi_no_answer.stopVideo() }
        
        const vid = result.queryResult.responseMessages[0].payload.fields.arredondo.structValue.fields.recordset.listValue.values[0].structValue.fields.url.stringValue
        // console.log( vid )
        const player = document.getElementById('pplayer')
        player.style.display = ''
        var iframe = player.querySelector("iframe");
        // console.log( iframe.src)
        const sessionId = vid
        const src = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=' + sessionId + '&remoteEmbed=true&remoteHost=http%3A%2F%2Flocalhost%3A5173&embedApiId=pplayer&interactivity=none&showtitle=false'
        iframe.src = src;

        const vid_url = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=' + sessionId
        // const vid_url = 'https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=' + arreObj[topIntent].url
        $('#chatbox').append( createArrResponse({ 
            type: 'link', 
            url: vid_url, 
            msg: {part: ['You can also view this video using ', 'this link', '.']}
        }) )
    } else if (result.queryResult.match.matchType === 'NO_MATCH') {
        // play_noanswer()
        console.log( 'NO_MATCH' )
        console.log( response )
        const msg = "That's a good question, but I'm not entirely sure."
        $('#chatbox').append( createArrResponse({ type: 'text', text: msg }) )  

        $('#pplayer').css('display', "none")
        $('#inspiring').css('display', "none")
        $('#waiting').css('display', "none")
        // $('#').css('display', "none")
        if (embedApi.getState() === PlayerState.Playing) { embedApi.stopVideo() }
        if (embedApi_inspiring.getState() === PlayerState.Playing) { embedApi_inspiring.stopVideo() }
        if (embedApi_encouragement.getState() === PlayerState.Playing) { embedApi_encouragement.stopVideo() }

        $('#no-answer').css('display', '')
        if (embedApi_no_answer) { embedApi_no_answer.seekTo(0); embedApi_no_answer.playVideo() }
        // const no_answer = document.getElementById("no-answer")
        // no_answer.style.display = ''
    }
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
    // console.log('AR : ', ar)

    if ( ar < 1.778 ) {
      const adjusted_height = Math.floor( iframe.width / 1.778 )
      iframe.style.height = adjusted_height + 'px'
    //   console.log( 'adjusted height: ', adjusted_height)
    } else {
      const adjusted_width = Math.floor( iframe.height * 1.778 )
      iframe.style.width = adjusted_width + 'px'
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

    // fetchData();
});

// console.log('app.js loaded')

//< ? prompting


//! On start:  
// <    Autoplay introduction  
// <    Autoplay waiting  
// <    Autoplay "ask me a question"

//! After learner prompted video play:
// <    play "arredondo" response
// <    play "encouragement" clips
// <    "Waiting"  
// <    inspiring to "Ask me a question"

//< "E_XX" files are "encouragement" clips. These may be played before or after a question response to encourage students. 
//< "IE_XX" files are "inspiring enquiry" (ask me) clips. These may be played after the learner has been idle or a few seconds after a response to keep the questions coming. 
//< "NA_XX" files are "no answer" clips. These may be played in response to a question that needs a better answer. 

 

