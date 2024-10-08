let video_list = [
    { tag: 'intro', sid: '' },
    { tag: 'not_sure', sid: '' },
    { tag: 'arre-q1', sid: '25b510c4-f088-4e06-ad70-b15a014d1039' },
    { tag: 'arre-q2', sid: 'beab5a02-a128-463f-907e-b15a011447a6' },
    { tag: 'arre-q3', sid: '425b51d6-92fb-4a74-ae0d-b15a011447d8' },
    { tag: 'arre-q4', sid: 'a1b28a56-6569-4853-b418-b178016d1a80' },
    { tag: 'arre-q5', sid: 'd3a1c578-fa09-4bbb-8efe-b178016d9077' },
]

let convs = []
// < { type: 'arredondo', time: '', msg: '' }
// < { type: 'user', time: '', msg: '' }

let arredondo_base64
let user_base64

const intro_vid_url = 'https://storage.googleapis.com/arredondo_videos/arredondo_intro_edit.mp4'
// document.getElementById('play_btn').addEventListener('click', () => {
//     document.getElementById("intro").play()
// })
const createDotFlashing = () => {
    const dfContainer = document.createElement('div');
    dfContainer.classList.add('mb-2', 'flex', 'justify-start', 'dotFlashing');
    const html = 
        '<img src="/arredondo_icon.png" class="w-10 h-10 mr-2">' +
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
        '<img src="/wcu_icon_1.png" class="w-10 h-10 ml-2" >' +
    '</div>'
    return userSpeech
}
const createArrResponse = (obj) => {
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
            '<img src="/arredondo_icon.png" class="w-10 h-10 mr-2">' +
            '<div class="bg-gray-100 opacity-80 md:opacity-100 text-slate-950 sm:text-gray-700 arredondo-bubble-radius py-2 px-4 inline-block">' +
                + obj.msg.part[0] + '<a href="' + obj.url + '" target="_blank" class="underline">' + obj.msg.part[1] + '</a>' + obj.msg.part[2] +
            '</div>' +
        '</div>'
    }
    else if (obj.type === 'text') {
        convs.push( { type: 'arredondo', time: time, msg: obj.text } )

        arrSpeech.innerHTML = '<div class="mb-2 flex max-w-80 items-end">' +
            '<img src="/arredondo_icon.png" class="w-10 h-10 mr-2">' +
            '<div class="bg-gray-100 opacity-80 md:opacity-100 text-slate-950 sm:text-gray-700 arredondo-bubble-radius py-2 px-4 inline-block">' +
                + obj.text +
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

    document.getElementById('intro').muted = false
    document.getElementById('intro').play()
})
// < speaker
document.getElementById('speaker').addEventListener('click', () => {
    document.getElementById('intro').muted = false
    document.getElementById('intro').play();
})
// < before
document.getElementById('before').addEventListener('ended', () => {
    console.log('before video ENDED')
    document.getElementById('before_div').classList.add("hidden")
    document.getElementById('intro_div').classList.remove("hidden")

    document.getElementById("status").innerHTML = 'playing video: Introduction'
    console.log('intro video starts playing ...')
    document.getElementById('intro').play()
})
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
}
// < intro
document.getElementById('intro').addEventListener('ended', () => {
    end_intro();
})
document.getElementById('intro').addEventListener('playing', () => {
    console.log( 'intro playing events ...' )
    // setInterval(()=>{
    //     console.log( document.getElementById('intro').currentTime )
    // }, 300)
})
// < waiting
document.getElementById('waiting').addEventListener('ended', () => {
    console.log('waiting video ENDED')
    document.getElementById('waiting_div').classList.add("hidden")
    document.getElementById('ask_div').classList.remove("hidden")

    document.getElementById("status").innerHTML = 'playing video: Ask me a question'
    console.log('ask video playing ...')
    document.getElementById('ask').play()
})
// < ask me questions
document.getElementById('ask').addEventListener('ended', () => {
    document.getElementById("status").innerHTML = 'end of video: Ask me a question'
    $('#status').hide(1000);
})
// < answer
document.getElementById('answer').addEventListener('ended', ()=>{
    document.getElementById('answer_div').classList.add('hidden')
    document.getElementById('waiting_div').classList.remove("hidden")
    document.getElementById('waiting').play()
})
// < reset videos
function reset_videos(){
    document.getElementById('before_div').classList.add("hidden")
    document.getElementById('intro_div').classList.add("hidden")
    document.getElementById('intro').pause()
    document.getElementById('intro').currentTime = 0;
    document.getElementById('waiting_div').classList.add("hidden")
    document.getElementById('waiting').pause()
    document.getElementById('waiting').currentTime = 0;
    document.getElementById('ask_div').classList.add("hidden")
    document.getElementById('ask').pause()
    document.getElementById('ask').currentTime = 0;
    document.getElementById('answer_div').classList.add("hidden")
    document.getElementById('answer').pause()
    document.getElementById('answer').currentTime = 0;
    document.getElementById('notsure_div').classList.add("hidden")
    document.getElementById('notsure').pause()
    document.getElementById('notsure').currentTime = 0;
}
// < not sure
document.getElementById('notsure').addEventListener('ended', () => {
    document.getElementById('notsure_div').classList.add('hidden')
    document.getElementById('waiting_div').classList.remove("hidden")
    document.getElementById('waiting').play()
})
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
    const result = await response.json();
    // console.log( result.result.prediction.intents[0] )
    console.log( result.recordset )
    if (result.recordset) {
        if (result.recordset.length === 1) {
            reset_videos();
            const vid_url = result.recordset[0].url
            // console.log( vid_url )
            // document.getElementById('waiting').pause()
            // document.getElementById('ask').pause()
            $('#answer_div').removeClass('hidden')
            // $('#answer').attr('src', vid_url)
            document.getElementById('answer').src = vid_url
            document.getElementById('answer').play()
            // $('#answer').play();
            $('#chatbox').append( createArrResponse({ 
                type: 'link', 
                url: vid_url, 
                msg: {part: ['You can also view this video using ', 'this link', '.']}
            }) )    
        }
    } else {
        reset_videos();
        // document.getElementById('waiting').pause()
        // document.getElementById('ask').pause()
        const msg = "That's a good question, but I'm not entirely sure."
        document.getElementById('notsure_div').classList.remove("hidden")
        document.getElementById('notsure').play()

        $('#chatbox').append( createArrResponse({ type: 'text', text: msg }) )    
    }
    return true
}
// * --------------------
// *    query API
// * --------------------
async function queryAPI(userMessage) {
    $('#speaker').hide(1000);
    $('#skip_arrow').hide(1000);
    // Add code to send userMessage to your server for processing (e.g., to a chatbot backend)
    // You can then append the chatbot's response to the chatMessages element
    // * option // AG gen2 flow -> ag-gen2
    // * detect-intent-4 tested flowVersions[]
    // * Format: projects/<Project ID>/locations/<Location ID>/agents/<Agent ID>/flows/<Flow ID>/versions/<Version ID>.
    // ! current in code // (John dev) -> ag-gen2
    const response = await fetch('https://us-west2-classbot-336213.cloudfunctions.net/arredondo-detect-intent-1?input=' + userMessage);
    const result = await response.json();
    // console.log(result)

    if (result.queryResult.match.matchType === 'INTENT') {
        // * response from webhook
        if (result.queryResult.responseMessages.length === 1) {
            if (result.queryResult.responseMessages[0].message === 'payload') {
                console.log('* response from webhook')
                reset_videos();
                const vid_url = result.queryResult.responseMessages[0].payload.fields.arredondo.structValue.fields.recordsets.listValue.values[0].listValue.values[0].structValue.fields.url.stringValue
                // console.log( vid_url )
                // document.getElementById('waiting').pause()
                // document.getElementById('ask').pause()
                $('#answer_div').removeClass('hidden')
                // $('#answer').attr('src', vid_url)
                document.getElementById('answer').src = vid_url
                document.getElementById('answer').play()
                // $('#answer').play();
                $('#chatbox').append( createArrResponse({ 
                        type: 'link', 
                        url: vid_url, 
                        msg: {part: ['You can also view this video using ', 'this link', '.']}
                    }) )    
            }
            else if (result.queryResult.responseMessages[0].message === 'text') {
                const msg = result.queryResult.responseMessages[0].text.text[0]
                // console.log( vid_url )
                $('#chatbox').append( createArrResponse({ type: 'text', text: msg }) )    
            }
        }
    }
    if (result.queryResult.match.matchType === 'NO_MATCH') {
        reset_videos();
        // document.getElementById('waiting').pause()
        // document.getElementById('ask').pause()
        const msg = "That's a good question, but I'm not entirely sure."
        document.getElementById('notsure_div').classList.remove("hidden")
        document.getElementById('notsure').play()

        $('#chatbox').append( createArrResponse({ type: 'text', text: msg }) )    
    }

    return result.queryResult.match.matchType
}
// *************************************************************************************************
async function ask(input){
    const result = await queryAPI_Azure( input )
    // const result = await queryAPI( input )
    console.log( 'detect intent: ', result )

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
const tr = [
    {
        "intent": "arre-q4",
        "language": "en-us",
        "text": "",
        "entities": []
    }
]
//< arredondo UI update
//< transfer intents from DF to Azure
//< canvas integration
//< Azure storage for videos
//< h5p for interactive videos

$(function(){
    // Your code here
    console.log('jquery ready')

    var container = document.getElementById("pplayer");
    // Get the iframe inside the div using querySelector
    var iframe = container.querySelector("iframe");
    const vid = "25b510c4-f088-4e06-ad70-b15a014d1039";
    iframe.src= "https://westcoastuniversity.hosted.panopto.com/Panopto/Pages/Embed.aspx?id=" + vid + "&remoteEmbed=true&remoteHost=http%3A%2F%2Flocalhost%3A5173&embedApiId=pplayer&interactivity=none&showtitle=false"
    
    console.log( embedApi );

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
        docDefinition.content.push( '\n' )

        // < Title
        const title = {text: 'Chat with Dr. Arredondo', fontsize: 24, bold: true, alignment: 'center' }
        docDefinition.content.push( title )
        docDefinition.content.push( '\n' )

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
        end_intro();
    });

    $(window).resize(function() {
        // Code to execute when the window is resized
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
    const arredondo_url = '/arredondo_icon.png';
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
    
    const user_url = '/wcu_icon_1.png';
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

    window.addEventListener('resize', follow_info_icon);
    $('#x1').click(() => { cancel_all() })
    $('#x2').click(() => { cancel_all() })
    $('#x3').click(() => { cancel_all() })
    $('#x4').click(() => { cancel_all() })
});

// console.log('app.js loaded')
