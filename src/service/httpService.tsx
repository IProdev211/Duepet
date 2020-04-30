class HttpService {
  postRequest(data, endpoint) {
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          resp
            .json()
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getRequest(endpoint) {
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
      })
        .then(resp => {
          resp
            .json()
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
export default new HttpService();
