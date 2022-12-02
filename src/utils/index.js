
export const fileToBlob = function (file_url) {
  return new Promise(function (resolve) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", file_url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (this.status == 200) {
        const reader = new FileReader()
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.readAsText(this.response);
      } else {
        console.log('err');
      }
    };
    xhr.send();
  })
}
