document.body.style.background = 'yellow';
console.log('HELLO RUNNING');



async function removeIfTweet(e){
  let imageUrl = $(e).parent().parent().siblings('.thumbnail').attr('href');
  console.log(e);
  console.log(imageUrl);
  console.log('--------');
  const worker = createWorker({
    workerPath: browser.runtime.getURL('js/worker.min.js'),
    langPath: browser.runtime.getURL('traineddata'),
    corePath: browser.runtime.getURL('js/tesseract-core.wasm.js'),
  });
  console.log(worker);
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(imageUrl);
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
