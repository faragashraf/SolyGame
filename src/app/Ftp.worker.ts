/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const file = data;
  const chunkSize: number = 61680; // 0.6 MB chunk size (adjust as needed)  
  let offset = 0;

  const reader = new FileReader();
  let _length = 0;
  const readNextChunk = () => {
    let chunk;
    let lastChunk = file.size - offset;

    let fileSizeLessChunk: boolean = file.size <= chunkSize;

    switch (fileSizeLessChunk) {
      case true:
        chunk = file.slice(offset, file.size);
        _length = file.size
        offset = file.size
        break;
      case false:
        if (lastChunk > chunkSize)
          _length = offset + chunkSize;
        else
          _length = offset + lastChunk

        chunk = file.slice(offset, _length);
        break;
      default:
        console.log("Unknown.");
        break;
    }

    reader.onload = (event: any) => {
      const arrBuffer = new Uint8Array(event.target.result)
      postMessage({ result: btoa(String.fromCharCode(...arrBuffer)) });
      offset += lastChunk > chunkSize ? chunkSize : lastChunk;
      postMessage({ offset: offset });

      if (_length === file.size) {
        postMessage({ result: 'complete', offset: offset });
        return
      }
      readNextChunk();

    };

    reader.readAsArrayBuffer(chunk);
    reader.onloadend = null; // Remove load end handler
  }
  readNextChunk();
});
