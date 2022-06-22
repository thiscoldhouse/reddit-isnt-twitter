// platform agnostic shenanigans
if (typeof browser === "undefined") {
    var browser = chrome;
}


document.body.style.background = 'yellow';
const worker = Tesseract.createWorker({
  workerPath: browser.runtime.getURL('js/worker.min.js'),
  langPath: browser.runtime.getURL('data'),
  corePath: browser.runtime.getURL('js/tesseract-core.wasm.js'),
});
Tesseract.setLogging(true);

async function removeIfTweet(e){
  let imageUrl = $(e).parent().parent().siblings('.thumbnail').attr('href');
  console.log(e);
  console.log(imageUrl);
  console.log('--------');
  console.log(worker);
  console.log('z');
  await worker.load()
  console.log('a');
  await worker.loadLanguage('eng');
    console.log('b');
  await worker.initialize('eng');
  console.log('c');
  const { data: { text } } = await worker.recognize(imageUrl);
  console.log('d');
  console.log('----------------------');
  console.log('RESULTS FOR IMAGE');
  console.log(imageUrl)
  console.log(text);
  console.log('----------------------');
  await worker.terminate();
}

function modifyPage(){
  let images = $('.expando-button');
  images.each(function(i, e){
    removeIfTweet(e);
  });
}
modifyPage()
